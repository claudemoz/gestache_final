import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyAfvwpW6ziwASdZd2wx-YxQng_B9yn_wUM",
//   authDomain: "ges-tache.firebaseapp.com",
//   projectId: "ges-tache",
//   storageBucket: "ges-tache.appspot.com",
//   messagingSenderId: "948366225037",
//   appId: "1:948366225037:web:5935e320b5d367d78a3cc4"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCDvq11TD_oe2mfFk1Wy-og0O6RDqTX2bQ",
  authDomain: "ges-taches.firebaseapp.com",
  projectId: "ges-taches",
  storageBucket: "ges-taches.firebasestorage.app",
  messagingSenderId: "1064377873464",
  appId: "1:1064377873464:web:5f8e628c4b03161e6f22cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const Auth = auth

export const register =  async (email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        return [res, null]
    } catch (error) {
        return [null, error.code]
    }
}

export const login = async (email, password)=>{
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        return [res, null]
    } catch (error) {
        return [null, error.code]
    }
}

export const logout = async ()=>{
    try {
         await signOut(auth)
        return [true, null]
    } catch (error) {
        return [null, error.code]
    }
}

const errorsTranslations = {
    'auth/email-already-in-use': 'L\'email indiqué est déjà lié à un compte existant',
    'auth/invalid-email': 'L\'email n\'a pas un bon format',
    'auth/operation-not-allowed': 'La connexion via email & mot de passe n\'est pas activée',
    'auth/weak-password': 'Le mot de passe est trop faible (moins de 6 caractères)',
    'auth/user-disabled': 'Le compte lié à cet email est désactivé',
    'auth/user-not-found': 'Le compte lié à cet email n\'existe pas',
    'auth/wrong-password': 'Le mot de passe ne correspond pas à ce compte'
  }

export const translateErrorCode = (errorCode)=>{
    if(errorsTranslations[errorCode]){
        return errorsTranslations[errorCode]
    }else{
        return `Erreur inconnue au sein de FireBase. (${errorCode})`
    }
}
