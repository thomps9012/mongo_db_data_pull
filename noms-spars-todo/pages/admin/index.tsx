import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import { connectToDatabase } from '../../util/mongodb';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Props } from '../../util/Props'
import CardTable from './CardTable';


export default function AdminPage({ serializedCards }: any) {
    const records = serializedCards[0];
    const [cardRecords, setRecords] = useState(records);
    const [searchName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cardReceived, setCardRecieved] = useState(false);
    const [searchDate, setDate] = useState(Date.now());
    const nameFilter = () => {
        const filteredRecords = records.filter((card: { client_info: { client_first_name: string; } }) => card.client_info.client_first_name.toLowerCase().includes(searchName.toLowerCase()));
        setRecords(filteredRecords);
    }
    const lastNameFilter = () => {
        const filteredRecords = records.filter((card: { client_info: { client_last_name: string; } }) => card.client_info.client_last_name.toLowerCase().includes(lastName.toLowerCase()));
        setRecords(filteredRecords);
    }
    const dateFilter = () => {
        const filteredRecords = records.filter((card: { interviewDate: string; }) => card.interviewDate.substring(0, 10) === searchDate.toString().substring(0, 10)
        );
        setRecords(filteredRecords);
    }
    const cardStatusFilter = () => {
        setCardRecieved(!cardReceived);
        const filteredRecords = records.filter((card: { gift_card_received: boolean; }) => card.gift_card_received === cardReceived);
        setRecords(filteredRecords);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>NOMS Admin</title>
                <meta name="description" content="Overview of clients who have completed a successful NOMS interview" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className='row'>
                        <input type="text" onChange={(e: any) => setName(e.target.value)} placeholder="Search" />
                        <button onClick={nameFilter}>Filter By First Name</button>
                        <input type="text" onChange={(e: any) => setLastName(e.target.value)} placeholder="Search" />
                        <button onClick={lastNameFilter}>Filter By Last Name</button>
                </div>
                <div className='row'>
                    <input type='date' onChange={(e: any) => setDate(e.target.value)} />
                    <button onClick={dateFilter}>Filter By Date</button>
                    <button onClick={cardStatusFilter}>{cardReceived ? 'Hide' : 'Show'} Interviews Who Have Received Cards</button>
                </div>
                <button onClick={() => setRecords(records)}>Reset</button>
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