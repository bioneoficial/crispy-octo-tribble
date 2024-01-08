import mysql, { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';
import logMiddleware from "../middlewares/LogMiddleware"
import { DatabaseError } from '../commons/utils';
dotenv.config();

export interface QueryResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export const executeQuery = async (queryString: string, records: unknown[] = []): Promise<RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader | Error> => {
  let rows = null;

  try {
    if (records.length > 0) {
      [rows] = await pool.query(queryString, records).catch((err) => {
        throw err;
      });
    } else {
      [rows] = await pool.query(queryString).catch((err) => {
        throw err;
      });
    }
    return rows;

  } catch (error) {
    logMiddleware.notify('Database', { context: { error: JSON.stringify(error)} })
    throw new DatabaseError(JSON.stringify(error));
  }  
};

export default pool;
