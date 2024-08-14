import React, { useState } from "react";
import styles from '../../../assets/styles/Sesion.module.css';
import LogIn from "../../components/LogIn";
import SignIn from "../../components/SignIn";
import { registerUser, signInWithGoogle, signInWithEmailPassword, recuperarContrasena, loginWithFacebook } from "../../../firebase/auth";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/slices/getUserSlice";
import Snack from "../../components/Snack";
import { useTranslation } from 'react-i18next';

export default function Sesion({handleClose}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [usuario, setUsuario] = useState({});

    const onChangeHandler = ({target}) => {
        const {name, value} = target;
        setUsuario(prevUsuario => ({ ...prevUsuario, [name]: value}));
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        setSpiner(true);
        console.log(usuario);
        try {
            const data = await signInWithEmailPassword(usuario);
            console.log(data);
            const nuevo = false;
            responseGood(data, nuevo);
        }catch(error) {
            responseBad();
        }
    }


    const [phone, setPhone] = useState(null);
    const [usuarioNuevo, setUsuarioNuevo] = useState({});
    const [spiner, setSpiner] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onChangeHandlerNuevo = ({target}) => {
        const {name, value} = target;
        setUsuarioNuevo(prevUsuario => ({ ...prevUsuario, [name]: value}));
    }

    const onSubmitHandlerNuevo = async(e) => {
        e.preventDefault();
        setSpiner(true);
        console.log(usuarioNuevo);
        try{
            const data = await registerUser({...usuarioNuevo, phone: phone});
            const nuevo = true;
            console.log(data);
            responseGood(data, nuevo);
        } catch (error) { 
            responseBad();
        }
    }

    const onClickHandlerGoogleNuevo = async() => {
        try {
            const data = await signInWithGoogle();
            responseGood(data);
        }catch(error) {
            responseBad();
        }
    }


    const [snack, setSnack] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [msg, setMsg] = useState('');

    const resetPassword = async() => {
        if (!usuario.mail) {
            setError(true);
            setErrorMsg('errorReset');
            return;
        }
        try {
            setSpiner(true);
            const data = await recuperarContrasena(usuario.mail);
            setSeverity('success');
            setMsg(`${t('successReset')} ${usuario.mail}`)
            setSnack(true);
            setSpiner(false)
            console.log(data.msg);
        } catch(error) {
            responseBad();
        }
    }

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnack(false);
    };


    const responseGood = (data, nuevo) => {
        setSpiner(false);
        if (data.errorCode) {
            setError(true);
            const msg = nuevo ? "mailInUse" : 'wrongCredentials';
            setErrorMsg(msg);
            return;
        }
        dispatch(getUser(data.id));
        handleClose();
    }

    const responseBad = () => {
        setSpiner(false);
        setError(true);
        setErrorMsg('errorGeneral');
    }


    const onClickHandlerFacebook = async() => {
        try {
            const data = await loginWithFacebook();
            console.log(data);
            responseGood(data);
        }catch(error) {
            responseBad();
        }
    }

    const [changeForm, setChangeForm] = useState(true);

    return(
        <div className={styles.sesion}>
            {
                changeForm ?
                    <LogIn 
                        onChangeHandler={onChangeHandler} 
                        onSubmitHandler={onSubmitHandler} 
                        changeFormHandle={setChangeForm} 
                        spiner={spiner}
                        error={error}
                        errorMsg={errorMsg}
                        google={onClickHandlerGoogleNuevo}
                        facebook={onClickHandlerFacebook}
                        recuperarContrasena={resetPassword}
                    />
                :
                    <SignIn 
                        onChangeHandler={onChangeHandlerNuevo} 
                        onSubmitHandler={onSubmitHandlerNuevo} 
                        changeFormHandle={setChangeForm} 
                        phone={phone} setPhone={setPhone} 
                        spiner={spiner} 
                        error={error}
                        errorMsg={errorMsg}
                        google={onClickHandlerGoogleNuevo}
                        facebook={onClickHandlerFacebook}
                    />
            }
            <Snack openSnack={snack} handleCloseSnack={handleCloseSnack} severity={severity} msg={msg}/>
        </div>
    )
}