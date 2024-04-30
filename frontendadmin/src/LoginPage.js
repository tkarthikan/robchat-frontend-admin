import React from 'react';
import { Button, Typography, Box, Paper, Container, TextField } from '@mui/material';
import { styled } from '@mui/system';

const LoginPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <Typography variant="h1">RobChat</Typography>
                    </div>
                    <Button variant="contained" type="submit" 
                    onClick={() => window.location.href = "/auth/login"}
                    >Log In</Button>
                </form>
            </FormContainer>
        </>
    );
};

const FormContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(2),
    alignItems: 'center',
    backgroundColor: '#131324',
    '.brand': {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        justifyContent: 'center',
        img: {
            height: '5rem',
        },
        h1: {
            color: 'white',
            textTransform: 'uppercase',
        },
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4),
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: '2rem',
        padding: theme.spacing(8),
    },
    input: {
        backgroundColor: 'transparent',
        padding: theme.spacing(2),
        border: '0.1rem solid #4e0eff',
        borderRadius: '0.4rem',
        color: 'white',
        width: '100%',
        fontSize: '1rem',
        '&:focus': {
            border: '0.1rem solid #997af0',
            outline: 'none',
        },
    },
    button: {
        backgroundColor: '#4e0eff',
        color: 'white',
        padding: theme.spacing(2, 4),
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '0.4rem',
        fontSize: '1rem',
        textTransform: 'uppercase',
        '&:hover': {
            backgroundColor: '#4e0eff',
        },
    },
    span: {
        color: 'white',
        textTransform: 'uppercase',
        a: {
            color: '#4e0eff',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
    },
}));

export default LoginPage;
