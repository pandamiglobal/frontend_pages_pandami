import { IPublicProfileFullResponse } from "@/common/types/IPublicProfile";
import { Metadata } from "next";

interface GenerateProfileMetadataParams {
  profile: IPublicProfileFullResponse;
  profession?: string; 
}

/**
 * SEO Helper Utility
 * Follows SOLID principles (Single Responsibility)
 * Generates Next.js Metadata object for Public Profiles
 */
export class PublicProfileSeoHelper {
  /**
   * Generates metadata for a public profile page
   * Title format: [First 2 Names] [Profession] [City] [State]
   */
  static generateMetadata({
    profile,
    profession = "Cabeleireiro",
  }: GenerateProfileMetadataParams): Metadata {
    if (!profile) {
      return {
        title: "Perfil não encontrado | Pandami",
        description: "O perfil que você está procurando não foi encontrado.",
      };
    }

    const title = this.generateTitle(profile, profession);
    const description = this.generateDescription(profile);
    const imageUrl = this.generateImageUrl(profile);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "profile",
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  }

  private static generateTitle(
    profile: IPublicProfileFullResponse,
    profession: string
  ): string {
    const names = profile.name.trim().split(/\s+/);
    const firstTwoNames = names.slice(0, 2).join(" ");
    const location =
      profile.city && profile.state ? `${profile.city} ${profile.state}` : "";

    const parts = [firstTwoNames, profession];
    if (location) parts.push(location);

    return parts.join(" ");
  }

  private static generateDescription(profile: IPublicProfileFullResponse): string {
    if (profile.bio) return profile.bio;
    
    const names = profile.name.trim().split(/\s+/);
    const firstName = names[0];
    const location = profile.city && profile.state ? `em ${profile.city}, ${profile.state}` : "";
    
    return `Conheça ${firstName}, profissional da beleza de ${location}. Confira serviços, horários e entre em contato.`;
  }

  private static generateImageUrl(
    profile: IPublicProfileFullResponse
  ): string | null {
    if (!profile.public_profile_image?.file_name) return null;
    
    return `${process.env.NEXT_PUBLIC_SAAS_API_URL}/storage/${profile.public_profile_image.file_name}`;
  }
}
