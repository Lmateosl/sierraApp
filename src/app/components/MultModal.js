import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const styleSesion = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {md: '30%', xs: '75%'},
  bgcolor: 'background.paper',
  border: '2px solid #f25b6b',
  borderRadius: '20px',
  boxShadow: 24,
  p: '20px 20px',
};

const styleAdmin = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {md: '55%', xs: '75%'},
  bgcolor: 'background.paper',
  border: '2px solid #f25b6b',
  borderRadius: '20px',
  boxShadow: 24,
  p: '20px 20px',
  maxHeight: '80vh !important',
  overflowY: 'auto'
};

export default function MultModal({open, handleClose, component: Component, type}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={type === 'sesion' ? styleSesion : styleAdmin}>
          <Component handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}