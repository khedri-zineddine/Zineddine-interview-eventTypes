import * as dotenv from 'dotenv';

/**
 * Getting the environment variables.
 */
dotenv.config();

/**
 * The port used by the server to run the application.
 */
export const serverPort = process.env.SERVER_PORT;
