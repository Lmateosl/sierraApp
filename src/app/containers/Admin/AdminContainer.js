import React, { useState } from "react";
import Admin from "../../components/Admin";
import imageCompression from 'browser-image-compression';
import { uploadDestino } from "../../../firebase/db";

const categoriaSierraEc = ['Aventura', 'Relax', 'Trekking', 'Turismo Cultural', 'Galápagos', 'Full Days'];
const categoriaSierraPls = ['Thrill Expeditions', 'Cruise Trips', 'Galapagos Islands', 'Refined Relaxation', 'Luxury City Escapes'];

export default function AdminContainer ({handleClose}) {
    const [spiner, setSpiner] = useState(false);
    const [error, setError] = useState(false);


    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
  
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
  
      try {
        const compressedFile = await imageCompression(file, options);
        setImage(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    };
  
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'sierra'); // Reemplaza con tu upload preset
      formData.append('cloud_name', 'mr-builder'); // Reemplaza con tu cloud name
  
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/mr-builder/image/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        setUrl(data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };


    const [file, setFile] = useState(null);
    const [pdfEs, setPdfEs] = useState("");
    const [pdfEn, setPdfEn] = useState("");
    const [pdfDe, setPdfDe] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmitPdf = async (lang) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "sierra");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/mr-builder/raw/upload",
                {
                method: "POST",
                body: formData
                }
            );
            const data = await response.json();
            if (lang === "Español") {
                setPdfEs(data.secure_url);
            } else if (lang === "Ingles") {
                setPdfEn(data.secure_url);
            } else {
                setPdfDe(data.secure_url);
            }
        } catch (error) {
            console.error("Error uploading the file", error);
        }
    };


    const [title, setTitle] = useState({});

    const handleTitleChange = ({target}) => {
        const {value, name} = target;
        setTitle(prevTitle => ({...prevTitle, [name]: value}))
    }


    const [sDesc, setSDesc] = useState({});

    const handleSDescChange = ({target}) => {
        const {value, name} = target;
        setSDesc(prevTitle => ({...prevTitle, [name]: value}))
    }


    const [lDesc, setLDesc] = useState({});

    const handleLDescChange = ({target}) => {
        const {value, name} = target;
        setLDesc(prevTitle => ({...prevTitle, [name]: value}))
    }


    const [precio, setPrecio] = useState("");

    const handlePrecioChange = ({target}) => {
        setPrecio(target.value)
    }


    const [valueSelect, setValueSelect] = useState('');
    const [categoriasList, setCategoriasList] = useState([]);

    const handleSelectChange = value => {
        if (value === 'sierraEc') {
            setCategoriasList(categoriaSierraEc);
        } else {
            setCategoriasList(categoriaSierraPls);
        }
        setValueSelect(value);
    }


    const [valueCategoria, setValueCategoria] = useState('');


    const handleSubmit = async e => {
        e.preventDefault();
        setSpiner(true)
        const newDestino = objectMaker(title, sDesc, lDesc, url, valueSelect, valueCategoria, pdfEs, pdfEn, pdfDe, precio);
        if (!url) {alert('Se necesita agregar una imagen'); setSpiner(false); return;}
        try {
            const data = await uploadDestino(newDestino);
            setSpiner(false);
            console.log(data.id);
            alert('Documento creado con éxito.');
            handleClose();
        } catch (error) {
            setSpiner(false)
            setError(true);
        }

    }

    const objectMaker = (title, sDesc, lDesc, urlImg, seccion, categoria, pdfEs, pdfEn, pdfDe, precio) => {
        return (
            {
                title: title,
                sDesc: sDesc,
                lDesc: lDesc,
                urlImg,
                seccion,
                categoria,
                pdf: {
                    pdfEn,
                    pdfEs,
                    pdfDe
                },
                precio
            }
        )
    }

    return(
        <>
        <Admin 
            spiner={spiner} 
            error={error}
            url={url}
            handleUpload={handleUpload}
            handleImageChange={handleImageChange}
            valueSelect={valueSelect}
            handleSelectChange={handleSelectChange}
            handleTitleChange={handleTitleChange}
            handleSDescChange={handleSDescChange}
            handleLDescChange={handleLDescChange}
            handleSubmit={handleSubmit}
            handleSelectCategoria={setValueCategoria}
            valueCategoria={valueCategoria}
            pdfEs={pdfEs}
            pdfEn={pdfEn}
            pdfDe={pdfDe}
            handleFileChange={handleFileChange}
            handleSubmitPdf={handleSubmitPdf}
            handlePrecioChange={handlePrecioChange}
            cantegoriasList={categoriasList}
        />
        </>
    )
}