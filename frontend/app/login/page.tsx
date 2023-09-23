import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import ConsentForm from "@/components/consentForm";
import { use } from 'react';

async function  getConsentFormText()  {
    // for server component the rewrite async function doesn't run first
    const  res = await fetch(`${process.env.BACKEND_URL}/api/consentform`, {
           cache: 'no-store'}
    )

    if (!res.ok) {
        throw new Error("fetch failed")
    }
    const data = await res.json()
    return data.text
}

export default function LoginPage() {
    const consentFormText = use(getConsentFormText())
    return (
        <div>
            <Head>
                <title>title</title>
            </Head>
            <main className={`${styles.main} flex flex-col content-center gap-2`}>
                <div className='flex flex-col justify-center gap-2'>
                    <div className={styles.container}>
                        <div className="p-20">{consentFormText}</div>
                        <ConsentForm/>
                    </div>
                </div>
            </main>
        </div>
    )
}