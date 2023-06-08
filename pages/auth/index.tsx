import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar/Navbar";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import AuthModal from "../../components/Modals/AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/router";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
	const authModal = useRecoilValue(authModalState);
	const [user, loading, error] = useAuthState(auth);
	const [pageLoading, setPageLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (user) router.push("/");
		if (!loading && !user) setPageLoading(false);
	}, [user, router, loading]);

	if (pageLoading) return null;

	return (
		<div className="bg-[#2C2C2C] h-screen relative">
			<div className="mx-auto max-w-7xl">
				<Navbar />

				<div className="flex items-center justify-center w-auto h-[80vh] pointer-events-none select-none">
					<Image
						src="/Hero.png"
						alt="logo"
						// width={650} height={500}
						width="0"
						height="0"
						sizes="100vw"
						style={{ width: "650px", height: "auto" }}
						priority
					/>
				</div>

				{authModal.isOpen && <AuthModal />}
			</div>
		</div>
	);
};
export default AuthPage;
