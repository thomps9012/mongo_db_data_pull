import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { connectToDatabase } from '../util/mongodb'
import Link from 'next/link'
import { useState } from 'react'
import { Props } from '../util/Props'
import { GetServerSideProps } from 'next'
import React from 'react'

function GiftCard({ serializedCards }: Props) {
    const [cardRecords] = useState(serializedCards);
    return (
        <div className={styles.container}>
            <Head>
                <title>NOMS GIFT CARDS</title>
                <meta name="description" content="Overview of clients who haven't received gift cards incentives for successful NOMS interviews" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Gift Card Todo
                </h1>
                <div className={styles.grid}>
                    {cardRecords.length > 0 ?
                        <>
                            <h1>Clients below need to receive gift card incentives for NOMS participation</h1>
                            {cardRecords.map(record => {
                                const { interviewDate, interview_type } = record;
                                const { client_first_name, client_last_name } = record.client_info;
                                let year = interviewDate.slice(0, 4);
                                let month = interviewDate.slice(5, 7)
                                let day = interviewDate.slice(8, 10)
                                let formattedDate = `${month}/${day}/${year}`;
                                return (
                                    <Link key={JSON.stringify(record._id)} href='/carddetail/:interview_type/:client_id' as={`/carddetail/${interview_type}/${record._id}`} passHref>
                                        <div className={styles.card}>
                                            <h2>{client_first_name}</h2>
                                            <h2>{client_last_name}</h2>
                                            <h3>{interview_type.toUpperCase()}</h3>
                                            <h3>{formattedDate}</h3>
                                        </div>
                                    </Link>
                                )
                            })}
                        </>
                        :
                        <h1>All clients who have completed NOMS have received gift card incentives</h1>}
                </div>
                <Link href='/'>
                    <a><h4>
                        Take me over to SPARS records instead
                    </h4>
                    </a>
                </Link>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { client } = await connectToDatabase();
        const collections = ['intake', '6month', '12month', '18month', 'youth_intake', 'youth_6month', 'youth_12month', 'youth_18month']
        const unreceivedCards = [];
        for (const item in collections) {
            const collectionCards = await client.db.collection(collections[item]+'_giftcards').find({
                gift_card_received: false
            }).toArray()
            if (collectionCards.length > 0) {
                unreceivedCards.push(...collectionCards)
            }
        }
        const serializedCards = JSON.parse(JSON.stringify(unreceivedCards))
        return {
            props: { serializedCards: serializedCards }
        }
    } catch (error) {
        return {
            props: {
                error: error
            }
        }
    }
}

export default GiftCard