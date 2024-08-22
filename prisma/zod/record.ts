import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const recordSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  cedula: z.string(),
  telefono: z.string(),
  direccion: z.string().nullish(),
  salario: z.number().nullish(),
  userId: z.string(),
})

export interface CompleteRecord extends z.infer<typeof recordSchema> {
  user: CompleteUser
}

/**
 * relatedRecordSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedRecordSchema: z.ZodSchema<CompleteRecord> = z.lazy(() => recordSchema.extend({
  user: relatedUserSchema,
}))
