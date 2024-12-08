import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

export default function Cards ({destino, handleClickCard}) {

    const { t } = useTranslation();

    const {currentLang} = useSelector(state => state.lang);

    return(
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => {handleClickCard(destino.id)}}>
                <CardMedia
                component="img"
                height="140"
                image={destino.urlImg}
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div" width='100%' sx={{fontSize: '150%', fontFamily: 'sierraEc', fontWeight: 'bold'}}>
                    {currentLang === 'es' && destino.title.titleEs}
                    {currentLang === 'en' && destino.title.titleEn}
                    {currentLang === 'de' && destino.title.titleDe}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'sierraEc', textAlign: 'left'}}>
                    {currentLang === 'es' && destino.sDesc.sDescEs}
                    {currentLang === 'en' && destino.sDesc.sDescEn}
                    {currentLang === 'de' && destino.sDesc.sDescDe}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'sierraEc', textAlign: 'left'}}>
                    {t('precioDesde')}
                    <strong>
                        {destino.precio.split('.')[0].split(':')[1]}
                    </strong>
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}