import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import WorkSpace from "../../components/WorkSpace/WorkSpace";
import { problems } from "../../utils/problems";
import { Problem } from "../../utils/types/problem";
import useHasMounted from "../../hooks/useHasMounted";

type ProblemPageProps = {
	problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
	const hasMounted = useHasMounted();
	if (!hasMounted) return null;

	return (
		<>
			<Topbar problemPage />
			<WorkSpace problem={problem} />
		</>
	);
};
export default ProblemPage;

// Fetch the local data
// Static Site Generation:
//  getStaticPaths => creates the dynamic routes

export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));

	return {
		paths: paths,
		fallback: false,
	};
}

// getStaticProps => fetches the data
export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const problem = problems[pid];

	if (!problem) {
		return {
			notFound: true,
		};
	}

	problem.handlerFunction = problem.handlerFunction.toString();

	return {
		props: {
			problem,
		},
	};
}
