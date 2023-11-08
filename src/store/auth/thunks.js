//acciones para despachar tareas asíncronas
import { signInGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../firebase/provider';
import { clearNotesLogout } from '../journal/journalSlice';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuth = (email, password ) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = (email, password ) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWitEmailPassword = ({email, password, displayName}) => {
  return async(dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});
    if(!ok) return dispatch(logout({errorMessage}));
    dispatch(login({uid, displayName, email, photoURL}));
  };
};

export const startLoginWitEmailPassword = ({email, password}) => {
  return async(dispatch) => {
    dispatch(checkingCredentials());
    const result = await loginWithEmailPassword({email, password});
    if(!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
