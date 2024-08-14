import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
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
    // Crear un nuevo documento en la colección "destinos"
    const docRef = await addDoc(collection(db, "destinos"), obj);
    console.log("Documento añadido con ID: ", docRef.id);

    // Añadir el ID del documento al propio documento
    await updateDoc(doc(db, "destinos", docRef.id), {
      id: docRef.id
    });

    console.log("ID del documento añadido correctamente");
    return {id: docRef.id, msg: 'Usuario añadido con éxito.'};

  } catch (e) {
    console.error("Error añadiendo el documento: ", e);
    return null;
  }
};