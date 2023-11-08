import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWitEmailPassword } from '../../store/auth/thunks';
import { Google } from '@mui/icons-material';
import { Alert, Grid, Typography, TextField, Button, Link } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
  email: '',
  password: ''
};

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData);

  //si el estatus nunca cambia, no se volverá a calcular esto
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log({email, password});
    dispatch(startLoginWitEmailPassword({email, password}));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  };

  return(
      <AuthLayout title="Login">
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={ 12 } sx= {{ mt: 2}}>
              <TextField 
                label="Correo"
                type="email"
                placeholder="correo@correo.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={ 12 } sx= {{ mt: 2}}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx= {{ mb: 2, mt: 1}}>
            <Grid 
              item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
              >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx= {{ mb: 2, mt: 1}}>
            <Grid item xs={12} sm={ 6 }>
              <Button
                disabled={isAuthenticating}
                onClick={onSubmit}
                type="submit"
                variant='contained'
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={ 6 }>
              <Button
                disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant='contained'
                fullWidth
              >
                <Google/>
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
            <Grid container
              direction='row'
              justifyContent='end'
              sx={{ mt: 1 }}
            >
              <Link component={RouterLink} color='inherit' to="/auth/register">
                Crear cuenta
              </Link>
            </Grid>
          </Grid>
        </form>

      </AuthLayout>
  )
};
