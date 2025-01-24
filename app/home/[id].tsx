import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Card,
    Dialog,
    Portal,
    Provider as PaperProvider,
    Text,
    TextInput
} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import API_URL from '@/config/config';
import { ThemedView } from '@/components/ThemedView';
import { useHomes } from '../../context/HomeContext';

type Home = {
    _id: string;
    title: string;
    description: string;
};

const HomeDetailScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { updateHome } = useHomes();
    const [home, setHome] = useState<Home | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchHome();
    }, [id]);

    const fetchHome = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get<{ data: Home }>(`${API_URL}/api/home/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedHome = response.data.data;
            setHome(fetchedHome);
            setTitle(fetchedHome.title);
            setDescription(fetchedHome.description);
        } catch (error) {
            console.error('Failed to fetch home', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateHome = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.put<{ data: Home }>(
                `${API_URL}/api/home/${id}`,
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const updatedHome = response.data.data;
            setHome(updatedHome);
            updateHome(updatedHome);
            setVisible(true);
        } catch (error) {
            console.error('Failed to update home', error);
        }
    };

    const hideDialog = () => {
        setVisible(false);
        router.back();
    };

    if (loading) {
        return (
            <PaperProvider>
                <ThemedView style={styles.container}>
                    <ActivityIndicator style={styles.loading} animating={true} />
                </ThemedView>
            </PaperProvider>
        );
    }

    if (!home) {
        return null;
    }

    return (
        <PaperProvider>
            <Stack.Screen options={{ title: 'Home Detail' }} />
            <ThemedView style={styles.container}>
                {/* Background */}
                <View style={styles.background} />
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Card style={styles.card} elevation={3}>
                        <Card.Content>
                            <TextInput
                                label="Title"
                                value={title}
                                onChangeText={setTitle}
                                style={styles.input}
                                mode="outlined"
                            />
                            <TextInput
                                label="Description"
                                value={description}
                                onChangeText={setDescription}
                                style={styles.input}
                                mode="outlined"
                                multiline
                            />
                            <Button mode="contained" onPress={handleUpdateHome} style={styles.updateButton}>
                                Update Home
                            </Button>
                        </Card.Content>
                    </Card>
                </ScrollView>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Success</Dialog.Title>
                        <Dialog.Content>
                            <Text>Home updated successfully</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ThemedView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        position: 'relative',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgray',
        zIndex: -1, 
    },
    contentContainer: {
        paddingBottom: 80,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
    },
    input: {
        marginBottom: 12,
    },
    updateButton: {
        marginTop: 12,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeDetailScreen;