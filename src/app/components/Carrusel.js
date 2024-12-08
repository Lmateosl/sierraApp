import React from 'react';
import styles from '../../assets/styles/Carrusel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useTranslation } from 'react-i18next';
import { Autoplay } from 'swiper/modules';

export default function Carrusel ({imgs}) {
    const { t } = useTranslation();
    return (
        <div className={styles.contenedor}>
            <Swiper
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={{
                640: {
                slidesPerView: 1,
                },
                768: {
                slidesPerView: 2,
                },
                1024: {
                slidesPerView: 3,
                },
            }}
            autoplay={{
                delay: 3000, // Cambia cada 3 segundos
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            >
            <SwiperSlide>
                <img src={imgs.img1} className={styles.img} alt="Destino 1" />
                <button className={styles.boton}>{t("verDestino")}</button>
            </SwiperSlide>
            <SwiperSlide>
                <img src={imgs.img2} className={styles.img} alt="Destino 2" />
                <button className={styles.boton}>{t("verDestino")}</button>
            </SwiperSlide>
            <SwiperSlide>
                <img src={imgs.img3} className={styles.img} alt="Destino 3" />
                <button className={styles.boton}>{t("verDestino")}</button>
            </SwiperSlide>
            <SwiperSlide>
                <img src={imgs.img4} className={styles.img} alt="Destino 4" />
                <button className={styles.boton}>{t("verDestino")}</button>
            </SwiperSlide>
            </Swiper>
        </div>
      );
}
