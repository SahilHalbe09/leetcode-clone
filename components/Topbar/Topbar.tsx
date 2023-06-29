import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter } from "next/router";
import { problems } from "../../utils/problems";
import { Problem } from "../../utils/types/problem";

type TopbarProps = {
	problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const router = useRouter();

	const handleProblemChange = (isForward: boolean) => {
		const { order } = problems[router.query.pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);

		if (isForward && !nextProblemKey) {
			// If going from 5 => 1:
			const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1);

			router.push(`/problems/${firstProblemKey}`);
		} else if (!isForward && !nextProblemKey) {
			// If going from 1 => 5:
			const lastProblemKey = Object.keys(problems).find((key) => problems[key].order === Object.keys(problems).length);

			router.push(`/problems/${lastProblemKey}`);
		} else {
			// Normal movement from 1 to 5:

			router.push(`/problems/${nextProblemKey}`);
		}
	};

	return (
		<>
			<nav className="relative flex h-[55px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
				<div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
					<Link href="/" className="flex-1">
						<Image src="/logo-full.png" width={110} height={110} alt="Logo" className="h-f" />
					</Link>

					{problemPage && (
						<div className="flex items-center gap-4 flex-1 justify-center">
							<div className="flex items-center justify-center p-2 cursor-pointer rounded bg-dark-fill-3 hover:bg-dark-fill-2" onClick={() => handleProblemChange(false)}>
								<FaChevronLeft size={20} />
							</div>
							<Link href="/" className="flex items-center mx-2 gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer hover:text-white">
								<div>
									<BsList size={20} />
								</div>
								<p>Problem List</p>
							</Link>
							<div className="flex items-center justify-center p-2 cursor-pointer rounded bg-dark-fill-3 hover:bg-dark-fill-2" onClick={() => handleProblemChange(true)}>
								<FaChevronRight size={20} />
							</div>
						</div>
					)}

					<div className="flex items-center space-x-4 flex-1 justify-end">
						<div>
							<a href="https://www.thesahildev.in/" target="_blank" rel="noreferrer" className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2">
								My Site
							</a>
						</div>

						{user && problemPage && <Timer />}

						{!user ? (
							<Link
								href="/auth"
								onClick={() =>
									setAuthModalState((prev) => ({
										...prev,
										isOpen: true,
										type: "login",
									}))
								}
							>
								<button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">Sign In</button>
							</Link>
						) : (
							<div className="cursor-pointer group relative">
								<Image src="/avatar.png" alt="user-profile-image" height={35} width={35} className="rounded-full" />

								<div className="absolute top-16 py-4 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-sm z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out cursor-default border border-brand-orange border-opacity-40">
									<p className="text-sm">{user.email}</p>
								</div>
							</div>
						)}

						{user && <Logout />}
					</div>
				</div>
			</nav>
		</>
	);
};
export default Topbar;
