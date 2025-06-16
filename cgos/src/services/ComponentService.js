import { db, auth } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const componentesCollection = collection(db, "components");

export async function criarComponente({ type, description }) {
  const docRef = await addDoc(componentesCollection, {
    type,
    description,
    pub_date: new Date(),
    authorId: auth.currentUser.uid,
  });
  return docRef.id;
}

export async function listarComponentes() {
  const snapshot = await getDocs(componentesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
