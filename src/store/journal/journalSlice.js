

import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: '',
        notes: [],
        active:null
        // active: {
        //     id:'ABC123',
        //     title:'',
        //     body: '',
        //     date: 1234567,
        //     imageUrls:[]
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
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state, action) => {

        },
        updateNote: (state, action) => {

        },
        deleteNote: (state, action) => {

        }
    }
});

export const { isSavingNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNote } = journalSlice.actions;