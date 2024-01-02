import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, isSavingNote, noteUpdated, setActiveNote, setFotosToActiveNote, setNotes, setSaving } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers";

export const startNewNote = () => {

    return async(dispatch, getState) => {

        dispatch(isSavingNote())
        
        const {uid} = getState().auth;
        

        //uid del usuario
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls:[]

        }

        const newDoc = doc(collection(FirebaseDB, `/${uid}/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        //dispatch 
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote))
        //dispatch (activarNote)
    }

}

export const startLoadingNotes = () => {

    return async(dispatch, getState) => {
        const {uid} = getState().auth;

        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes))

    }
}

export const startSaveNote = () => {


    return async(dispatch, getState) => {

        dispatch(setSaving());


        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;
 
        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}`);

        
        await setDoc(docRef, noteToFirestore, {merge:true});

        dispatch(noteUpdated(note));


    }
}

export const startUploadingFiles = (files = []) => {

    return async(dispatch) => {
        dispatch(setSaving());
        
        const fileUploadPromises = [];

        for(const file of files) {
            fileUploadPromises.push( fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setFotosToActiveNote(photosUrls));
        
    }

}

export const startDeletingNote = () => {


    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        const { active: note} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));


    }
}