import React from "react";
import { View, ViewProps } from "react-native";

interface SafeViewProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function SafeView({
  children,
  className = "",
  ...props
}: SafeViewProps) {
  const defaultClasses = "p-4 pt-10";
  const combinedClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses;

  return (
    <View className={combinedClasses} {...props}>
      {children}
    </View>
  );
}
