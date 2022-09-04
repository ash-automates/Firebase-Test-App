import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
// init the firebase app
initializeApp(firebaseConfig);

// init the firebase services
const db = getFirestore();

// reference the collection to read data from
const collectionReference = collection(db, "books");

// read the data from the collection
getDocs(collectionReference).then((snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => books.push({ ...doc.data(), id: doc.id }));
  console.log(books);
});
