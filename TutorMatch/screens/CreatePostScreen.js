// screens/CreatePostScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';

export default function CreatePostScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState('');
    const [pris, setPris] = useState('');

    const handleSavePost = async () => {
        const db = getDatabase();
        const postsRef = ref(db, "Posts");

        if (title && description && timer && pris) {
            await push(postsRef, { title, description, timer, pris,});
            Alert.alert("Opslag oprettet!");
            setTitle('');
            setDescription('');
            setTimer('');
            setPris('');
            navigation.navigate("Home");
        } else {
            Alert.alert("Alle felter skal udfyldes");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Titel"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Beskrivelse"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { height: 100 }]}
                multiline
            />
            <TextInput
                placeholder="Timer"
                value={timer}
                onChangeText={setTimer}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Pris"
                value={pris}
                onChangeText={setPris}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Gem opslag" onPress={handleSavePost} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    input: { borderColor: 'gray', borderWidth: 1, padding: 8, marginBottom: 12, width: '100%' },
});
