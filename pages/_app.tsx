import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<RecoilRoot>
				<Head>
					<title>LeetCode</title>
					<meta name="description" content="LeetCode - Ultimate place to get into FAANG." />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/leetcode.ico" />
				</Head>

				<ToastContainer />

				<Component {...pageProps} />
			</RecoilRoot>
		</>
	);
}
