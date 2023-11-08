import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { startCreatingUserWitEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: 'cora@gmail.com',
  password: '9876543',
  displayName: 'Cor'
};

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una arroba'],
  password: [(value) => value.length >= 6, 'El pass debe tener más de 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
};

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth);

  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { 
          displayName,
          email,
          password,
          onInputChange,
          formState,
          isFormValid,
          emailValid,
          passwordValid,
          displayNameValid
        } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return; 

    dispatch(startCreatingUserWitEmailPassword(formState));

  }

  return(
      <AuthLayout title="Register">
        <h1>Form valid{isFormValid ? 'Correcto' : 'Incorrecto'}</h1>
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={ 12 } sx= {{ mt: 2}}>
              <TextField
                label="Nombre completo"
                type="texto"
                placeholder="Nombre completo"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={ 12 } sx= {{ mt: 2}}>
              <TextField
                label="Email"
                type="email"
                placeholder="Email"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
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
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
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
            <Grid item sm={ 6 }>
              <Button
                disabled={isCheckingAuth}
                type= "submit"
                variant='contained'
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>


            <Grid container
              direction='row'
              justifyContent='end'
              sx={{ mt: 1 }}
            >
              <Typography sx={{ mr: 1}}>¿Ya tienes una cuenta?</Typography>
              <Link component={RouterLink} color='inherit' to="/auth/login">
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>

      </AuthLayout>
  )
};
