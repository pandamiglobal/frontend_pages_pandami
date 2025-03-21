import "@/../styles/lp.css";
import { ThemeProvider } from "../providers";

export default function LPLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}