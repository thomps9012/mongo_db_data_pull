import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import { connectToDatabase } from '../../util/mongodb';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Props } from '../../util/Props'
import CardTable from './CardTable';
import InterviewTable from './InterviewTable';


export default function AdminPage({ serializedCards, serializedRecords }: Props) {
    console.log('serializedCards', serializedCards)
    console.log('serializedRecords', serializedRecords)
    const [cardRecords] = useState(serializedCards);
    const [interviewRecords] = useState(serializedRecords);
    const onChange = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>NOMS Admin</title>
                <meta name="description" content="Overview of clients who have completed a successful NOMS interview" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button onClick={onChange}>Show Gift Card Records</button>
            <button onClick={onChange}>Show Interview Records</button>
            <main className={styles.main}>
                <CardTable records={cardRecords} />
                <InterviewTable records={interviewRecords} />
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { client } = await connectToDatabase();
        const interview_projection = { _id: 1, client_information: 1, interview_info: 1 }
        const card_projection = { _id: 1, client_information: 1, interviewDate: 1, interview_type: 1, gift_card_received: 1, NORA_acknowledged: 1, client_acknowledged: 1 }
        const cards = [];
        const interviews = [];
        const collections = ['intake', '6month', '12month', '18month', 'youth_intake', 'youth_6month', 'youth_12month', 'youth_18month']
        for (const item in collections) {
            const cardRecords = await client.db('giftcards').collection(collections[item]).find({}).project(card_projection).toArray();
            if (cardRecords.length > 0) {
                cards.push(cardRecords);
            }
            const interviewRecords = await client.db('interviews').collection(collections[item]).find({}).project(interview_projection).toArray();
            if (interviewRecords.length > 0) {
                interviews.push(interviewRecords);
            }
        }
        const serializedCards = JSON.parse(JSON.stringify(cards));
        const serializedRecords = JSON.parse(JSON.stringify(interviews));
        return {
            props: {
                serializedCards,
                serializedRecords
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