"use client";

import {
	IPublicProfileFullResponse,
	UsePublicProfileViewModelReturn,
} from "@/common/types/IPublicProfile";
import { CustomLinks } from "../custom-links/custom-links";
import { SectionCard } from "../section-card/section-card";

interface LinksSectionWrapperProps {
	profile: IPublicProfileFullResponse;
	viewModel: UsePublicProfileViewModelReturn;
}

/**
 * Wrapper for links section in public view
 * Displays custom links list
 */
export function LinksSectionWrapper({
	profile,
	viewModel,
}: LinksSectionWrapperProps) {
	// Only render if links are enabled and exist
	if (!profile.show_links || !viewModel.hasCustomLinks) {
		return null;
	}

	return (
		<SectionCard title="Meus Links">
			<CustomLinks links={profile.custom_links} />
		</SectionCard>
	);
}
