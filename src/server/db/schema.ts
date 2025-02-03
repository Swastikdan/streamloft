import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  boolean,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `streamloft_${name}`);

export const UserRole = pgEnum("user_role", ["ADMIN", "USER"]);

export const users = createTable(
  "users",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    first_name: varchar("first_name").notNull(),
    last_name: varchar("last_name").notNull(),
    email: varchar("email").notNull(),
    external_id: varchar("external_id").notNull(),
    role: UserRole("role").notNull().default("USER"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    usersEmailIdx: index("users_email_idx").on(table.email),
    usersRoleIdx: index("users_role_idx").on(table.role),
    externalIdIdx: index("users_external_id_idx").on(table.external_id),
  }),
);
