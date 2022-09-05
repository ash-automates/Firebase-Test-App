import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addDoc(collectionReference, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const documentToDelete = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(documentToDelete).then(() => {
    deleteBookForm.reset();
  });
});
