import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
	const [signOut, loading, error] = useSignOut(auth);
	const handleLogout = () => {
		signOut();
	};

	return (
		<button className="bg-dark-fill-3 py-2 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2" onClick={handleLogout}>
			<FiLogOut />
		</button>
	);
};
export default Logout;
