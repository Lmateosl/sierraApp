import React from "react";
import styles from '../../assets/styles/Admin.module.css';
import UploadImg from "./UploadImg";
import { TextField, Box, CircularProgress, Select, MenuItem, InputLabel, FormControl } from "@mui/material";


const styleInput = {
    width: { xs: '90%', md: '80%' },
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

export default function Admin ({
    spiner, error, url, handleUpload, 
    handleImageChange, valueSelect, handleSelectChange, 
    handleTitleChange, handleSDescChange, handleLDescChange,
    handleSubmit, handleSelectCategoria, valueCategoria,
    handleFileChange, handleSubmitPdf, pdfEs, pdfEn, pdfDe,
    handlePrecioChange, cantegoriasList
}) {

    return (
        <div className={styles.all}>
            <h1 className={styles.h1}>Añadir Destino</h1>
            <h3 className={styles.h3}>Subir Imagen</h3>
            <UploadImg url={url} handleUpload={handleUpload} handleImageChange={handleImageChange} texto="Subir"/>
            <h3 className={styles.h3}>Subir PDF</h3>
            <UploadImg pdf={pdfEs} handleUpload={handleSubmitPdf} handleImageChange={handleFileChange} texto="Español"/>
            <UploadImg pdf={pdfEn} handleUpload={handleSubmitPdf} handleImageChange={handleFileChange} texto="Ingles"/>
            <UploadImg pdf={pdfDe} handleUpload={handleSubmitPdf} handleImageChange={handleFileChange} texto="Alemàn"/>
            <form className={styles.form}>
                <h3 className={styles.h3}>Titulo</h3>
                <TextField label='Español' type='text' name="titleEs" sx={styleInput} onChange={handleTitleChange} required focused />
                <TextField label='Ingles' type='text' name="titleEn"  sx={styleInput} onChange={handleTitleChange} required focused />
                <TextField label='Alemàn' type='text' name="titleDe"  sx={styleInput} onChange={handleTitleChange} required focused />
                <h3 className={styles.h3}>Descripción Corta</h3>
                <TextField label='Español' type='text' name="sDescEs" sx={styleInput} onChange={handleSDescChange} required focused />
                <TextField label='Ingles' type='text' name="sDescEn" sx={styleInput} onChange={handleSDescChange} required focused />
                <TextField label='Alemàn' type='text' name="sDescDe" sx={styleInput} onChange={handleSDescChange} required focused />
                <h3 className={styles.h3}>Descripción Larga</h3>
                <TextField label='Español' type='text' name="lDescEs" sx={styleInput} onChange={handleLDescChange} required focused />
                <TextField label='Ingles' type='text' name="lDescEn" sx={styleInput} onChange={handleLDescChange} required focused />
                <TextField label='Alemàn' type='text' name="lDescDe" sx={styleInput} onChange={handleLDescChange} required focused />
                <h3 className={styles.h3}>Sección</h3>
                <FormControl fullWidth sx={styleInput}>
                    <InputLabel id="select-label-seccion">Select</InputLabel>
                    <Select
                        labelId="select-label-seccion"
                        id="select-seccion"
                        value={valueSelect}
                        label="Sección"
                        className={styles.input}
                        onChange={({target}) => {handleSelectChange(target.value)}}
                    >
                        <MenuItem value="sierraEc">SierraEc</MenuItem>
                        <MenuItem value="sierra+">Sierra+</MenuItem>
                    </Select>
                </FormControl>
                <h3 className={styles.h3}>Categoría</h3>
                <FormControl fullWidth sx={styleInput}>
                    <InputLabel id="select-label-categoria">Select</InputLabel>
                    <Select
                        labelId="select-label-categoria"
                        id="select-categoria"
                        value={valueCategoria}
                        label="Categoría"
                        className={styles.input}
                        onChange={({target}) => {handleSelectCategoria(target.value)}}
                    >
                        {cantegoriasList.map((cat, index) => <MenuItem key={index} value={cat}>{cat}</MenuItem>)}
                    </Select>
                </FormControl>
                <h3 className={styles.h3}>Precio</h3>
                <TextField label='Precio' type='text' name="precio" sx={styleInput} onChange={handlePrecioChange} required focused />
                <button type="submit" className={styles.botonLogin} onClick={handleSubmit}>
                    {spiner ? 
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                            <CircularProgress sx={{color: '#eadf21', width: '20px !important', height: '20px !important'}}/>
                        </Box>
                        :
                        "Enviar"
                    }
                </button>
                <p className={styles.error}>{error && "Error al enviar la solicitud"}</p>
            </form>
        </div>
    )
}