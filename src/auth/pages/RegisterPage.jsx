import {Link as RouterLink} from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';


const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'el correo debe tener @'],
    password:[(value) => value.length >= 6, 'el password debe contener almenos 6 caracteres' ],
    displayName:[(value) => value.length >= 2, 'el nombre es obligatorio']
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const {formState, displayName, email, password, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid} = useForm (formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        
        if(!isFormValid) return;

        dispatch(startCreatingUserWithEmailPassword(formState))
        
    }

    

    return(
        <AuthLayout title='Register' >
 

            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Name" 
                            type="text" 
                            placeholder="Your name" 
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                            fullWidth/>
                    </Grid>


                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Correo" 
                            type="mail" 
                            placeholder="mail@google.com" 
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                            fullWidth/>
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Contrasena" 
                            type="password" 
                            placeholder="contrasena" 
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                            fullWidth/>
                    </Grid>


                    <Grid container spacing={2} sx={{ mb:2, mt:2}}>
                        <Grid item xs={12} sm={12}>
                            <Button type="submit" variant='contained' fullWidth sx={{ }}>
                                register
                            </Button>

                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography>Ya tienes una cuenta? </Typography>
                        <Link component={ RouterLink } color='inherit' to="/auth/login" sx={{ml:1}}>
                            Ingresar
                        </Link>
                        
                    </Grid> 

                </Grid>
            </form>

        </AuthLayout>
    )
}