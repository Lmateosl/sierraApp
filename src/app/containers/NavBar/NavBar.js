import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../../assets/imgs/logoSierraFullSinfondoAzul.png';
import spain from "../../../assets/imgs/spain.png";
import en from "../../../assets/imgs/united-states.png";
import de from "../../../assets/imgs/germany.png";
import styles from '../../../assets/styles/NavBar.module.css';
import { useTranslation } from 'react-i18next';
import MultModal from '../../components/MultModal';
import Sesion from '../Sesion/Sesion';
import AdminContainer from '../Admin/AdminContainer';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logout } from '../../redux/slices/getUserSlice';

const pages = ['INICIO', 'NOSOTROS', 'CONTACTANOS'];
const settings = ['cuenta', 'misViajes'];

function NavBar() {
  const { status, userData } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem('uid')) {
      dispatch(getUser(window.localStorage.getItem('uid')))
    }
    window.localStorage.setItem("lang", "es");
  }, [dispatch])


  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    console.log(page);
  };


  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLangMenu = () => {
    setAnchorEl(null);
  };


  const [anchorElCell, setAnchorElCell] = useState(null);
  const openCell = Boolean(anchorElCell);
  const handleClickCell = (event) => {
    setAnchorElCell(event.currentTarget);
  };
  const handleCloseLangMenuCell = () => {
    setAnchorElCell(null);
  };


  const { t, i18n } = useTranslation();
  const [langFlag, setLangFlag] = useState(<img src={spain} alt="Icono" width="15" height="15" style={{marginRight: 10}}/>);
  const [lang, setLang] = useState('Español');
  const changeLang = (lang) => {
    switch (lang) {
      case 'es': 
        setLangFlag(<img src={spain} alt="Icono" width="15" height="15" style={{marginRight: 10}}/>);
        setLang('Español');
        window.localStorage.setItem("lang", "es");
        i18n.changeLanguage('es');
        break;
      case 'en': 
        setLangFlag(<img src={en} alt="Icono" width="15" height="15" style={{marginRight: 10}}/>);
        setLang('English');
        window.localStorage.setItem("lang", "en");
        i18n.changeLanguage('en');
        break;
      case 'de': 
        setLangFlag(<img src={de} alt="Icono" width="15" height="15" style={{marginRight: 10}}/>);
        setLang('Deutsche');
        window.localStorage.setItem("lang", "de");
        i18n.changeLanguage('de');
        break;
      default: 
        setLangFlag(<img src={spain} alt="Icono" width="15" height="15" style={{marginRight: 10}}/>);
        setLang('Español');
        window.localStorage.setItem("lang", "es");
        i18n.changeLanguage('es');
        break;
    }
    setAnchorEl(null);
  };


  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  const [openModalAdmin, setOpenModalAdmin] = useState(false);
  const handleOpenModalAdmin = () => setOpenModalAdmin(true);
  const handleCloseModalAdmin = () => setOpenModalAdmin(false);

  return (
    <AppBar position="static" className={styles.all}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} className={styles.logo} alt="The Sierra Logo"/>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none',},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => {handleCloseNavMenu(page)}}>
                  <Typography textAlign="center" className={styles.menuOption} >{t(page)}</Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <Button
                  id="basic-button"
                  className={styles.botonConImagen}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickCell}
                >
                  {langFlag}
                  {lang}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElCell}
                  open={openCell}
                  onClose={handleCloseLangMenuCell}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => changeLang('es')}><img src={spain} alt="Icono" width="15" height="15" style={{marginRight: 10}}/><Typography textAlign="center" className={styles.menuOption}>Español</Typography></MenuItem>
                  <MenuItem onClick={() => changeLang('en')}><img src={en} alt="Icono" width="15" height="15" style={{marginRight: 10}}/><Typography textAlign="center" className={styles.menuOption}>English</Typography></MenuItem>
                  <MenuItem onClick={() => changeLang('de')}><img src={de} alt="Icono" width="15" height="15" style={{marginRight: 10}}/><Typography textAlign="center" className={styles.menuOption}>Deutsche</Typography> </MenuItem>
                </Menu>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {handleCloseNavMenu(page)}}
                className={styles.menuOption}
                sx={{ my: 2, display: 'block' }}
              >
                {t(page)}
              </Button>
            ))}
            <Button
              id="basic-button"
              className={styles.botonConImagen}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {langFlag}
              {lang}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseLangMenu}
            >
              <MenuItem onClick={() => changeLang('es')}><img src={spain} alt="Icono" width="15" height="15" style={{marginRight: 10}}/><Typography textAlign="center" className={styles.menuOption}>Español</Typography></MenuItem>
              <MenuItem onClick={() => changeLang('en')}><img src={en} alt="Icono" width="15" height="15" style={{marginRight: 10}}/><Typography textAlign="center" className={styles.menuOption}>English</Typography></MenuItem>
              <MenuItem onClick={() => changeLang('de')}><img src={de} alt="Icono" width="15" height="15" style={{marginRight: 10}}/><Typography textAlign="center" className={styles.menuOption}>Deutsche</Typography></MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <img src={logo} className={styles.logo2} alt="The Sierra Logo"/>
          </Box>
          {
            status === 'succeeded' ? 
              <Box sx={{ }}>
                <Tooltip title="Open settings">
                  <Button
                    className={styles.botonMenuOption}
                    onClick={handleOpenUserMenu}
                  >
                    {userData.name.split(' ')[0]}
                  </Button>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" className={styles.sesion}>{t(setting)}</Typography>
                    </MenuItem>
                  ))}
                  {
                    userData.admin 
                      && 
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" className={styles.sesion} onClick={handleOpenModalAdmin}>Añadir Destino</Typography>
                    </MenuItem>
                  }
                  <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" className={styles.sesion} onClick={() => {dispatch(logout())}} sx={{color: '#f25b6b'}}>{t('logOut')}</Typography>
                    </MenuItem>
                </Menu>
              </Box>
            :
              <Box>
                <Button
                  className={styles.botonMenuOption}
                  onClick={handleOpenModal}
                >
                  {t('SesionIn')}
                </Button>
              </Box>
          }
        </Toolbar>
      </Container>
      <MultModal open={openModal} handleClose={handleCloseModal} component={Sesion} type='sesion'/>
      <MultModal open={openModalAdmin} handleClose={handleCloseModalAdmin} component={AdminContainer} type='admin'/>
    </AppBar>
  );
}
export default NavBar;
