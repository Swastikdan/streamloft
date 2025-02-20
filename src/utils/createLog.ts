/**
 * The function `createLog` creates a log entry in a database with the provided information.
 * @param log - The `createLog` function takes in an object `log` with the following properties:
 * - `createdByUserType`: A string representing the type of user who created the log.
 * - `userId`: An optional string representing the ID of the user associated with the log.
 * - `source`: A string representing the source of the log.
 * - `message`: A string representing the message of the log.
 * - `lavel`: An optional string representing the level of the log. If not provided, it defaults to
 * "info".
 */
import { db } from "@/server/db";
import { waitUntil } from "@vercel/functions";
import { type Log } from "@prisma/client";

export const createLog = async (log: {
  createdByUserType: string;
  userId?: string;
  source: string;
  message: string;
  lavel?: Log["lavel"];
}) => {
  waitUntil(db.log.create({ data: log }));
};
