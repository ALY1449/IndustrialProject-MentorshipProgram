'use client';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyD34-PzQb_WxlQvRrt8a2vH5oUzmr0CzKk",
        authDomain: "mentorshipapplicationform.firebaseapp.com",
        projectId: "mentorshipapplicationform",
        storageBucket: "mentorshipapplicationform.appspot.com",
        messagingSenderId: "664284335203",
        appId: "1:664284335203:web:459803b8dc8a1a6574bc56"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);


export default database;