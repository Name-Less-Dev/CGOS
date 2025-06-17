import { db, auth } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where
} from "firebase/firestore";

function getUserId() {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  return user.uid;
}

// Criar novo projeto
export async function criarProjeto(nome, descricao) {
  const userId = getUserId();
  const id = `project-${Date.now()}`;
  const ref = doc(db, "projects", id);
  await setDoc(ref, {
    id,
    nome,
    descricao,
    userId,
    createdAt: new Date()
  });
  return id;
}

// Listar projetos do usuário
export async function listarProjetos() {
  const userId = getUserId();
  const q = query(collection(db, "projects"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}

// Apagar projeto (inclui os componentes também)
export async function apagarProjeto(projectId) {
  const componentsRef = collection(db, "projects", projectId, "components");
  const snapshot = await getDocs(componentsRef);
  const deletions = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletions);

  await deleteDoc(doc(db, "projects", projectId));
}
