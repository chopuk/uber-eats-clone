import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyB6kXJ5nWf4zGU5QZux8FS5pwwfJ3tlr-E',
    authDomain: 'react-native-uber-eats-c-2e6c6.firebaseapp.com',
    projectId: 'react-native-uber-eats-c-2e6c6',
    storageBucket: 'react-native-uber-eats-c-2e6c6.appspot.com',
    messagingSenderId: '1028755505604',
    appId: '1:1028755505604:web:a2e6b3eac46200feda2491'
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
const storage = firebase.storage()

export { firebase, db, storage }