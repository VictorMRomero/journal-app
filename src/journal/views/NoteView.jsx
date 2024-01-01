import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo } from "react"
import { setActiveNote, startSaveNote } from "../../store/journal"




export const NoteView = () => {

    const dispatch = useDispatch();
    

    const activeNote = useSelector(state => state.journal.active)
    const isSaving = useSelector(state => state.journal.isSaving)

    const {body, title, onInputChange, formState, date} = useForm(activeNote);



    const dateString = useMemo(() => {
        
        const newDate = new Date(date);
        
        return newDate.toUTCString();
    }, [date])

    useEffect(() => {

        dispatch(setActiveNote(formState));

    }, [formState])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }


    return(
        <Grid 
            container
            className="animate__animated animate__fadeIn animate__faster"
             direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'> { dateString }</Typography>
            </Grid>
            <Grid item>
                <Button 
                    disabled={isSaving}
                    onClick={onSaveNote} color="primary" sx={{padding: 2}}> 
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese el titulo"
                    label="titulo"
                    sx={{ border: 'none', mb: 1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Que sucedio hoy?"
                    label="description"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}

                />
            </Grid>
            {/* Galeria de imagenes */}

            <ImageGallery />
        </Grid>
    )
}