import {Link as RouterLink} from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Google } from "@mui/icons-material"

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

                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label="Repite la contrasena" 
                            type="password" 
                            placeholder="Repeat" 
                            fullWidth/>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb:2, mt:2}}>
                        <Grid item xs={12} sm={6}>
                            <Button variant='contained' fullWidth sx={{ }}>
                                register
                            </Button>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button variant='contained' fullWidth sx={{ }}>
                                <Google />
                                <Typography sx={{ml: 1}}>GOOGLE</Typography>
                            </Button>

                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={ RouterLink } color='inherit' to="/auth/login">
                            ya tienes cuenta
                        </Link>
                        
                    </Grid> 

                </Grid>
            </form>

        </AuthLayout>
    )
}