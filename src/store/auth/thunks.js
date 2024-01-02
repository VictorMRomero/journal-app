
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { chekingCredentials, login, logout } from "./authSlice"


export const chekingAuthentication = () => {

    return async (dispatch) => {

        dispatch(chekingCredentials());

    }

}

export const startGoogleSignIn = () => {
    return async(dispatch) => {

        dispatch(chekingCredentials());
        const result = await singInWithGoogle();

        if(!result.ok) return dispatch( logout(result.errorMessage) )

        dispatch(login( result ))
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {

    return async( dispatch) => {
        dispatch(chekingCredentials());
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})
        
        if(!ok) return dispatch( logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}))
    } 
}

export const startLoginWithEmailPassword = ({email, password}) => {

    return async (dispatch) => {

        dispatch(chekingCredentials());

        const resp = await loginWithEmailPassword({email, password})

        

        if(!resp.ok) return dispatch( logout(resp))

        dispatch(login(resp))
    }   
}

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase();
        
        dispatch(clearNotesLogout());
        
        dispatch( logout());
    }
}