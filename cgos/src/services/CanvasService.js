import { db, auth } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc
} from "firebase/firestore";

export async function salvarComponenteNoCanvas(comp) {
  const ref = doc(db, "canvas", auth.currentUser.uid, "components", comp.id);
  await setDoc(ref, comp);
}

export async function carregarComponentesDoCanvas() {
  const ref = collection(db, "canvas", auth.currentUser.uid, "components");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data());
}

export async function limparCanvas() {
  const ref = collection(db, "canvas", auth.currentUser.uid, "components");
  const snapshot = await getDocs(ref);
  const deletes = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletes);
}
