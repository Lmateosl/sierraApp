import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Snack({openSnack, handleCloseSnack, severity, msg}) {

    return(
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert
                onClose={handleCloseSnack}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
        </Snackbar>
    )
}