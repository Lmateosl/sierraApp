import React from "react";
import Cards from "../../components/Cards";
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from "react-redux";

export default function CardHolder ({destinos, handleClickCard, handleOpenModalAdmin}) {

    const {userData} = useSelector(state => state.user);

    return(
        <div>
            <Grid container spacing={2} sx={{margin: '30px auto', width: '80%'}}>
                {
                    destinos.map((destino, i) => (
                        <Grid xs={12} md={4} key={i}>
                            <Cards destino={destino} handleClickCard={handleClickCard} />
                            {userData.admin && 
                                <button 
                                    style={{height: 40, width: '90%', margin: '0 auto', backgroundColor: '#f25b6b', color: 'white', marginTop: 20, border: 'none', borderRadius: 20, display: 'block'}}
                                    onClick={() => handleOpenModalAdmin(destino.id)}
                                >
                                    Actualizar
                                </button>
                            }
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
}