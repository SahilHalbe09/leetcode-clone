import React, { useEffect, useState } from "react";
import { problems } from "../../mockproblems/problems";
import { BiCheckCircle, BiLinkExternal } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import Link from "next/link";
import YouTube from "react-youtube";
import { IoClose } from "react-icons/io5";
import { search2DMatrix } from "../../utils/problems/search-a-2d-matrix";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import { DBProblem } from "../../utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";

type ProblemsTableProps = {
	setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({ setLoadingProblems }) => {
	const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});

	const handleClose = () => {
		setYoutubePlayer({ isOpen: false, videoId: "" });
	};

	const problems = useGetProblems(setLoadingProblems);
	const solvedProblems = useGetSolvedProblems();

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			handleClose();
		};

		window.addEventListener("keydown", handleEsc);

		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	return (
		<>
			<tbody className="text-white">
				{problems.map((problem, idx) => {
					const difficultyColor = problem.difficulty === "Easy" ? "text-dark-green-s" : problem.difficulty === "Medium" ? "text-dark-yellow" : "text-dark-pink";

					return (
						<tr className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`} key={problem.id}>
							<th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">{solvedProblems?.includes(problem.id) ? <BiCheckCircle size={20} /> : ""}</th>
							<td className="px-6 py-4">
								{problem.link ? (
									<Link href={problem.link} className="cursor-pointer hover:text-blue-600" target="_blank">
										{problem.title}
									</Link>
								) : (
									<Link href={`/problems/${problem.id}`} className="cursor-pointer hover:text-blue-600">
										{problem.title}
									</Link>
								)}
							</td>
							<td className={`px-6 py-4 ${difficultyColor}`}>{problem.difficulty}</td>
							<td className={"px-6 py-4"}>{problem.category}</td>
							<td className={"px-6 py-4"}>
								{problem.videoId ? (
									<AiFillYoutube
										size={25}
										className="text-white cursor-pointer hover:text-red-600"
										onClick={() => setYoutubePlayer({ isOpen: true, videoId: problem.videoId as string })}
									/>
								) : (
									<>
										<Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-500">
											Search on YouTube
										</Link>
									</>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>

			{youtubePlayer.isOpen && (
				<tfoot className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
					<div className="absolute top-0 left-0 z-10 w-screen h-screen bg-black opacity-70" onClick={handleClose}></div>
					<div className="relative z-50 w-full h-full max-w-4xl px-6">
						<div className="relative flex items-center justify-center w-full h-full">
							<div className="relative w-full">
								<IoClose fontSize={"35"} className="absolute right-0 cursor-pointer -top-16 hover:text-white" onClick={handleClose} />
								<YouTube videoId={youtubePlayer.videoId} loading="lazy" iframeClassName="w-full min-h-[500px]" />
							</div>
						</div>
					</div>
				</tfoot>
			)}
		</>
	);
};

export default ProblemsTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
	const [problems, setProblems] = useState<DBProblem[]>([]);

	useEffect(() => {
		const getProblems = async () => {
			// fetching data logic
			setLoadingProblems(true);
			const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
			const querySnapshot = await getDocs(q);
			const tmp: DBProblem[] = [];
			querySnapshot.forEach((doc) => {
				tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
			});
			setProblems(tmp);
			setLoadingProblems(false);
		};

		getProblems();
	}, [setLoadingProblems]);

	return problems;
}

function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>();
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getSolvedProblems = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				setSolvedProblems(userDoc.data()!.solvedProblems);
			}
		};

		if (user) getSolvedProblems();

		if (!user) setSolvedProblems([]);
	}, [user]);

	return solvedProblems;
}
