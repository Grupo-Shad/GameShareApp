import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ActivityIndicator, View, Text } from "react-native";
import { auth } from "../config/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:", user?.email || "No user");
        setUser(user);
        setLoading(false);
        setError(null);
      });

      return unsubscribe;
    } catch (initError: any) {
      console.error("Error inicializando Firebase:", initError);
      setError("Error de configuración de Firebase");
      setLoading(false);
      return () => {};
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, {
        displayName: name,
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  };

  const logout = async () => {
    try {
      console.log("🔥 Iniciando logout...");
      await signOut(auth);
      console.log("✅ Logout exitoso - Estado de auth limpiado");
    } catch (error: any) {
      console.error("❌ Error en logout:", error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
  };
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-4">
          {error ? `Error: ${error}` : "Inicializando Firebase..."}
        </Text>
        {error && (
          <Text className="text-red-500 mt-2 text-center px-4">
            Verifica tu configuración de Firebase
          </Text>
        )}
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/email-already-exceeds-length":
    case "auth/email-already-in-use":
      return "Este email ya está registrado";
    case "auth/invalid-email":
      return "Email inválido";
    case "auth/user-not-found":
      return "Usuario no encontrado";
    case "auth/wrong-password":
      return "Contraseña incorrecta";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres";
    case "auth/too-many-requests":
      return "Demasiados intentos. Intenta más tarde";
    case "auth/user-disabled":
      return "Esta cuenta ha sido deshabilitada";
    case "auth/invalid-credential":
      return "Credenciales inválidas";
    case "auth/network-request-failed":
      return "Error de conexión. Verifica tu internet";
    case "auth/quota-exceeded":
      return "Límite de envío de emails excedido. Intenta más tarde";
    case "auth/missing-email":
      return "Email es requerido";
    default:
      return "Error de autenticación. Intenta nuevamente";
  }
}
