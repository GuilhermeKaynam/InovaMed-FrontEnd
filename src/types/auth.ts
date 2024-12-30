export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id?: string;
    email: string;
    name?: string;
    role?: 'admin' | 'patient';
  } | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PatientRegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  phone: string;
  hasInsurance: boolean;
  insuranceProvider: string;
}