import { auth, db } from './firebase'; 
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail, FacebookAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
const faceProvider = new FacebookAuthProvider();

// Función para registrar un usuario y añadir su información a Firestore
export const registerUser = async ({mail, password, ci, phone, name}) => {
    try {
      // Crea el usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, mail, password);
      const user = userCredential.user;
  
      // Crea un registro en Firestore en la colección 'users' con el UID del usuario
      await setDoc(doc(db, "users", user.uid), {
        // Aquí puedes agregar los campos que necesites
        name,
        ci,
        phone,
        email: user.email
      });
  
      return({msg: "Usuario creado y registro añadido en Firestore", id: user.uid});
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return({errorCode: 'auth/email-already-in-use'});
      } else {
      }
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // La información del usuario se encuentra en result.user
    const user = result.user;
    await setDoc(doc(db, "users", user.uid), {
      // Aquí puedes agregar los campos que necesites
      name: user.displayName,
      phone: user.phoneNumber,
      email: user.email
    });

    return({msg: "Usuario creado y registro añadido en Firestore", id: user.uid});
  } catch (error) {
    console.error(error);
  }
}

export const signInWithEmailPassword = async({mail, password}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, mail, password);
    const user = userCredential.user;
    return({msg: "Usuario Inicio Sesion en Firestore", id: user.uid});

  }catch(error) {
    console.log(error.code);
    if (error.code === 'auth/invalid-credential') {
        return({errorCode: 'wrongCredentials'});
      } else {
        
      }
  }
}

export async function recuperarContrasena(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return({msg: 'Correo de recuperación enviado.'});
  } catch (error) {
    console.error('Error al enviar correo de recuperación:', error);
  }
}

export async function loginWithFacebook() {
  try {
    const result = await signInWithPopup(auth, faceProvider);
    // La información del usuario se encuentra en result.user
    const user = result.user;
    await setDoc(doc(db, "users", user.uid), {
      // Aquí puedes agregar los campos que necesites
      name: user.displayName,
      phone: user.phoneNumber,
      email: user.email
    });

    return({msg: "Usuario creado y registro añadido en Firestore", id: user.uid});
  } catch (error) {
    console.error(error);
  }
}