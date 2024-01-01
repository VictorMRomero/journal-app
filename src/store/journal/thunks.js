import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, isSavingNote, noteUpdated, setActiveNote, setNotes, setSaving } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";

export const startNewNote = () => {

    return async(dispatch, getState) => {

        dispatch(isSavingNote())
        
        const {uid} = getState().auth;
        

        //uid del usuario
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),

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