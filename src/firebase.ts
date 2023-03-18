import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as fileReff,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const chatRef = ref(db, "chat");
export const UserRef = ref(db, "users");
export default app;

export const upload = async (file: File | null, currentUser: any) => {
  if (file) {
    const fileRef = fileReff(storage, currentUser.uid + ".png");

    uploadBytes(fileRef, file);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    localStorage.setItem("profile", downloadUrl);
    return downloadUrl;
  } else {
    return localStorage.setItem(
      "profile",
      "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
    );
  }
};
