import {
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  addDoc,
  getDocs,
  collection,
  getDoc,
} from 'firebase/firestore';
import { db } from 'infra/firebase-connector.cjs';

async function get(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const user = userDoc.data();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function create(user) {
  try {
    console.log(user);
    const userRef = doc(db, 'users', user.uid);
    // Avoid modifying schema
    await setDoc(userRef, {
      devices: user.devices,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
  }
}

const user = {
  get,
  create,
};

export default user;
