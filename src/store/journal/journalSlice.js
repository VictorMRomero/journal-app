

import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: '',
        notes: [],
        active:null,
        // active: {
        //     id:'ABC123',
        //     title:'',
        //     body: '',
        //     date: 1234567,
        imageUrls:[]
        // },
        
    },
    reducers: {
        isSavingNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active=action.payload;
            state.messageSave = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
            state.messageSave = '';
        },
        noteUpdated: (state, action) => {
            state.isSaving = false;
            
            state.notes = state.notes.map((note) => {

                    if(note.id === action.payload.id){
                    return action.payload;
                }
                return note;
            })

            state.messageSave = `${action.payload.title}, actualizada correctamente`

        },
        
        setFotosToActiveNote:(state, action) => {

            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving=false;
        },

        clearNotesLogout: (state) => {
            state.isSaving=false;
            state.messageSave = '';
            state.notes=[];
            state.active=null;
        },
        
        deleteNoteById: (state, action) => {
            
            state.active = null;
            state.notes = state.notes.filter (note => note.id !== action.payload)



        }
    }
});

export const {clearNotesLogout, setFotosToActiveNote, isSavingNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, noteUpdated, deleteNoteById } = journalSlice.actions;