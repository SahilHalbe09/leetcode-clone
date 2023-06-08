import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import { Router, useRouter } from "next/router";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);

	const handleSignIn = () => {
		setAuthModalState((prev) => ({
			...prev,
			type: "login",
		}));
	};

	const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
	const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
	const router = useRouter();

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			toast.loading("Creating your account...", { position: "top-center", toastId: "loadingToast" });

			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) return;

			const userData = {
				uid: newUser.user.uid,
				email: newUser.user.email,
				displayName: inputs.displayName,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				likedProblems: [],
				dislikedProblems: [],
				solvedProblems: [],
				starredProblems: [],
			};

			await setDoc(doc(firestore, "users", newUser.user.uid), userData);

			router.push("/");
		} catch (error: any) {
			toast.error(error.message, { position: "top-center" });
		} finally {
			toast.dismiss("loadingToast");
		}
	};

	useEffect(() => {
		if (error) toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
	}, [error]);

	return (
		<form className="space-y-6 px-6 py-4" onSubmit={handleRegister}>
			<h3 className="text-xl font-medium text-black">Sign Up to LeetCode</h3>

			{/* Username */}
			<div>
				<input
					onChange={handleChangeInput}
					type="name"
					name="name"
					id="name"
					placeholder="Username"
					required
					className="border outline-none rounded focus:ring-black focus:border-black w-full p-2 bg-white border-gray-400 placeholder-gray-500 placeholder:font-thin hover:border-gray-700 text-black"
				/>
			</div>

			{/* Email */}
			<div>
				<input
					onChange={handleChangeInput}
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
					onChange={handleChangeInput}
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
				{loading ? "Signing Up..." : "Sign Up"}
			</button>

			<div className="flex w-full justify-center">
				<div className="text-md">
					<p className="inline-block text-gray-400">Have an account?</p>{" "}
					<a href="#" className="hover:underline inline-block text-slate-800" onClick={handleSignIn}>
						Sign In
					</a>
				</div>
			</div>
		</form>
	);
};

export default SignUp;
