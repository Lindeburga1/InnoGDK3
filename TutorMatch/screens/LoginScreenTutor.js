// screens/LoginScreenTutor.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginScreenTutor({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tutor Login</Text>
            <Button 
                title="Login som Tutor" 
                onPress={() => navigation.navigate('Main')} // Navigerer til hovedskærmene
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});
