import type { Metadata, Viewport } from "next";
import { MaxWidthWrapper, cn, ThemeProvider, InternetStatus } from "@/lib";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Footer, Header } from "@/components/reususables";

const appName = "Relay3.0";
const appColor = "#ffffff";

export const metadata: Metadata = {
	title: `${appName} `,
	description: "Relay",
	// manifest: "/manifest",
};

export const viewport: Viewport = {
	themeColor: appColor,
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body className={cn("m-auto min-h-screen bg-background bg-center bg-no-repeat scroll-smooth antialiased")}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange>
					<NextTopLoader
						color="#000000"
						showSpinner={false}
						easing="ease"
					/>
					<Header />
					<MaxWidthWrapper>{children}</MaxWidthWrapper>
					<Footer />

					<Toaster
						position="top-right"
						expand={false}
					/>
					<InternetStatus />
					<GoogleAnalytics gaId="" />
					<GoogleTagManager gtmId="" />
				</ThemeProvider>
			</body>
		</html>
	);
}
