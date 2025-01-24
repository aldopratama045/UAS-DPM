import React from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

const ExploreScreen = () => {
    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Kalender Akademik Universitas Islam Riau</Text>
                </View>

                {/* Kalender Images */}
                <View style={styles.calendarContainer}>
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../../assets/images/calendar1.png')} style={styles.calendarImage} />
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../../assets/images/calendar2.png')} style={styles.calendarImage} />
                       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../../assets/images/calendar3.png')} style={styles.calendarImage} />
                      
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    headerContainer: {
        backgroundColor: '#4CAF50',
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#388E3C',
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    calendarContainer: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    card: {
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    calendarImage: {
        width: 300,
        height: 400,
        resizeMode: 'contain',
    },
    imageCaption: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 15,
    },
});

export default ExploreScreen;
