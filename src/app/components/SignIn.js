import React from "react";
import styles from '../../assets/styles/SignIn.module.css';
import TextField from '@mui/material/TextField';
import { Button, Box } from "@mui/material";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslation } from 'react-i18next';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import CircularProgress from '@mui/material/CircularProgress';

export default function SignIn ({onChangeHandler, onSubmitHandler, changeFormHandle, phone, setPhone, spiner, error, errorMsg, google, facebook}) {
    const { t } = useTranslation();

    return (
        <div className={styles.all}>
            <h1 className={styles.h1}>{t('siginTitle')}</h1>
            <p className={styles.p1}>
                {t('alContinuar')} 
                <a href="#h1" className={styles.a}>
                    {t('acuerdoDeUsuario')}
                </a>
                {t('confirmas')}
                <a href="#h1" className={styles.a}>
                    {t('privacidad')}
                </a>
            </p>
            <Button 
                variant="contained" 
                startIcon={<FacebookOutlinedIcon />}
                className={styles.botonesRedes}
                onClick={facebook}
                style={{border: '1px solid #1877F2', color: '#1877F2'}}
            >
                Facebook
            </Button>
            <Button 
                variant="contained" 
                startIcon={<GoogleIcon />}
                onClick={google}
                className={styles.botonesRedes}
                style={{border: '1px solid #EA4335', color: '#EA4335'}}
            >
                Google
            </Button>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent:'center',
                    margin: '0px 0px',
                    alignItems: 'center',
                    height: '10px',
                    textAlign: 'center',
                    flexDirection: 'row',
                    width: {xs: '90% !important', md: '80% !important'},
                    marginBottom: 2
                }}
            >
                <div style={{ borderTop: '1px solid #343e47', width: '100%'}}></div>
                <p style={{margin: '0px 5px', fontWeight: 700, fontSize: 14}}>{t("o")}</p>
                <div style={{ borderTop: '1px solid #343e47', width: '100%'}}></div>
            </Box>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <TextField 
                    label={t("name")}
                    type='text'
                    name="name"
                    className={styles.input}
                    onChange={onChangeHandler}
                    sx={{
                        width: { xs: '90%', md: '80%' },
                        marginBottom: 3,
                        fontSize: '13px !important',
                        // Estilo cuando está enfocado
                        '& label.Mui-focused': {
                        color: '#343e47',
                        },
                        '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#343e47',
                        },
                        },
                    }}                  
                    required
                    focused
                />
                <TextField 
                    label={t("id")}
                    type='number'
                    name="ci"
                    className={styles.input}
                    onChange={onChangeHandler}
                    sx={{
                        width: { xs: '90%', md: '80%' },
                        marginBottom: 3,
                        fontSize: '13px !important',
                        // Estilo cuando está enfocado
                        '& label.Mui-focused': {
                        color: '#343e47',
                        },
                        '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#343e47',
                        },
                        },
                    }}                  
                    required
                    focused
                />
                <PhoneInput
                    placeholder={t("phone")}
                    name='phone'
                    value={phone}
                    onChange={setPhone}
                    className={styles.input}
                    defaultCountry="EC"
                />
                <TextField 
                    label={t("mail")}
                    type='email'
                    name="mail"
                    className={styles.input}
                    onChange={onChangeHandler}
                    sx={{
                        width: { xs: '90%', md: '80%' },
                        marginBottom: 3,
                        fontSize: '13px !important',
                        // Estilo cuando está enfocado
                        '& label.Mui-focused': {
                        color: '#343e47',
                        },
                        '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#343e47',
                        },
                        },
                    }}                  
                    required
                    focused
                />
                <TextField 
                    label={t("password")}
                    name="password"
                    type='password'
                    className={styles.input}
                    onChange={onChangeHandler}
                    sx={{
                        width: { xs: '90%', md: '80%' },
                        marginBottom: 0,
                        fontSize: '13px',
                        // Estilo cuando está enfocado
                        '& label.Mui-focused': {
                        color: '#343e47',
                        },
                        '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#343e47',
                        },
                        },
                    }}                  
                    required
                    focused
                />
                <button type="submit" className={styles.botonLogin}>
                    {spiner ? 
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                            <CircularProgress sx={{color: '#eadf21', width: '20px !important', height: '20px !important'}}/>
                        </Box>
                        :
                        t('botonLogin') 
                    }
                </button>
                <p className={styles.error}>{error && t(errorMsg)}</p>
                <p className={styles.p}>{t('vistoAntes')} <a href="#h1" className={styles.a} onClick={() => changeFormHandle(true)}>{t('iniciaAqui')}</a></p>
            </form>
        </div>
    )
}