const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Fix para Firebase y Hermes engine
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

// Configuración para alias @
config.resolver.alias = {
  "@": path.resolve(__dirname, "./"),
};

module.exports = withNativeWind(config, { input: "./global.css" });
