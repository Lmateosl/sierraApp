import React from "react";
import styles from "../../assets/styles/Footer.module.css";
import img from "../../assets/imgs/logoSierraSinfondoAzul.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RememberMeIcon from '@mui/icons-material/RememberMe';

export default function Footer() {
    return(
        <>
        <footer className={styles.footer}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <img alt="Logo footer" src={img} className={styles.img}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <LocationOnIcon sx={{color: '#f25b6b'}}/>
                <p style={{color: 'white', fontSize: '18px', padding: '0 20px'}}>Agustín Agualongo y Francisco Tamariz, Cuenca - Ecuador.</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <RememberMeIcon sx={{color: '#f25b6b'}}/>
                <p style={{color: 'white', fontSize: '18px'}}>098 768 2019</p>
                <RememberMeIcon sx={{color: '#f25b6b'}}/>
                <p style={{color: 'white', fontSize: '18px'}}>098 768 2019</p>
            </div>
        </footer>
        <p className={styles.copyRight}><span style={{color: '#f25b6b'}}>&copy;</span>2024 Sierra Ec. All rights reserved.</p>
        </>
    );
}