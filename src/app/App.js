import React, { useEffect, useState } from 'react';
import NavBar from './containers/NavBar/NavBar';
import '../assets/styles/App.css';
import Snack from './components/Snack';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const { requestFinish, status, userData } = useSelector(state => state.user);
  const [openSnack, setOpenSnack] = useState(false);
  const [severity, setSeverity] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (status === 'succeeded') {
      window.localStorage.setItem('uid', userData.id);
      setSeverity('success');
      setMsg(t('respuestaOkSesison'));
    } else {
      window.localStorage.removeItem('uid');
      setSeverity('error');
      setMsg(t('respuestaErrorUsuario'));
    }
    setOpenSnack(requestFinish);
  },[requestFinish, status, t, userData])

  const handleCloseSnack = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnack(false);
  };

  return (
    <div className="App">
      <NavBar />
      <Snack openSnack={openSnack} handleCloseSnack={handleCloseSnack} severity={severity} msg={msg} />
    </div>
  );
}

export default App;
