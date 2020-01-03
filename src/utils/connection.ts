import { getConnectionOptions, createConnection } from "typeorm";
import { NODE_ENV } from "./config";
export const createConn = async () => {
  try {
    console.log(NODE_ENV)
    const connectionOptions = await getConnectionOptions(NODE_ENV);
    return createConnection(connectionOptions);
  } catch (error) {
    console.log(error);
  }
};