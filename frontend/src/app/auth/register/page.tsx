// src/app/auth/register/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SocialButtons } from "@/components/common";
import { RegisterForm } from "@/components/forms";

export const metadata: Metadata = {
	title: "Register | DJ Nextjs Full Auth",
	description: "Hossain Foysal Projects",
};

export default function Register() {
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					alt="DJ Nextjs Full Auth"
					src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
					className="mx-auto h-10 w-auto"
				/>
				<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Sign up to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<RegisterForm />
				<SocialButtons />
				<p className="mt-10 text-center text-sm/6 text-gray-500">
					Already have an account?{" "}
					<Link
						href="/auth/login"
						className="font-semibold text-indigo-600 hover:text-indigo-500"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
