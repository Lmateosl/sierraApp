import React from "react";
import styles from "../../assets/styles/Filtro.module.css";
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import CatCard from "./CatCard";
import { useTranslation } from 'react-i18next';

export default function Filtro ({icono: Component, handleClick, categorias, handleClickCat}) {
    const {t} = useTranslation();
    return(
        <div className={styles.container}>
            <Grid container spacing={3}>
                <Grid xs={4} md={2}>
                   <Button endIcon={<Component />} onClick={handleClick} className={styles.button}>{t('precio')}</Button>
                </Grid>
                <Grid xs={8} md={10}>
                    <div className={styles.cardsCat}>
                        {categorias.map((cat, i) => {
                            return(
                                <CatCard handleClickCat={handleClickCat} cat={cat} key={i}/>
                            );
                        })}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}