import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const profileSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  cedula: z.string(),
  salario: z.number().nullish(),
  telefono: z.string().nullish(),
  direccion: z.string(),
  userId: z.string(),
})

export interface CompleteProfile extends z.infer<typeof profileSchema> {
  user: CompleteUser
}

/**
 * relatedProfileSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProfileSchema: z.ZodSchema<CompleteProfile> = z.lazy(() => profileSchema.extend({
  user: relatedUserSchema,
}))
