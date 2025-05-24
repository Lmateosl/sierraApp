import React, { useCallback, useEffect, useState } from "react";
import Carrusel from "../../components/Carrusel";
import DestinosImg from "../../components/DestinosImg";
import Filtro from "../../components/Filtro";
import CardHolder from "./CardHolder";
import AdminContainer from "../Admin/AdminContainer";
import { confirmPayment } from '../../features/httpRequests';
import MultModal from '../../components/MultModal';
import Skeleton from '@mui/material/Skeleton';
import BackDrop from "../../components/BackDrop";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import imgSierra1 from "../../../assets/imgs/Galapagos_2.jpeg";
import imgSierra2 from "../../../assets/imgs/Cuyabeno.jpeg";
import imgSierra3 from "../../../assets/imgs/Chimborazo.jpeg";
import imgSierra4 from "../../../assets/imgs/Volcanes.jpeg";
import imgPlus1 from "../../../assets/imgs/Las cuevas-min.png";
import imgPlus2 from "../../../assets/imgs/chimborazo-min.png";
import imgPlus3 from "../../../assets/imgs/Banos de agua santa-min.png";
import imgPlus4 from "../../../assets/imgs/prado gampling-min.png";
import { subirPago } from "../../../firebase/db";
import { sendEmail } from "../../features/email";
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDestinos, getDestinosCat, priceDown, priceUp } from "../../redux/slices/getDestinosSlice";
const categoriaSierraEc = ['Aventura', 'Relax', 'Trekking', 'Turismo Cultural', 'Galápagos', 'Full Days'];
const categoriaSierraPls = ['Thrill Expeditions', 'Cruise Trips', 'Galapagos Islands', 'Refined Relaxation', 'Luxury City Escapes'];

const imgsSierra = {
    img1: imgSierra1,
    img2: imgSierra2,
    img3: imgSierra4,
    img4: imgSierra3
}

const imgSierraPlus = {
    img1: imgPlus1,
    img2: imgPlus2,
    img3: imgPlus4,
    img4: imgPlus3
}

let cat = [];

export default function Destinos () {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const section = searchParams.get('section');
    const categoria = searchParams.get('cat');
    const [imgsPass, setImgsPass] = useState({});
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        if (section === 'sierraEc') {
            setImgsPass(imgsSierra);
            setCategorias(categoriaSierraEc);
        } else {
            setImgsPass(imgSierraPlus);
            setCategorias(categoriaSierraPls);
        }
    }, [section]);


    const [buttonFiltro, setButtonFiltro] = useState(true);
    const [iconFiltro, setIconFiltro] = useState(AdsClickIcon)

    const handleClickFiltro = () => {
        if (buttonFiltro) {
            setButtonFiltro(false);
            setIconFiltro(KeyboardDoubleArrowDownIcon);
            dispatch(priceUp());
        } else {
            setButtonFiltro(true);
            setIconFiltro(KeyboardDoubleArrowUpIcon);
            dispatch(priceDown());
        }
        console.log(destinos);
    } 
    

    const handleClickCatFiltro = cate => {
        if (cat.some(e => e === cate)) {
            cat = cat.filter(x => x !== cate);
        } else {
            cat.push(cate);
        }
        console.log(cat);
        if(cat.length > 0) {
            dispatch(getDestinosCat(cat));
        } else {
            dispatch(getDestinos(section));
        }
    }


    const {status, destinos} = useSelector(state => state.destinos);
    const dispatch = useDispatch();

    useEffect(() => {
        if (categoria) {
            const tempArray = [categoria];
            dispatch(getDestinosCat(tempArray));
        } else {
            dispatch(getDestinos(section));
        }
    }, [dispatch, section, categoria]);


    const navigate = useNavigate();

    const handleClickCard = (id) => {
        navigate(`/infoDestino?id=${id}`);
    }


    const [openModalAdmin, setOpenModalAdmin] = useState(false);
    const [id, setId] = useState('');
    const handleOpenModalAdmin = (id) => {
        setId(id);
        setOpenModalAdmin(true);
    }
    const handleCloseModalAdmin = () => setOpenModalAdmin(false);


    const [openBack, setOpenBack] = React.useState(false);
    const [transStatus, setTransStatus] = useState(0);
    const [pagado, setPagado] = useState(false);
    const idTrans = searchParams.get('id');
    const idClient = searchParams.get('clientTransactionId');

    const handleCloseBack = () => {
        setOpenBack(false);
        const section = JSON.parse(window.localStorage.getItem('pagoInfo'));
        navigate(`/?section=${section.destinoInfo.seccion}`)
    };

    const handleOpen = useCallback(async () => {
        setOpenBack(true);
        const paymentData = {"id": parseInt(idTrans), "clientTxId": idClient};
        try {
            const data = await confirmPayment(paymentData);
            console.log(data);
            const datosPago = JSON.parse(window.localStorage.getItem('pagoInfo'));
            datosPago.transId = data.transactionId;
            const subido = await subirPago(datosPago);
            if (subido === 'ok') {
                const email = await sendEmail(process.env.REACT_APP_EMAILJS_TEMPLATEID_GRACIAS, datosPago);
                const email2 = await sendEmail(process.env.REACT_APP_EMAILJS_TEMPLATEID_CONTACTATE, datosPago);
                if (email && email2) {
                    console.log('Correos enviados');
                }
            }
            setTransStatus(data.statusCode);
            setPagado(true);
        } catch (error) {
            console.error('Error confirming payment:', error.message);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (idTrans && idClient) {
            if (idTrans === '0') {
                const idDestino = JSON.parse(window.localStorage.getItem('pagoInfo'));
                console.log(idDestino.destinoId);
                navigate(`/infoDestino?id=${idDestino.destinoId}`);
                //window.localStorage.removeItem('pagoInfo');
            } else {
                handleOpen();
            }
        }
    }, [handleOpen, idClient, idTrans, navigate]);

    return(
        <div>
            <div>
                <DestinosImg />
                {/*<h2 style={{marginLeft: 35, color: '#f25b6b', fontSize: '25px', marginTop: 40}}>{t("encuentraDestinos")}</h2>*/}
                <Filtro icono={iconFiltro} handleClick={handleClickFiltro}  categorias={categorias} handleClickCat={handleClickCatFiltro}/>
                {
                    status === 'loading' 
                        &&
                    <div style={{width: '80%', margin: '0 auto', display: 'block'}}>     
                        <Skeleton variant="rounded" width={'100%'} height={100} sx={{marginBottom: '20px'}} />
                        <Skeleton variant="rounded" width={'100%'} height={100} sx={{marginBottom: '20px'}} />
                        <Skeleton variant="rounded" width={'100%'} height={100} sx={{marginBottom: '20px'}} />
                    </div>
                }
                {
                    status === 'failed' && "Ocurrio un error al cargar los destinos."
                }
                {
                    status === 'succeeded' && <CardHolder destinos={destinos} handleClickCard={handleClickCard} handleOpenModalAdmin={handleOpenModalAdmin}/>
                }
                <h2 style={{marginLeft: 35, color: '#f25b6b', fontSize: '25px', marginTop: 40}}>{t("destinosPopulares")}</h2>
                <Carrusel imgs={imgsPass} section={section}/>
            </div>
            <MultModal open={openModalAdmin} handleClose={handleCloseModalAdmin} component={AdminContainer} type='admin' id={id}/>
            <BackDrop openBack={openBack} handleCloseBack={handleCloseBack} trans={transStatus} pagado={pagado}/>
        </div>
    );
}
