import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase_setup/firebase";

const colors = [
  "#f56a00",
  "#7265e6",
  "#ffbf00",
  "#00a2ae",
  "#000000",
  "#327eb4",
  "#008000",
  "#ff1493",
  "#800080", // Additional color
  "#4b0082",
  '#c21515'// Additional color
];

export const readBudgets = async (collectionName) => {
  const data = [];
  const collectionRef = collection(db, collectionName);
  const docsSnapshot = await getDocs(collectionRef);
  if (docsSnapshot.empty) {
    console.log(`No documents in ${collectionName} collection`);
  }
  docsSnapshot.forEach((doc) => {
    data.push({ category: doc.id, amount: doc.data().Amount });
  });
  return data;
};

export const getCategoryColors = async (monzoCategories) => {
  const collectionName = 'budget'
  const categoryColors = {};
  const collectionRef = collection(db, collectionName);
  const docsSnapshot = await getDocs(collectionRef);
  if (docsSnapshot.empty) {
    console.log(`No documents in ${collectionName} collection`);
  }
  const categories = [...new Set([...docsSnapshot.docs.map((doc) => doc.id), ...monzoCategories])];
  categories.forEach((cat, i) => {
    categoryColors[cat] = colors[i % colors.length];
  });
  return categoryColors;
};

export const handleSubmit = (testdata) => {
  const ref = collection(db, "test_data"); // Firebase creates this automatically
  console.log("ref:", ref);
  let data = {
    testData: testdata,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};