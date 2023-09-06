// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDO4ovQh4bysEIQTr5F_YxdcevVVTsq3-E",
  authDomain: "triveous-assignment-c2e8e.firebaseapp.com",
  projectId: "triveous-assignment-c2e8e",
  storageBucket: "triveous-assignment-c2e8e.appspot.com",
  messagingSenderId: "212155082193",
  appId: "1:212155082193:web:a2805b0b244360fd7b2cf0",
  measurementId: "G-H8Z8W86G1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app, auth};