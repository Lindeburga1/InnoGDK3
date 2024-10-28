// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// Import af skærme
import HomeScreen from './screens/HomeScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import LoginScreenTutor from './screens/LoginScreenTutor';
import LoginScreenUser from './screens/LoginScreenUser';
import LoginSelectionScreen from './screens/LoginSelectionScreen';

// Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyAFN2Q0iPWbu60dvMNCWY85P2FdeXGI6ZY",
  authDomain: "innoovelseproject.firebaseapp.com",
  databaseURL: "https://innoovelseproject-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "innoovelseproject",
  storageBucket: "innoovelseproject.appspot.com",
  messagingSenderId: "981346098801",
  appId: "1:981346098801:web:1aea2a9cb24d7f7fd145d0"
};

// Initialiser Firebase (undgå duplikering)
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} else {
    app = getApps()[0];
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Funktion til Tab navigation
function MainTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="CreatePost" component={CreatePostScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginSelection">
                {/* Valgskærm for login-type */}
                <Stack.Screen name="LoginSelection" component={LoginSelectionScreen} options={{ title: "Vælg Login Type" }} />

                {/* Login skærme */}
                <Stack.Screen name="LoginTutor" component={LoginScreenTutor} options={{ title: "Tutor Login" }} />
                <Stack.Screen name="LoginUser" component={LoginScreenUser} options={{ title: "Bruger Login" }} />
                
                {/* Hovedskærme */}
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
