import { useState } from "react";
import ProblemsTable from "../components/ProblemsTable/ProblemsTable";
import Topbar from "../components/Topbar/Topbar";
import useHasMounted from "../hooks/useHasMounted";
// import { doc, setDoc } from "firebase/firestore";
// import { firestore } from "../firebase/firebase";

export default function Home() {
	const [loadingProblems, setLoadingProblems] = useState(true);

	const hasMounted = useHasMounted();
	if (!hasMounted) return null;

	// const [inputs, setInputs] = useState({
	// 	id: "",
	// 	title: "",
	// 	difficulty: "",
	// 	category: "",
	// 	videoId: "",
	// 	link: "",
	// 	order: "",
	// 	likes: "",
	// 	dislikes: "",
	// });

	// const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setInputs({
	// 		...inputs,
	// 		[e.target.name]: e.target.value,
	// 	});
	// };

	// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();

	// 	const newProblem = {
	// 		...inputs,
	// 		order: Number(inputs.order),
	// 	};

	// 	await setDoc(doc(firestore, "problems", inputs.id), inputs);
	// 	alert("Saved to db");
	// };

	return (
		<>
			<main className="bg-dark-layer-2 min-h-fit h-full">
				<Topbar />

				<h1 className="text-2xl text-center text-gray-400 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
					&ldquo; One leetcode problem daily is enough to
					<br />
					build habit of problem solving &rdquo;
				</h1>

				<div className="relative overflow-x-auto mx-auto px-6 pb-10">
					{loadingProblems && (
						<div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
							{[...Array(10)].map((_, idx) => (
								<LoadingSkeleton key={idx} />
							))}
						</div>
					)}

					<table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
						{!loadingProblems && (
							<thead className="text-xs text-gray-300 uppercase dark:text-gray-400 border-t border-b border-gray-500">
								<tr>
									<th scope="col" className=" px-1 py-3 w-0 font-medium">
										Status
									</th>
									<th scope="col" className="px-6 py-3 w-0 font-medium">
										Title
									</th>
									<th scope="col" className="px-6 py-3 w-0 font-medium">
										Difficulty
									</th>

									<th scope="col" className="px-6 py-3 w-0 font-medium">
										Category
									</th>
									<th scope="col" className="px-6 py-3 w-0 font-medium">
										Video Tutorial
									</th>
								</tr>
							</thead>
						)}

						<ProblemsTable setLoadingProblems={setLoadingProblems} />
					</table>
				</div>

				{/* Temp */}
				{/* <form action="" className="p-6 flex flex-col max-w-sm gap-3" onSubmit={handleSubmit}>
					<input onChange={handleInput} type="text" name="id" placeholder="id" />
					<input onChange={handleInput} type="text" name="title" placeholder="title" />
					<input onChange={handleInput} type="text" name="difficulty" placeholder="difficulty" />
					<input onChange={handleInput} type="text" name="category" placeholder="category" />
					<input onChange={handleInput} type="number" name="order" placeholder="order" />
					<input onChange={handleInput} type="text" name="videoId" placeholder="videoId" />
					<input onChange={handleInput} type="text" name="link" placeholder="link" />
					<button className="bg-white">Save</button>
				</form> */}
			</main>
		</>
	);
}

const LoadingSkeleton = () => {
	return (
		<div className="flex items-center space-x-12 mt-4 px-6">
			<div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
			<div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
			<div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
			<div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};
