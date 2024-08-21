import { profileSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getProfiles } from "@/lib/api/profiles/queries";


// Schema for profiles - used to validate API requests
const baseSchema = profileSchema

export const insertProfileSchema = baseSchema.omit({ id: true });
export const insertProfileParams = baseSchema.extend({
  salario: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateProfileSchema = baseSchema;
export const updateProfileParams = updateProfileSchema.extend({
  salario: z.coerce.number()
}).omit({ 
  userId: true
});
export const profileIdSchema = baseSchema.pick({ id: true });

// Types for profiles - used to type API request params and within Components
export type Profile = z.infer<typeof profileSchema>;
export type NewProfile = z.infer<typeof insertProfileSchema>;
export type NewProfileParams = z.infer<typeof insertProfileParams>;
export type UpdateProfileParams = z.infer<typeof updateProfileParams>;
export type ProfileId = z.infer<typeof profileIdSchema>["id"];
    
// this type infers the return from getProfiles() - meaning it will include any joins
export type CompleteProfile = Awaited<ReturnType<typeof getProfiles>>["profiles"][number];

