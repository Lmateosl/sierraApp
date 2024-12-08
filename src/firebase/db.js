import { doc, getDoc, collection, query, where, addDoc, updateDoc, getDocs, setDoc } from 'firebase/firestore';
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

export const actuDestino = async (obj, id) => {
  try {
    // Crear o sobrescribir el documento en la colección "destinos" con la ID especificada
    const docRef = doc(db, "destinos", id);
    await setDoc(docRef, obj, { merge: true }); // { merge: true } asegura que solo actualices los campos que pasas

    console.log("Documento sobrescrito correctamente con ID: ", id);
    return { id: id, msg: 'Documento actualizado con éxito.' };

  } catch (e) {
    console.error("Error actualizando el documento: ", e);
    return null;
  }
};

export async function getDestinosBySeccion(seccionValue) {
  try {
    const destinosRef = collection(db, 'destinos'); // Referencia a la colección "destinos"
    const q = query(destinosRef, where('seccion', '==', seccionValue)); // Crea la consulta

    const querySnapshot = await getDocs(q); // Ejecuta la consulta
    const resultados = [];

    querySnapshot.forEach((doc) => {
      resultados.push({ id: doc.id, ...doc.data() }); // Agrega cada documento al array
    });

    return resultados; // Devuelve el array con los resultados
  } catch (error) {
    console.error('Error al obtener los destinos:', error);
    return []; // Devuelve un array vacío en caso de error
  }
}

export async function getDestinosPorCategorias(categorias) {
  try {
    const destinosRef = collection(db, 'destinos');
    const q = query(destinosRef, where('categoria', 'in', categorias)); // Usa el operador 'in'

    const querySnapshot = await getDocs(q);
    const resultados = [];

    querySnapshot.forEach((doc) => {
      resultados.push({ id: doc.id, ...doc.data() }); // Agrega cada documento al array
    });

    return resultados;
  } catch (error) {
    console.error('Error al obtener los destinos:', error);
    return [];
  }
}

export async function getDestinoById(destinoId) {
  try {
    const destinoRef = doc(db, "destinos", destinoId); // Referencia al documento
    const docSnap = await getDoc(destinoRef); // Obtenemos el documento

    if (docSnap.exists()) {
      // Si el documento existe, retornamos los datos
      console.log(docSnap.data());
      return docSnap.data();
    } else {
      // Si el documento no existe
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}

export const subirPago = async (pago) => {
  try {
    // Referencia a la colección 'pagos'
    const pagosCollection = collection(db, "pagos");

    // Agrega el objeto a la colección
    await addDoc(pagosCollection, pago);

    // Retorna 'ok' si la operación fue exitosa
    console.log('documento Creado');
    return "ok";
  } catch (error) {
    console.error("Error al subir el pago: ", error);
    throw new Error("No se pudo subir el pago");
  }
};
