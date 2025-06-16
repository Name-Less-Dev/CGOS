import { db, auth } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const createCollection = collection(db, "creates");

export async function registrarCriacao(componentId) {
  return await addDoc(createCollection, {
    developerId: auth.currentUser.uid,
    componentId,
    date: new Date()
  });
}

export async function listarComponentesCriados() {
  const q = query(createCollection, where("developerId", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
