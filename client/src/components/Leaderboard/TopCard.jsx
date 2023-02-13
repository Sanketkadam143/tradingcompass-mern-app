import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function TopCard({ backgroundColor, backgroundImage, avatarSrc, name, subName, imageSrc, cardMargin }) {
    const theme = useTheme();

    return (
        <Card sx={{
            display: 'inline-flex',
            borderRadius: 1,
            backgroundColor: backgroundColor,
            margin:2,
            backgroundImage: backgroundImage,


        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }
            } >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Avatar alt="Remy Sharp" src={avatarSrc} sx={{ width: 60, height: 60 }} />
                    <Typography component="div" color="white" variant="h6">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="white" component="div">
                        {subName}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>


                </Box>
            </ Box>
            <CardMedia
                component="img"
                sx={{ width: 151, borderRadius: 1, margin: '5px' }}
                image={imageSrc}
                alt="Live from space album cover"
            />
        </Card>
    );
}