import React from "react";
import styles from "../../assets/styles/PagoDestino.module.css";
import { useTranslation } from "react-i18next";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import elvira from '../../assets/imgs/1-Team_Elvira.webp';
import kiki from '../../assets/imgs/5-Team_Kiki.webp';
import otra from '../../assets/imgs/2-Team_Leslie.webp';

const team = [
    {img: elvira, mail: 'info@sierraec.com', nombre: 'Ma. Elvira'},
    {img: kiki, mail: 'operaciones@sierraec.com', nombre: 'Kiki Farfán'},
    {img: otra, mail: 'ventas1@sierraec.com', nombre: 'Leslie Orellana'}
]


export default function PagoDestino ({actualDestino, handlePayment, handleSelectChange, valueSelect, valueSelectGuia, handleSelectGuiaChange}) {
    const { t } = useTranslation();
    const styleInput = {
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
        }
    }
    return(
        <div className={styles.all}>
            <div className={styles.container}>
                <h3 className={styles.h3}>{t('tituloPago')}</h3>
                {parseFloat(actualDestino.precio.split('.')[0].split(':')[1].slice(2)) > 200 ? 
                    <p className={styles.p}>{t('pagoInicial') + actualDestino.precio.split('.')[0].split(':')[1].slice(2) + t('pagoInicial2')}</p>
                    :
                    <p className={styles.p}>{t('pagoInicial') + actualDestino.precio.split('.')[0].split(':')[1].slice(2) + t('pagoInicial3')}</p>
                }
                <Accordion 
                    sx={{borderRadius: '20px', boxShadow: 'none', fontFamily: 'sierraEc'}}>
                    <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{color: '#f25b6b'}}/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{textAlign: 'center', color: '#f25b6b'}}
                            >
                                {t('reservar')}
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl fullWidth sx={styleInput}>
                            <InputLabel id="select-label-seccion2">{t('selectTarifa')}</InputLabel>
                            <Select
                                labelId="select-label-seccion2"
                                id="select-seccion2"
                                value={valueSelect}
                                label="tarifa"
                                className={styles.input}
                                placeholder="Selecciona una tarifa..."
                                onChange={({target}) => {handleSelectChange(target.value)}}
                            >
                                {actualDestino.precio.split('.').map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={styleInput}>
                            <InputLabel id="select-label-seccion3">{t('guia')}</InputLabel>
                            <Select
                                labelId="select-label-seccion3"
                                id="select-seccion3"
                                value={valueSelectGuia}
                                label="guia......"
                                className={styles.input}
                                placeholder="Selecciona una tarifa..."
                                onChange={({target}) => {handleSelectGuiaChange(target.value)}}
                            >
                                {team.map((item, i) => 
                                    <MenuItem key={i} value={item.mail}>
                                        <img src={item.img} width="10%" alt="Advisor Fotho" style={{borderRadius: '50%', marginRight: 10}}/> 
                                        {item.nombre}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <p className={styles.p2}>{t('escoge')}
                            <a href="https://sierraec.com/nosotros" rel="noreferrer" target="_blank">{t('aqui')}</a>
                        </p>
                        <button className={styles.button} onClick={handlePayment}>Pagar</button>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
