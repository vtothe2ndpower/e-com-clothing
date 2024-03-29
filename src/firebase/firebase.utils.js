import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyCk0czYynGX__RfWdelwb5sGjyIk9o7AfY",
  authDomain: "e-com-clothing-1e27c.firebaseapp.com",
  projectId: "e-com-clothing-1e27c",
  storageBucket: "e-com-clothing-1e27c.appspot.com",
  messagingSenderId: "199697812406",
  appId: "1:199697812406:web:445ecd71bbe9dd6b328f17",
  measurementId: "G-Y4JEEFG35B"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // Does not exist
  if (!userAuth) return;

  // Does exist 
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  console.log('userRef: ', userRef);
  console.log('snapshot: ', snapshot);

  // Doesn't exist in our db
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log('Error Creating User: ', err);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;