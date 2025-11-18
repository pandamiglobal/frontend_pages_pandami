export interface MySiteProfileHeaderProps {
    name: string
    isVerified: boolean
    bio: string
    rating: number
    reviewsCount: number
    openHours: string
    openHoursDetails?: string
    businessStatus: 'open' | 'closed' | 'no-hours'
    location: string
    locationUrl: string
    profileImageName: string
    onEditProfile: () => void
    isEditable?: boolean
    onChangeProfileImage?: (file: File) => void
    onOpenProfileImageModal?: () => void
}
