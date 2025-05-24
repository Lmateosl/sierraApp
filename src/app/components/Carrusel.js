import React from 'react';
import styles from '../../assets/styles/Carrusel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useTranslation } from 'react-i18next';
import { Autoplay } from 'swiper/modules';

export default function Carrusel ({imgs, section}) {
    const { t } = useTranslation();
    const handleClick = (url) => {
        const inicio = 'https://appsierraec.netlify.app/infoDestino?'
        window.location.href = inicio + url;
    };

    return (
        <div className={styles.contenedor}>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                <SwiperSlide>
                    <img src={imgs.img1} className={styles.img} alt="Destino 1" />
                    <button 
                        className={styles.boton} 
                        onClick={() => handleClick(section === 'sierraPlus' ? 'id=nBQ47SWAcvLL1LlitxtO' : 'id=b5Va1no0MdSqTCyUA5CI')}
                    >
                        {t("verDestino")}
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={imgs.img2} className={styles.img} alt="Destino 2" />
                    <button 
                        className={styles.boton} 
                        onClick={() => handleClick(section === 'sierraPlus' ? 'id=d7fjyBmYYr1RJ6sd2vnN' : 'id=cn4ypiWAXade9SppSfU2')}
                    >
                        {t("verDestino")}
                    </button>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={imgs.img4} className={styles.img} alt="Destino 4" />
                    <button 
                        className={styles.boton} 
                        onClick={() => handleClick(section === 'sierraPlus' ? 'id=sSreiSFIzntz2yyYzFsW' : 'id=sw7BrLUAge0C3UKsrDnK')}
                    >
                        {t("verDestino")}
                    </button>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
