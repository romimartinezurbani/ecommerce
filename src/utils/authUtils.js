import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export const isAdmin = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.role === "admin";
  }
  return false;
};
