// screens/LoginSelectionScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginSelectionScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vælg login type</Text>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Login som Tutor" 
                    onPress={() => navigation.navigate('LoginTutor')} 
                />
                <Button 
                    title="Login som Bruger" 
                    onPress={() => navigation.navigate('LoginUser')} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '80%' },
});
