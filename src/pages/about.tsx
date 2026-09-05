import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Heading } from "@/components";

const About: NextPage = () => (
	<>
		<Head>
			<title>About</title>
		</Head>

		<div className="flex flex-1 flex-col justify-center items-center">
			<div className="mb-4 text-center">
				<Heading text="About? How about NO?" />
			</div>

			<div className="w-60 h-60 md:w-72 md:h-72 relative animate-spin">
				<Image fill src="/ok.png" alt="site owner's face" />
			</div>
		</div>
	</>
);

export default About;
