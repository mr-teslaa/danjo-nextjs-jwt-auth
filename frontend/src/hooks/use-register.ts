// frontend\src\hooks\use-register.ts

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/redux/features/authApiSlice";

export default function useRegister() {
 const router = useRouter();
	const [register, { isLoading }] = useRegisterMutation();

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		re_password: "",
	});

	const { first_name, last_name, email, password, re_password } = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prevState) => ({
			...formData,
			[name]: value,
		}));
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		register({ first_name, last_name, email, password, re_password })
			.unwrap()
			.then(() => {
				toast.success("Please check email to verify account");
				router.push("/auth/login");
			})
			.catch((error) => {
				// Extract and display specific validation errors
				if (error.data) {
					const errorMessages = Object.values(error.data).flat() as string[]; // Flatten error arrays
					errorMessages.forEach((message: string) => toast.error(message));
				} else {
					toast.error("Failed to register account");
				}
			});
    };   
    

    return {
        first_name,
        last_name,
        email,
        password,
        re_password,
        isLoading,
        onChange,
        onSubmit
    }
}