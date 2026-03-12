import { useState, useCallback } from 'react';
export interface FormError {
  [key: string]: string;
}

interface UseFormReturn<T> {
  values: T;
  errors: FormError;
  touched: { [key: string]: boolean };
  isSubmitting: boolean;
  setValue: (field: keyof T, value: unknown) => void;
  setError: (field: string, error: string) => void;
  setTouched: (field: string, touched: boolean) => void;
  setErrors: (errors: FormError) => void;
  resetForm: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => (e: React.FormEvent) => Promise<void>;
}

export const useForm = <T extends Record<string, unknown>>(

  initialValues: T,
  validate?: (values: T) => FormError
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormError>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(
    (field: keyof T, value: unknown) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  const setFieldTouched = useCallback((field: string, isTouched: boolean) => {
    setTouched((prev) => ({
      ...prev,
      [field]: isTouched,
    }));
  }, []);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const target = e.target;
      const { name, value, type } = target as HTMLInputElement;
      const finalValue =
        type === 'checkbox' ? (target as HTMLInputElement).checked : value;

      setValue(name as keyof T, finalValue);

      if (touched[name] && validate) {
        const newErrors = validate({ ...values, [name]: finalValue });
        if (newErrors[name]) {
          setFieldError(name, newErrors[name]);
        } else {
          setFieldError(name, '');
        }
      }
    },
    [values, touched, validate, setValue, setFieldError]
  );

  const handleBlur = useCallback(
    (
      e: React.FocusEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name } = e.target;
      setFieldTouched(name, true);

      if (validate) {
        const newErrors = validate(values);
        if (newErrors[name]) {
          setFieldError(name, newErrors[name]);
        }
      }
    },
    [values, validate, setFieldTouched, setFieldError]
  );

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) => {
      return async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate) {
          const newErrors = validate(values);
          setErrors(newErrors);

          if (Object.keys(newErrors).length > 0) {
            return;
          }
        }

        try {
          setIsSubmitting(true);
          await onSubmit(values);
        } catch (_error) {
          console.error('Form submission error:', _error);
        } finally {
          setIsSubmitting(false);
        }
      };
    },
    [values, validate]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setError: setFieldError,
    setTouched: setFieldTouched,
    setErrors,
    resetForm,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useForm;
