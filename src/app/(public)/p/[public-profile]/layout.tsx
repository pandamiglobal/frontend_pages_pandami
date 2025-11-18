import Link from "next/link";
import Image from "next/image";
import { PrimaryButton } from "@/app/_components/molecules/primary-button";
import { Phone } from "lucide-react";

/**
 * Public profile page layout
 * Plugs in simplified header + footer with WhatsApp CTA + fixed bar container
 */
export default function PublicProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-background">
			{/* Simplified header with logo */}
			<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-center">
						<Link href="/" className="flex items-center">
							<Image
								src="/logo.svg"
								alt="Pandami Logo"
								width={160}
								height={24}
								className="h-6 lg:h-8 w-auto"
							/>
						</Link>
					</div>
				</div>
			</header>

			{/* Main content area with proper spacing */}
			<main className="flex-1">
				<div className="container mx-auto px-4 py-6 max-w-4xl">{children}</div>
			</main>

			<footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
				<div className="container mx-auto py-6">
					<div className="flex items-center justify-center gap-2">
            <PrimaryButton variant="white" className="h-12 w-fit px-8 flex bg-gray-700 hover:bg-gray-900 rounded-md text-white items-center justify-center gap-2">
              <Phone className="size-5" />
              Ligar 
            </PrimaryButton>
						<PrimaryButton variant="white" className="h-12 w-fit px-8 bg-green-500 hover:bg-green-600 rounded-md flex items-center justify-center text-white text-sm gap-2">
              <Image src="/svg/whatsapp-icon.svg" alt="WhatsApp" width={24} height={24}  className="size-5" />
              Agendar no WhatsApp
       </PrimaryButton>
					</div>
				</div>
			</footer>
		</div>
	);
}
