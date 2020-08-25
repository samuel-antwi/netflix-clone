import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'cinenight-60e02.firebaseapp.com',
  databaseURL: 'https://cinenight-60e02.firebaseio.com',
  projectId: 'cinenight-60e02',
  storageBucket: 'cinenight-60e02.appspot.com',
  messagingSenderId: '344827260790',
  appId: '1:344827260790:web:bf1544d29567eb59071457',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth;
