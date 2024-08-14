import React from 'react';
import style from '../../assets/styles/UploadImg.module.css';

const UploadImg = ({url, pdf, handleUpload, handleImageChange, texto}) => {

  return (
    <div className={style.pdf}>
      <input type="file" onChange={handleImageChange} />
      <button onClick={() => handleUpload(texto)} className={style.input} >{texto}</button>
      {url && <img src={url} alt="Uploaded" width={50} className={style.img}/>}
      {pdf && <a href={pdf} target="_blank" className={style.pdf} rel="noopener noreferrer">Ver PDF subido</a>}
    </div>
  );
};

export default UploadImg;
