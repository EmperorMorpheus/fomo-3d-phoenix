import React from 'react';
import { Container, Typography } from '@mui/material';

function Footer() {
    return (
        <Container maxWidth="sm" component="footer">
            <Typography variant="body1" color="textSecondary" align="center">
                © {new Date().getFullYear()} Your Company Name
            </Typography>
        </Container>
    );
}

export default Footer;
