import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import image from "./leetcode.png";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({
			...prev,
			isOpen: true,
		}));
	};

	return (
		<div className="flex items-center justify-between px-2 sm:px-12 md:px-24">
			<Link href="/" className="flex items-center justify-center h-20">
				<Image
					src="/Leetcode.png"
					alt="logo"
					// width={144} height={44}
					width="0"
					height="0"
					sizes="100vw"
					style={{ width: "144px", height: "auto" }}
				/>
			</Link>

			<div className="flex items-center">
				<button className="text-brand-orange font-thin rounded-full text-lg px-5 py-1.5 hover:text-black hover:bg-white transition ease-in-out delay-100" onClick={handleClick}>
					Sign In
				</button>
			</div>
		</div>
	);
};
export default Navbar;
