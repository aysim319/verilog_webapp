import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { use } from 'react';



export default function DonePage() {
    return (
        <div>
            <Head>
                <title>title</title>
            </Head>
            <main className={`${styles.main} flex flex-col content-center gap-2`}>
                <div className='flex flex-col justify-center gap-2'>
                    <div className={'flex justify-center'}>
                        <text className={'content-center self-center' +
                            ' text-center'}> Thank you for participating in the study</text>
                    </div>
                </div>
            </main>
        </div>
    )
}