import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import style from '../../assets/styles/PagoDestino.module.css';

export default function BackDrop({openBack, handleCloseBack, pagado, trans}) {
    const { t } = useTranslation();

    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: '#f25b6b', zIndex: theme.zIndex.drawer + 1 })}
                open={openBack}
            >
                {pagado ? 
                    <div>
                        {trans === 3 && 
                        <div className={style.divBack}>
                            <p className={style.pBack}>{t('pagoExitoso')}</p>
                            <button className={style.buttonBack} onClick={handleCloseBack}>{t('finalizar')}</button>
                        </div>
                        }

                    </div>
                :
                    <CircularProgress color="inherit" />
                }
            </Backdrop>
        </div>
    );
}
