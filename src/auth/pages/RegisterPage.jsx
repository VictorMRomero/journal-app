import {Link as RouterLink} from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"


export const RegisterPage = () => {


    return(
        <AuthLayout title='Register' >

            <form action="">
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Name" 
                            type="text" 
                            placeholder="Your name" 
                            fullWidth/>
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="LastName" 
                            type="text" 
                            placeholder="Your last name" 
                            fullWidth/>
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Correo" 
                            type="mail" 
                            placeholder="mail@google.com" 
                            fullWidth/>
                    </Grid>

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Contrasena" 
                            type="password" 
                            placeholder="contrasena" 
                            fullWidth/>
                    </Grid>


                    <Grid container spacing={2} sx={{ mb:2, mt:2}}>
                        <Grid item xs={12} sm={12}>
                            <Button variant='contained' fullWidth sx={{ }}>
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