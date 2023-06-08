import React, { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { java } from "@codemirror/lang-java";
import EditorFooter from "./EditorFooter/EditorFooter";
import { Problem } from "../../../utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "../../../utils/problems";
import { useRouter } from "next/router";
import { javascript } from "@codemirror/lang-javascript";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "../../../hooks/useLocalStorage";

type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState<string>(problem.starterCode);

	const [fontSize, setFontSize] = useLocalStorage("lc-fontSize", "14px");

	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const [user] = useAuthState(auth);

	const {
		query: { pid },
	} = useRouter();

	const handleSubmit = async () => {
		if (!user) {
			toast.error("Please login to submit your code", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});

			return;
		}
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));

			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);

				if (success) {
					toast.success("Congrats! All tests passed!", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});

					setSolved(true);
				}
			}
		} catch (error: any) {
			if (error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
				toast.error("Oops! One or more test cases failed", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);

		if (user) {
			setUserCode(code ? JSON.parse(code) : problem.starterCode);
		} else {
			setUserCode(problem.starterCode);
		}
	}, [pid, user, problem.starterCode]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	return (
		<div className="relative flex flex-col bg-dark-layer-2">
			<PreferenceNav settings={settings} setSettings={setSettings} />

			<Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[45, 55]} minSize={60}>
				<div className="w-full overflow-auto">
					<CodeMirror value={userCode} theme={vscodeDark} extensions={[javascript()]} style={{ fontSize: settings.fontSize }} onChange={onChange} />
				</div>
				<div className="w-full px-5 overflow-auto">
					{/* Testcase heading */}
					<div className="flex items-center h-10 space-x-6">
						<div className="relative flex flex-col justify-center h-full cursor-pointer">
							<div className="text-sm font-medium leading-5 text-white">TestCases</div>
							<hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
						</div>
					</div>

					{/* Testcases boxes */}
					<div className="flex">
						{problem.examples.map((example, index) => (
							<div className="items-start mt-2 mr-2 " key={example.id} onClick={() => setActiveTestCaseId(index)}>
								<div className="flex flex-wrap items-center gap-y-4">
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
									>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="my-4 font-semibold">
						<p className="mt-4 text-sm font-medium text-white">Input</p>
						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">{problem.examples[activeTestCaseId].inputText}</div>
						<p className="mt-4 text-sm font-medium text-white">Output</p>
						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">{problem.examples[activeTestCaseId].outputText}</div>
					</div>
				</div>
			</Split>

			<EditorFooter handleSubmit={handleSubmit} />
		</div>
	);
};
export default Playground;
