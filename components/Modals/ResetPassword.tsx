import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { log } from "console";
import { toast } from "react-toastify";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
	const [email, setEmail] = useState("");
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const success = await sendPasswordResetEmail(email);
		if (success) {
			toast.success("Email Sent Successfully!", { position: "top-center", autoClose: 3000, theme: "dark" });
		}
	};

	useEffect(() => {
		if (error) toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
	}, [error]);

	return (
		<form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" onSubmit={handleReset}>
			<h3 className="text-xl font-medium text-black">Reset Password</h3>
			<p className="text-sm text-gray-500 p-4 border border-brand-orange rounded shadow bg-[#FFFFE0]">
				Forgotten your password? Enter your e-mail address below, and we will send you an e-mail allowing you to reset it.
			</p>
			<div>
				<input
					type="email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					id="email"
					className="w-full p-2 text-black placeholder-gray-500 bg-white border border-gray-400 rounded outline-none focus:ring-black focus:border-black placeholder:font-thin hover:border-gray-700"
					placeholder="E-mail address"
				/>
			</div>

			<button type="submit" className={"w-32 py-2 text-sm rounded text-white bg-[#449D44] hover:bg-[#3fae3f] border-[#134113]"}>
				Reset Password
			</button>
		</form>
	);
};
export default ResetPassword;
