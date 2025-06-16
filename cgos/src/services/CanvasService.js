import { db, auth } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

function getUserId() {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  return user.uid;
}

export async function salvarComponenteNoCanvas(comp) {
  const userId = getUserId();
  const ref = doc(db, "canvas", userId, "components", comp.id);
  await setDoc(ref, comp);
}

export async function carregarComponentesDoCanvas() {
  const userId = getUserId();
  const ref = collection(db, "canvas", userId, "components");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data());
}

export async function limparCanvas() {
  const userId = getUserId();
  const ref = collection(db, "canvas", userId, "components");
  const snapshot = await getDocs(ref);
  const deletions = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletions);
}
