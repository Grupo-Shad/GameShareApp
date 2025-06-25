export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// Validaciones individuales
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, message: "El email es requerido" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "El email no tiene un formato válido" };
  }

  return { isValid: true, message: "" };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password.trim()) {
    return { isValid: false, message: "La contraseña es requerida" };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      message: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  return { isValid: true, message: "" };
};

export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, message: "El nombre es requerido" };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      message: "El nombre debe tener al menos 2 caracteres",
    };
  }

  return { isValid: true, message: "" };
};

export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword.trim()) {
    return { isValid: false, message: "Debes confirmar tu contraseña" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Las contraseñas no coinciden" };
  }

  return { isValid: true, message: "" };
};

export const validateTermsAcceptance = (
  accepted: boolean
): ValidationResult => {
  if (!accepted) {
    return {
      isValid: false,
      message: "Debes aceptar los términos y condiciones",
    };
  }

  return { isValid: true, message: "" };
};

// Validaciones de formularios completos
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export const validateLoginForm = (
  formData: LoginFormData
): ValidationResult => {
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  if (!formData.password.trim()) {
    return { isValid: false, message: "Por favor completa todos los campos" };
  }

  return { isValid: true, message: "" };
};

export const validateRegisterForm = (
  formData: RegisterFormData
): ValidationResult => {
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    return nameValidation;
  }

  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  const confirmPasswordValidation = validatePasswordConfirmation(
    formData.password,
    formData.confirmPassword
  );
  if (!confirmPasswordValidation.isValid) {
    return confirmPasswordValidation;
  }

  const termsValidation = validateTermsAcceptance(formData.acceptTerms);
  if (!termsValidation.isValid) {
    return termsValidation;
  }

  return { isValid: true, message: "" };
};

export const validateForgotPasswordForm = (
  formData: ForgotPasswordFormData
): ValidationResult => {
  return validateEmail(formData.email);
};
