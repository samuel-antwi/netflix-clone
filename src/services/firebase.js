import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth;
