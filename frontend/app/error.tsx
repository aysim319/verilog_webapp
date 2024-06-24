'use client';

import { useEffect } from 'react';
import {useRouter} from "next/navigation";
import styles from '../styles/Home.module.css'

export default function Error({error}: {
  error: Error & { digest?: string };
}) {
    const router = useRouter();

    useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
    }, [error]);

    return (
        <main className={`${styles.main} max-h-screen`}>
            <h2 className="text-center">Something went wrong!</h2>
            <button className="w-1/4 mt-4 justify-self-center rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                type={"submit"}
                onSubmit={() => router.push("/login")}>
                Try again
            </button>
    </main>
    );
}