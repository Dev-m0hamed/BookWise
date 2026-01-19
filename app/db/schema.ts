import {
  uuid,
  text,
  pgTable,
  varchar,
  integer,
  doublePrecision,
  date,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid().notNull().defaultRandom().primaryKey().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text().notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text().notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const books = pgTable("books", {
  id: uuid().notNull().primaryKey().defaultRandom().unique(),
  title: varchar().notNull(),
  author: varchar().notNull(),
  genre: text().notNull(),
  rating: doublePrecision().notNull(),
  coverUrl: text("cover_url").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  description: text().notNull(),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(0),
  videoUrl: text("video_url").notNull(),
  summary: varchar().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
