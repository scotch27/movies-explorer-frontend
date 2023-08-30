import { useState, useCallback } from "react";

const useForm = (formName = "form") => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(name + " - " + value);

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setIsFormValid(event.target.closest(`#${formName}`).checkValidity());
  };

  // Сброс формы
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setValues, setErrors, setIsFormValid]
  );

  return {
    values,
    errors,
    handleChange,
    isFormValid,
    resetForm,
  };
};

export default useForm;
