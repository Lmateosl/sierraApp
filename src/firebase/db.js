import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function getUserDocument(userId) {
  // Referencia al documento del usuario
  const userDocRef = doc(db, `users/${userId}`);
  // Obtener el documento del usuario
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    // Retornar los datos del documento
    console.log({ id: userDocSnapshot.id, ...userDocSnapshot.data() });
    return { id: userDocSnapshot.id, ...userDocSnapshot.data() };
  } else {
    // Manejar el caso donde el documento no exista
    console.error('No such document!');
    return null;
  }
}

export const uploadDestino = async (obj) => {
  try {
    const docRef = await addDoc(collection(db, "destinos"), obj);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};