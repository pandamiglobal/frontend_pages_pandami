  import api from '../api'
import { IAvatarResponse, IAxiosResponseError } from '@/common/types/IPublicProfile'

export async function SelectPublicProfileAvatarService(profileImageName: string): Promise<IAvatarResponse | IAxiosResponseError> {
  const response = await api.get<IAvatarResponse>(`/public-profile/avatar/${profileImageName}`)
    .then((response) => {
      return response.data as IAvatarResponse
    })
    .catch((error) => {
      return {
        error: error.response?.data?.error || 'PUBLIC_PROFILE_AVATAR_FETCH_FAILED',
        message: error.response?.data?.message || 'Não foi possível carregar o avatar do seu mini-site.'
      }
    });

  return response;
}
