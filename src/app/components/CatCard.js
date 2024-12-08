import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import styles from "../../assets/styles/Filtro.module.css";

export default function CatCard ({i, cat, handleClickCat}) {
    const {t} = useTranslation();
    const [clicked, setClicked] = useState(false);

    const handleClickButton = () => {
        if (clicked) {
            setClicked(false);
        } else {
            setClicked(true);
        }
    }

    return(
        <div>
            <Button onClick={() => {handleClickCat(cat); handleClickButton()}} className={clicked ? styles.buttonClicked : styles.button}>{t(cat)}</Button>
        </div>
    );
}