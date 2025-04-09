"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import dynamic from "next/dynamic";
import ExerciseData from "@/components/exerciseData";
import TrainersData from "@/components/trainersData";

// jeśli chcesz z powrotem Map dynamicznie, zostaw odkomentowane:
const Map = dynamic(() => import("@/components/map"), {
	ssr: false,
});

export default function Home() {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const [userSession, setUserSession] = useState<string | null>(null);

	useEffect(() => {
		// Bezpieczny dostęp do sessionStorage tylko po stronie klienta
		if (typeof window !== "undefined") {
			const session = sessionStorage.getItem("user");
			setUserSession(session);
		}
	}, []);

	useEffect(() => {
		// Przekierowanie, jeśli nie ma usera ani sesji
		if (!user && !userSession) {
			router.push("/sign-up");
		}
	}, [user, userSession, router]);

	console.log(user);

	return (
		<main className="flex min-h-screen flex-col items-center">
			<h1 className="text-2xl font-bold text-indigo-200">Welcome</h1>
			<ExerciseData />
			<TrainersData />
			{/* <Map /> */}
		</main>
	);
}
