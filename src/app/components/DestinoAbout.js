import React, { useEffect, useState } from "react";
import styles from '../../assets/styles/DestinoAbout.module.css';
import HotelIcon from '@mui/icons-material/Hotel';
import ArticleIcon from '@mui/icons-material/Article';
import { useTranslation } from "react-i18next";

export default function DestinoAbout ({currentLang, actualDestino}) {

    const [desc, setDesc] = useState([]);
    const {t} = useTranslation();

    useEffect(() => {
        switch (currentLang) { 
            case 'es':
                setDesc(actualDestino.lDesc.lDescEs.split('.'));
                break;
            case 'en':
                setDesc(actualDestino.lDesc.lDescEn.split('.'));
                break;
            case 'de':
                setDesc(actualDestino.lDesc.lDescDe.split('.'));
                break;
            default:
                setDesc(actualDestino.lDesc.lDescEs.split('.'));
                break;
        }
    }, [currentLang, actualDestino]);

    return(
        <div className={styles.all}>
            <img src={actualDestino.urlImg} alt="Destino imagen" width="100%" className={styles.img}/>
            {currentLang === 'es' && <h3 className={styles.h3}>{actualDestino.title.titleEs}</h3>}
            {currentLang === 'en' && <h3 className={styles.h3}>{actualDestino.title.titleEn}</h3>}
            {currentLang === 'de' && <h3 className={styles.h3}>{actualDestino.title.titleDe}</h3>}
            <div className={styles.iconoTitulo}>
                <HotelIcon sx={{marginRight: '10px'}} /> 
                {currentLang === 'es' && <p className={styles.h4}>{actualDestino.sDesc.sDescEs}</p>}
                {currentLang === 'en' && <p className={styles.h4}>{actualDestino.sDesc.sDescEn}</p>}
                {currentLang === 'de' && <p className={styles.h4}>{actualDestino.sDesc.sDescDe}</p>}
            </div>
            <h4 className={styles.p}>{t('incluye')}</h4>
            <ul>
                {desc.filter(item => item !== '').map((e, i) => <li key={i} className={styles.item}>{e}</li>)}
            </ul>
            <p className={styles.infoFolleto}>{t('folletoInfo')}</p>
            {actualDestino.pdf.pdfEs && 
                <div className={styles.pdfContainer}>
                    <ArticleIcon sx={{marginRight: '10px', color: '#f25b6b'}}/>
                    <a href={actualDestino.pdf.pdfEs} target="_blank" rel="noreferrer">{t('verDoc')}</a>
                </div>
            }
            {actualDestino.pdf.pdfEn && 
                <div className={styles.pdfContainer}>
                    <ArticleIcon sx={{marginRight: '10px', color: '#f25b6b'}}/>
                    <a href={actualDestino.pdf.pdfEn} target="_blank" rel="noreferrer">{t('verDocEn')}</a>
                </div>
            }
            {actualDestino.pdf.pdfDe && 
                <div className={styles.pdfContainer}>
                    <ArticleIcon sx={{marginRight: '10px', color: '#f25b6b'}}/>
                    <a href={actualDestino.pdf.pdfDe} target="_blank" rel="noreferrer" className={styles.a}>{t('verDocDe')}</a>
                </div>
            }
        </div>
    );
}