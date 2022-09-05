import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth();

// reference the collection to read data from
const booksReference = collection(db, "books");

// query
const q = query(booksReference, orderBy("createdAt"));

// add an event listener to changes in the books collection
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((book) => {
    books.push({ ...book.data(), id: book.id });
  });
  console.table(books);
});

// adding books
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addDoc(booksReference, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
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

// fetching a single book with realtime updates
const documentToGet = doc(db, "books", "67xWXWBYmnAEm1NOHeU4");

onSnapshot(documentToGet, (doc) => {
  console.table({ ...doc.data(), id: doc.id });
});

// updating a book's title
const updateBookForm = document.querySelector(".update");
updateBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const documentToUpdate = doc(db, "books", updateBookForm.id.value);
  updateDoc(documentToUpdate, {
    title: "Updated title",
  }).then(() => {
    updateBookForm.reset();
  });
});

// signing users-up
const signUpForm = document.querySelector(".signup");
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = signUpForm.email.value;
  const password = signUpForm.password.value;
  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log(cred.user);
  });
});
