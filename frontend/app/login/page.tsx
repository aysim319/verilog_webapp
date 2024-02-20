import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import LoginForm from "@/components/loginForm";
import { use } from 'react';


export default function LoginPage() {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>

            <main className={`${styles.main} flex flex-col content-center gap-2`}>
                <div className={'flex justify-center'}>
                    <LoginForm/>
                </div>
            </main>
        </div>
    )
}