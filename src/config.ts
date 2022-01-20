/**
 *
 * Create and export configurations
 *
 */

//Environnemtent interfaces for different environments
interface Env {
  httpPort: number;
  httpsPort: number;
  envName: string;
}
interface EnvConfig {
  [key: string]: Env;
}

const environnements: EnvConfig = {};

//Staging {default} environnements
environnements.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging",
};

environnements.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "production",
};

//Determine which environnement was passed as a command-line argument
export const currentEnv =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

//Check if that the current environment is one of the environments above, if not, default to staging
const environmentTypeToExport =
  typeof environnements[currentEnv] == "object"
    ? environnements[currentEnv]
    : environnements.staging;

//Export the module
export default environmentTypeToExport;
