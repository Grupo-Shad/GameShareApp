import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";

// Simulamos un usuario para pruebas
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setLoading(false);
      console.log("Auth inicializado (modo demo)");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simular login exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser({
        uid: "demo-user-123",
        email: email,
        displayName: "Usuario Demo",
      });

      console.log("Login exitoso (modo demo)");
    } catch (error: any) {
      throw new Error("Error de autenticación (modo demo)");
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // Simular registro exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser({
        uid: "demo-user-123",
        email: email,
        displayName: name,
      });

      console.log("Registro exitoso (modo demo)");
    } catch (error: any) {
      throw new Error("Error de registro (modo demo)");
    }
  };

  const logout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(null);
      console.log("Logout exitoso (modo demo)");
    } catch (error: any) {
      throw new Error("Error de logout (modo demo)");
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  // Mostrar loading screen mientras se inicializa
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-4">Cargando...</Text>
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
