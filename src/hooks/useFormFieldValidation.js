import { useState, useEffect } from "react";

export function useFormFieldValidation(validator) {
  const [fieldValue, setFieldValue] = useState("");
  const [isFieldValid, setIsFieldValid] = useState(false);

  useEffect(() => {
    if (fieldValue.length === 0) return;
    setIsFieldValid(validator(fieldValue));
  }, [fieldValue, validator]);

  return [fieldValue, setFieldValue, isFieldValid];
}
