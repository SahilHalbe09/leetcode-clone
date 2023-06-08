import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);

	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
	const [inputs, setInputs] = useState({ email: "", password: "" });
	const router = useRouter();

	const handlenputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleReset = () => {
		setAuthModalState((prev) => ({
			...prev,
			type: "forgetPassword",
		}));
	};

	const handleSignUp = () => {
		setAuthModalState((prev) => ({
			...prev,
			type: "register",
		}));
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const user = await signInWithEmailAndPassword(inputs.email, inputs.password);
			if (!user) return;

			router.push("/");
		} catch (error: any) {
			toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
		}
	};

	useEffect(() => {
		if (error) toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
	}, [error]);

	return (
		<form className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
			<h3 className="text-xl font-medium text-black">Sign In to LeetCode</h3>

			{/* Email */}
			<div>
				<input
					onChange={handlenputChange}
					type="email"
					name="email"
					id="email"
					placeholder="E-mail"
					required
					className="border outline-none rounded focus:ring-black focus:border-black w-full p-2 bg-white border-gray-400 placeholder-gray-500 placeholder:font-thin hover:border-gray-700 text-black"
				/>
			</div>

			{/* Password */}
			<div>
				<input
					onChange={handlenputChange}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					required
					className="border outline-none rounded focus:ring-black focus:border-black w-full p-2 bg-white border-gray-400 placeholder-gray-500 placeholder:font-thin hover:border-gray-700 text-black"
				/>
			</div>

			{/* Button */}
			<button type="submit" className="w-full py-2 rounded text-white bg-gradient-to-r from-slate-800 to-slate-600 hover:bg-gradient-to-l hover:from-slate-800 hover:to-slate-600">
				{loading ? "Signing in..." : "Sign In"}
			</button>

			<div className="flex w-full justify-between">
				<Link href="#" className="text-sm text-slate-800 hover:underline text-left" onClick={handleReset}>
					Forgot Password?
				</Link>
				<Link href="#" className="text-sm text-slate-800 hover:underline text-right" onClick={handleSignUp}>
					Sign Up
				</Link>
			</div>
		</form>
	);
};
export default Login;
