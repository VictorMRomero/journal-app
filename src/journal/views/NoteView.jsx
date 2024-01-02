import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2'




export const NoteView = () => {

    const dispatch = useDispatch();
    

    const {active:activeNote, messageSave} = useSelector(state => state.journal)
    const isSaving = useSelector(state => state.journal.isSaving)

    const {body, title, onInputChange, formState, date} = useForm(activeNote);



    const dateString = useMemo(() => {
        
        const newDate = new Date(date);
        
        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {

        dispatch(setActiveNote(formState));

    }, [formState])

    useEffect(() => {
        if(messageSave.length > 0){
            Swal.fire('Nota actualizada', messageSave, "success")
        }
    }, [messageSave] )

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }


    const onFileInputChange = ({target}) => {
        if(target.files === 0) return;

        
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
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

                <input 
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{display:'none'}}
                    ref={fileInputRef}
                />
                <IconButton 
                    onClick={() => { fileInputRef.current.click() }} 
                    color="primary" disabled={isSaving}>
                    <UploadOutlined />
                </IconButton>


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
            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{mt:2}}
                    color="error"
                >
                    <DeleteOutline />
                </Button>
            </Grid>
            {/* Galeria de imagenes */}

            <ImageGallery 
                images={activeNote.imageUrls}
            />
        </Grid>
    )
}