import { GetServerSideProps } from "next";
import { clientCardInterface } from '../../../types'
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";
import styles from '../../../styles/Home.module.css';
import Head from 'next/head';
import React, { useState } from 'react';

export type Props = {
    serializedRecord: typeof clientCardInterface;
}

function ClientCardDetail({ serializedRecord }: Props) {
    const recordId = serializedRecord._id
    const { interview_type } = serializedRecord;
    const { client_first_name, client_last_name } = serializedRecord.client_info;
    const [card_type, setCardType] = useState('')
    const [card_amt, setCardAmt] = useState(0.0)
    const [client, setClient] = useState(false)
    const [nora, setNora] = useState(false)
    const [interviewtype] = useState(interview_type)
    const body = JSON.stringify({ recordId, card_type, card_amt, nora, client, interviewtype })
    let enterCard = async () => {
        const res = await fetch('/api/receiveCard', {
            method: 'PUT',
            body: body
        }); if (res.ok) {
            window.location.replace('/GiftCard')
        }
        else {
            alert('Your database connection was unsuccessful, try reloading the page or reaching out to sthompson@norainc.org for support')
        }
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>
                    NOMS GIFT CARDS
                </title>
                <meta name="description" content="Detail of clients who haven't received gift cards incentives for successful NOMS interviews" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <div className={styles.form}>
                        <h2>Gift Card Details for:
                        </h2>
                        <h2>
                            {client_first_name}
                        </h2>
                        <h2>
                            {client_last_name}
                        </h2>
                        <h3>
                            {interview_type.toString().toUpperCase()}
                        </h3>
                    </div>
                    <div className={styles.form}>
                        <h2>Gift Card Type</h2>
                        <input type='text' className={styles.input} onChange={(e) => setCardType(e.target.value)} />
                        <h2>Gift Card Amount</h2>
                        <input type='number' className={styles.input} onChange={(e) => setCardAmt(JSON.parse(e.target.value))} />
                        <div className={styles.margin} />
                        <label>Client Acknowledged:</label>
                        <input type='checkbox' className={styles.checkbox} onChange={client === true ? () => setClient(false) : () => setClient(true)} />
                        <br />
                        <label>NORA Acknowledged:</label>
                        <input className={styles.checkbox} type='checkbox' onChange={nora === true ? () => setNora(false) : () => setNora(true)} />
                    </div>
                </div>
                <button className={styles.button} onClick={() => enterCard()}><h3>Save Card Information</h3></button>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    console.log(params)
    let client_id = JSON.stringify(params?.client_id);
    let interview_type = params?.interview_type;
    const { client, db} = await connectToDatabase();
    const possibleColls = [interview_type, `youth_${interview_type}`];
    let recordDetail;
    for (const collection in possibleColls) {
        const clientCardDetail = await client.db.collection(possibleColls[collection]+'_giftcards').findOne({
            _id: new ObjectId(JSON.parse(client_id))
        })
        if (clientCardDetail != null) {
            recordDetail = clientCardDetail;
        }
    }
    let serializedRecord = JSON.parse(JSON.stringify(recordDetail));
    return {
        props: { serializedRecord }
    }
}

export default ClientCardDetail