import type { Metadata } from "next";
import "@/app/styles/globals.css";
import Provider from "@/redux/provider";
import { Navbar, Footer } from "@/components/common";
import { Setup } from "@/components/utils";

export const metadata: Metadata = {
	title: "Full Auth with django and nextjs",
	description: "Hossain Foysal Projects",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<Setup />
					<Navbar />
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8">
						{children}
					</div>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
