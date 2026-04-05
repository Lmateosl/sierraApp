# SierraEc

[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-BaaS-FFCA28?style=for-the-badge&logo=firebase&logoColor=000000)](https://firebase.google.com/)
[![MUI](https://img.shields.io/badge/MUI-UI%20System-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![i18next](https://img.shields.io/badge/i18next-Multilingual-26A69A?style=for-the-badge)](https://www.i18next.com/)
[![Deploy](https://img.shields.io/badge/Production-Live-0A7B83?style=for-the-badge)](https://sierraec.com)

Frontend for a travel booking platform built to support real business operations. The application enables users to explore destinations, review package details, authenticate, start booking flows, and complete online payments.

**Live:** [sierraec.com](https://sierraec.com)

## Executive Summary

SierraEc is a product-driven frontend application designed around usability, third-party service integration, and a structure that can support catalog management, authentication, content administration, and booking workflows.

From a frontend engineering perspective, the project focuses on:

- building a maintainable React SPA
- integrating a lightweight service-based backend approach
- centralizing authentication and persistence with Firebase as a Backend as a Service
- supporting real commercial flows for catalog, booking, and payment

## Technical Approach

This project follows a decoupled frontend architecture where the UI consumes external services and delegates cross-cutting backend capabilities to specialized platforms:

- **Firebase as BaaS** for authentication and Firestore persistence
- **PayPhone** for payment processing
- **Cloudinary** for media asset handling
- **EmailJS** for contact-related automation

This approach reduces custom backend complexity, speeds up delivery, and keeps the team focused on product features and user experience.

## Core Features

- destination discovery and browsing flows
- detailed package views with commercial and visual information
- authentication via email/password, Google, and Facebook
- Firestore-based persistence for users, destinations, and payment-related records
- booking flow connected to an online payment gateway
- admin panel for creating and updating destination content
- multilingual support with `i18next`

## Tech Stack

### Core

- `React 18`
- `JavaScript`
- `React Router DOM`
- `Redux Toolkit`

### UI and Experience

- `Material UI`
- `Emotion`
- `Swiper`

### Services and Platform

- `Firebase Auth`
- `Cloud Firestore`
- `Cloudinary`
- `PayPhone API`
- `EmailJS`

### Internationalization

- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`

## Architecture

The codebase is organized in functional layers to separate presentation, business logic, and data access concerns:

```text
src/
├── app/
│   ├── components/     # Reusable UI building blocks
│   ├── containers/     # Screens and feature flows
│   ├── features/       # Domain integrations and helpers
│   └── redux/          # Global state and slices
├── assets/             # Fonts, images, and styles
└── firebase/           # Firebase setup, auth, and Firestore access
```

## Firebase as Backend as a Service

Firebase is used as the managed backend layer to cover key product requirements without building a traditional custom backend for every workflow:

- **Authentication** for sign-up, social login, and password recovery
- **Cloud Firestore** for users, destinations, and reservation-related records
- environment-based configuration through `REACT_APP_*` variables

This setup keeps operational complexity low while allowing the product to move faster and iterate on business features more efficiently.

## Covered Use Cases

### End User

- browse travel packages
- review destination details
- authenticate with multiple providers
- move through the booking and payment flow

### Internal Operations

- create new destinations
- update existing package content
- manage commercial information from a web interface

## Environment Variables

The project relies on `REACT_APP_*` variables for configuring external services, including:

- Firebase
- PayPhone
- other frontend-connected integrations

Example local setup:

```bash
cp .env .env.local
npm install
npm start
```

## Available Scripts

```bash
npm start
npm test
npm run build
```

## Portfolio Value

This project highlights practical experience in:

- building frontend products connected to real business operations
- integrating multiple third-party services into a cohesive user flow
- designing authentication and booking experiences
- using BaaS to accelerate delivery without overengineering
- structuring a React codebase that can evolve with product needs

## Author

**Luis Mateo Sanchez Loaiza**

Senior Frontend Engineer  
React | Angular | Full-Stack | AI Systems
