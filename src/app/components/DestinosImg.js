import React from "react";
import styles from "../../assets/styles/DestinosImg.module.css";
import { useTranslation } from 'react-i18next';

export default function DestinosImg () {
    const { t } = useTranslation();

    return(
        <div className={styles.div}>
            <h2 className={styles.h2}>{t('tituloDestinos')}</h2>
        </div>
    );
}
