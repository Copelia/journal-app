import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  // state que servirá para saber si hay o no error, si hay un cambio en el state, necesitaremos re-renderizar el dom. por eso se usa el useState
  const [formValidation, setFormValidation] = useState({});


  //cada vez que hay un cambio en el edo del formulario, ejecutaré la validación
  useEffect(() => {
    createValidators();
  }, [formState]);

  //cuando la nota activa cambie, entonces quiero que se dispare este efecto
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm])

  const isFormValid = useMemo(() => {
    for(const formValue of Object.keys(formValidation)){
      if(formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};
    for(const formField of Object.keys(formValidations)){
      //obtener la función y el mssg de error de mi obj formValidations
      const [fn, errorMessage = 'Este campo es requerido.'] = formValidations[formField];

      //crear nueva propiedad en el objeto
      // la fn recibe como arg el valor del campo del form
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    };

    //ahora mandarle el nuevo obj (formCheckedValues) al state
    setFormValidation(formCheckedValues);

  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  };
};
