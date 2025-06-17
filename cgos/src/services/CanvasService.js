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

export async function salvarComponenteNoProjeto(projectId, comp) {
  const ref = doc(db, "projects", projectId, "components", comp.id);
  await setDoc(ref, comp);
}

export async function carregarComponentesDoProjeto(projectId) {
  const ref = collection(db, "projects", projectId, "components");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data());
}

export async function limparProjeto(projectId) {
  const ref = collection(db, "projects", projectId, "components");
  const snapshot = await getDocs(ref);
  const deletions = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletions);
}
