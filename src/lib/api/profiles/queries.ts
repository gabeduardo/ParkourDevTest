import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type ProfileId, profileIdSchema } from "@/lib/db/schema/profiles";

export const getProfiles = async () => {
  const { session } = await getUserAuth();
  const p = await db.profile.findMany({ where: {userId: session?.user.id!}});
  return { profiles: p };
};

export const getProfileById = async (id: ProfileId) => {
  const { session } = await getUserAuth();
  const { id: profileId } = profileIdSchema.parse({ id });
  const p = await db.profile.findFirst({
    where: { id: profileId, userId: session?.user.id!}});
  return { profile: p };
};


