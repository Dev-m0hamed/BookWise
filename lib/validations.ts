import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(100, {
      message: "Title must be less than 100 characters",
    }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be more than 10 characters" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  author: z
    .string()
    .trim()
    .min(2, { message: "Author must be at least 2 characters" })
    .max(100, { message: "Author must be less than 100 characters" }),
  genre: z
    .string()
    .trim()
    .min(2, { message: "Genre must be at least 2 characters" })
    .max(50, { message: "Genre must be less than 50 characters" }),
  rating: z.coerce
    .number()
    .min(1, { message: "Rating can't be less than 1" })
    .max(5, { message: "Rating can't be more than 5" }),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty("Book Image is required"),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i, { message: "Please pick a valid color" }),
  videoUrl: z.string().nonempty("Book Trailer is required"),
  summary: z
    .string()
    .trim()
    .min(10, { message: "Must be more than 10 characters" }),
});
