import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DestinoAbout from "../../components/DestinoAbout";
import PagoDestino from "../../components/PagoDestino";
import Sesion from '../Sesion/Sesion';
import MultModal from '../../components/MultModal';
import Grid from '@mui/material/Unstable_Grid2';
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDestinoInfo } from "../../redux/slices/getInfoDestinosSlice";
import Skeleton from '@mui/material/Skeleton';
import { preparePayment } from "../../features/httpRequests";
import { v4 as uuidv4 } from 'uuid';

export default function InfoDestino () {

    const { t } = useTranslation();
    const {status, actualDestino} = useSelector(state => state.infoDestinos);
    const {userData} = useSelector(state => state.user);
    const {currentLang} = useSelector(state => state.lang);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDestinoInfo(id));
    }, [dispatch, id]);


    const [valueSelect, setValueSelect] = useState('');
    const [priceTour, setPriceTour] = useState(0);

    function normalizeInteger(value) {
        // Lo conviertes a string por si viene ya como número
        const cleaned = String(value).replace(/\D/g, ''); // elimina comas, puntos, espacios, etc.
        return cleaned === '' ? null : Number(cleaned);
    }
    const handleSelectChange = value => {
        const actualValue = parseInt(value.split(':')[1].slice(2));
        setValueSelect(value);
        const convertedValue = normalizeInteger(actualValue);
        setPriceTour(convertedValue);
    }

    const [valueSelectGuia, setValueSelectGuia] = useState('');

    const handleSelectChangeGuia = value => {
        setValueSelectGuia(value);
        console.log(value);
    }
    

    const uniqueId = uuidv4();

    const handlePayment = async () => {

        if (!window.localStorage.getItem('uid')) {
            handleOpenModal();
            return;
        }

        if (priceTour === 0) {
            alert(t('priceSelect'));
            return;
        }

        if (valueSelectGuia.length < 1) {
            alert(t('guiaSelect'));
            return;
        }

        const data ={
            amount: priceTour > 200 ? 10000 : priceTour * 100,
            amountWithoutTax: priceTour > 200 ? 10000 : priceTour * 100,
            clientTransactionId: uniqueId,
            reference: `Reservation: ${actualDestino.title.titleEs} || ${actualDestino.sDesc.sDescEs}`,
            phoneNumber: userData.phone || null,
            email:  userData.email,
            responseUrl: process.env.REACT_APP_PAYPHONE
        };

        console.log(data);
        try {
            const response = await preparePayment(data);
            console.log(response.payWithCard);
            window.localStorage.setItem('pagoInfo', JSON.stringify({userInfo: userData, tarifa: valueSelect, asesor: valueSelectGuia, destinoId: id, destinoInfo: actualDestino}));
            window.location.href = response.payWithCard;
        } catch (error) {
            alert('Error en la llamada: ' + error.message);
        }
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Grid container spacing={1} sx={{width: {xs: '90%', md: '70%'}, margin: '30px auto'}}>
                {status === 'loading' && (
                    <>
                        <Skeleton variant="rounded" width={'100%'} height={100} sx={{marginTop: '20px'}}/>
                        <Skeleton variant="rounded" width={'100%'} height={100} />
                        <Skeleton variant="rounded" width={'100%'} height={200} />
                    </>
                )}
                {status === 'succeeded' && actualDestino && (
                    <>
                        <Grid xs={12} md={8}>
                            <DestinoAbout currentLang={currentLang} actualDestino={actualDestino} />
                        </Grid>
                        <Grid xs={12} md={4}>
                            <PagoDestino 
                                actualDestino={actualDestino} 
                                handlePayment={handlePayment} 
                                handleSelectChange={handleSelectChange} 
                                valueSelect={valueSelect}
                                valueSelectGuia={valueSelectGuia}
                                handleSelectGuiaChange={handleSelectChangeGuia}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
            <MultModal open={openModal} handleClose={handleCloseModal} component={Sesion} type='sesion'/>
        </>
    );
}