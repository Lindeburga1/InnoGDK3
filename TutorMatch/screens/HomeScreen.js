// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function HomeScreen() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [priceFilter, setPriceFilter] = useState('');
    const [timeFilter, setTimeFilter] = useState('');


    useEffect(() => {
        const db = getDatabase();
        const postsRef = ref(db, "Posts");

        const unsubscribe = onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            const postsArray = data ? Object.values(data) : [];
            setPosts(postsArray);
            setFilteredPosts(postsArray); // Start med alle opslag
        });

        return () => unsubscribe();
    }, []);

    const handleFilter = () => {
        let newFilteredPosts = posts;

        // Filtrér på pris, hvis der er angivet en værdi
        if (priceFilter) {
            const maxPrice = parseFloat(priceFilter);
            newFilteredPosts = newFilteredPosts.filter(post => post.pris <= maxPrice);
        }

        // Filtrér på timer, hvis der er angivet en værdi
        if (timeFilter) {
            const maxTime = parseFloat(timeFilter);
            newFilteredPosts = newFilteredPosts.filter(post => post.timer <= maxTime);
        }

        setFilteredPosts(newFilteredPosts);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.filterLabel}>Filtrer opslag:</Text>
            <View style={styles.filterContainer}>
                <TextInput
                    placeholder="Max pris"
                    value={priceFilter}
                    onChangeText={setPriceFilter}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Max timer"
                    value={timeFilter}
                    onChangeText={setTimeFilter}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Button title="Anvend filter" onPress={handleFilter} />
            </View>

            <FlatList
                data={filteredPosts}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text>Beskrivelse: {item.description}</Text>
                        <Text>Timer: {item.timer}</Text>
                        <Text>Pris: {item.pris} DKK</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 20, paddingHorizontal: 16 },
    filterLabel: { fontSize: 16, marginBottom: 8, fontWeight: 'bold' },
    filterContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    listContainer: { paddingBottom: 20 },
    postContainer: { 
        padding: 16, 
        marginBottom: 12, 
        borderWidth: 1, 
        borderColor: '#ddd', 
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    postTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
});
