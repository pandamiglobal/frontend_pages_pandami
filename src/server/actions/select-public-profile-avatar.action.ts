'use server'

import { SelectPublicProfileAvatarService } from "@/server/services/public-profile/select-public-profile-avatar";
import { IAvatarResponse, IAxiosResponseError } from "@/common/types/IPublicProfile";

export async function SelectPublicProfileAvatarAction(profileImageName: string): Promise<IAvatarResponse | IAxiosResponseError> {
  return await SelectPublicProfileAvatarService(profileImageName);
}
