import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ActivityIndicator, Button, Dialog, PaperProvider, Portal, Text } from 'react-native-paper';
import API_URL from '@/config/config';

const ProfileScreen = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(response.data.data);
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setDialogVisible(true);
    };

    const confirmLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.replace('/auth/LoginScreen');
    };

    if (loading) {
        return (
            <PaperProvider>
                <ThemedView style={styles.loadingContainer}>
                    <ActivityIndicator animating={true} />
                </ThemedView>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                {profile ? (
                    <View style={styles.profileContainer}>
                        <View style={styles.headerContainer}>
                            <View style={styles.profilePicture} />
                            <ThemedText style={styles.profileName}>{profile.username}</ThemedText>
                            <ThemedText style={styles.profileEmail}>{profile.email}</ThemedText>
                        </View>

                        <View style={styles.settingsContainer}>
                            <View style={styles.settingItem}>
                                <ThemedText style={styles.settingLabel}>Tentang Aplikasi</ThemedText>
                                <TouchableOpacity>
                                    <ThemedText style={styles.settingAction}>></ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Button
                            mode="contained"
                            onPress={handleLogout}
                            style={styles.logoutButton}
                        >
                            Log Out
                        </Button>

                        <Portal>
                            <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                                <Dialog.Title>Logout</Dialog.Title>
                                <Dialog.Content>
                                    <Text>Apakah Anda yakin ingin keluar?</Text>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={() => setDialogVisible(false)}>Batal</Button>
                                    <Button onPress={confirmLogout}>OK</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </View>
                ) : (
                    <ThemedText>Tidak ada data profil</ThemedText>
                )}
            </ThemedView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
    },
    settingsContainer: {
        marginTop: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    settingLabel: {
        fontSize: 16,
        color: '#333',
    },
    settingAction: {
        fontSize: 16,
        color: '#999',
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: '#ff5252',
    },
});

export default ProfileScreen;
