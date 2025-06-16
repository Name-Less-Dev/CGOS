import { db, auth } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const importCollection = collection(db, "imports");

export async function importarComponente(componentId) {
  return await addDoc(importCollection, {
    userId: auth.currentUser.uid,
    componentId,
    date: new Date()
  });
}

export async function listarImportacoesDoUsuario() {
  const q = query(importCollection, where("userId", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
