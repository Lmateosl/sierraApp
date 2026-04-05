# SierraEc

[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-BaaS-FFCA28?style=for-the-badge&logo=firebase&logoColor=000000)](https://firebase.google.com/)
[![MUI](https://img.shields.io/badge/MUI-UI%20System-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![i18next](https://img.shields.io/badge/i18next-Multilingual-26A69A?style=for-the-badge)](https://www.i18next.com/)
[![Deploy](https://img.shields.io/badge/Production-Live-0A7B83?style=for-the-badge)](https://sierraec.com)

Frontend de una plataforma de reservas turísticas orientada a operación real de negocio. La aplicación permite explorar destinos, consultar detalle de paquetes, autenticarse, iniciar flujos de reserva y conectar el proceso con pagos online.

**Live:** [sierraec.com](https://sierraec.com)

## Resumen Ejecutivo

SierraEc es un proyecto construido con una mentalidad de producto: experiencia de usuario clara, integración con servicios externos y una arquitectura suficiente para soportar catálogo, autenticación, administración de contenido y flujos de compra.

Desde el lado frontend, el foco está en:

- construir una SPA mantenible sobre React
- consumir un backend ligero basado en servicios
- centralizar autenticación y persistencia con Firebase como Backend as a Service
- soportar operación comercial real con catálogo, reservas y pagos

## Enfoque Técnico

Este proyecto adopta una arquitectura frontend desacoplada, donde la UI consume servicios externos y delega capacidades transversales a plataformas especializadas:

- **Firebase como BaaS** para autenticación y persistencia en Firestore
- **PayPhone** para el flujo de pagos
- **Cloudinary** para manejo de assets multimedia
- **EmailJS** para automatizaciones de contacto

Este enfoque reduce complejidad de backend custom, acelera entrega de producto y facilita iteración sobre funcionalidades de negocio.

## Funcionalidades Principales

- exploración y navegación de destinos turísticos
- detalle de paquetes con información comercial y visual
- autenticación con email/password, Google y Facebook
- persistencia de usuarios, destinos y pagos sobre Firestore
- flujo de reserva conectado con pasarela de pago
- panel administrativo para alta y actualización de destinos
- soporte multilenguaje con `i18next`

## Stack

### Core

- `React 18`
- `JavaScript`
- `React Router DOM`
- `Redux Toolkit`

### UI y experiencia

- `Material UI`
- `Emotion`
- `Swiper`

### Servicios y plataforma

- `Firebase Auth`
- `Cloud Firestore`
- `Cloudinary`
- `PayPhone API`
- `EmailJS`

### Internacionalización

- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`

## Arquitectura

La aplicación está organizada por capas funcionales para separar presentación, lógica de negocio y acceso a datos:

```text
src/
├── app/
│   ├── components/     # Componentes reutilizables de UI
│   ├── containers/     # Vistas y flujos de negocio
│   ├── features/       # Integraciones y helpers de dominio
│   └── redux/          # Estado global y slices
├── assets/             # Fuentes, imágenes y estilos
└── firebase/           # Configuración, auth y acceso a Firestore
```

## Firebase como Backend as a Service

Firebase se utiliza como capa de backend administrado para cubrir necesidades clave del producto sin levantar un servidor tradicional para cada flujo:

- **Authentication** para registro, login social y recuperación de contraseña
- **Cloud Firestore** para usuarios, destinos y registros asociados al proceso de reserva
- configuración basada en variables de entorno para aislar credenciales por ambiente

Esto permite concentrar el esfuerzo de desarrollo en experiencia, conversión y administración de contenido, manteniendo una base técnica simple de operar.

## Casos de Uso Cubiertos

### Usuario final

- descubrir paquetes turísticos
- revisar información detallada de un destino
- autenticarse con distintos proveedores
- avanzar en el flujo de compra y pago

### Operación interna

- crear nuevos destinos
- actualizar contenido de paquetes existentes
- administrar información comercial desde interfaz web

## Variables de Entorno

El proyecto utiliza variables `REACT_APP_*` para la configuración de servicios externos, incluyendo:

- Firebase
- PayPhone
- otras integraciones conectadas al frontend

Ejemplo de setup local:

```bash
cp .env .env.local
npm install
npm start
```

## Scripts

```bash
npm start
npm test
npm run build
```

## Valor de Portfolio

Este proyecto muestra experiencia práctica en:

- construcción de productos frontend conectados a negocio real
- integración de múltiples servicios third-party
- diseño de flujos de autenticación y reserva
- uso de BaaS para acelerar delivery sin sacrificar escalabilidad inicial
- organización de una base de código React mantenible para evolución de producto

## Autor

**Luis Mateo Sanchez Loaiza**

Senior Frontend Engineer  
React | Angular | Full-Stack | AI Systems
