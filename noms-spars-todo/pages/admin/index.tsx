import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import { connectToDatabase } from '../../util/mongodb';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Props } from '../../util/Props'
import CardTable from './CardTable';


export default function AdminPage({ serializedCards }: Props) {
    console.log('serializedCards', serializedCards[0])
    const [cardRecords] = useState(serializedCards[0]);
    return (
        <div className={styles.container}>
            <Head>
                <title>NOMS Admin</title>
                <meta name="description" content="Overview of clients who have completed a successful NOMS interview" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <CardTable records={cardRecords} />
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { client } = await connectToDatabase();
        const card_projection = { _id: 1, client_info: 1, interviewDate: 1, interview_type: 1, gift_card_received: 1, NORA_acknowledged: 1, client_acknowledged: 1 }
        const cards = [];
        const collections = ['intake', '6month', '12month', '18month', 'youth_intake', 'youth_6month', 'youth_12month', 'youth_18month']
        for (const item in collections) {
            const cardRecords = await client.db('giftcards').collection(collections[item]).find({}).project(card_projection).toArray();
            if (cardRecords.length > 0) {
                cards.push(cardRecords);
            }
        }
        const serializedCards = JSON.parse(JSON.stringify(cards));
        return {
            props: {
                serializedCards
            }
        }
    } catch (error) {
        return {
            props: {
                error: JSON.stringify(error)
            }
        }
    }
}