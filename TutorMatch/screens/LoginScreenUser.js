// screens/LoginScreenUser.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginScreenUser({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bruger Login</Text>
            <Button 
                title="Login som Bruger" 
                onPress={() => navigation.navigate('Main')} // Navigerer til hovedskærmene
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});
