import { GetServerSideProps } from "next";
import { clientRecordInterface } from '../../types'
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";
import styles from '../../styles/Home.module.css';
import Head from "next/head";
import React from 'react';

export type Props = {
    serializedRecord: typeof clientRecordInterface;
}

function ClientDetail({ serializedRecord }: Props) {
    const recordId = JSON.stringify(serializedRecord._id)

    let completeEntry = async () => {
        const res = await fetch('/api/completeNOMS', {
            method: 'PUT',
            body: recordId
        }); if (res.ok) {
            window.location.replace('/')
        }
        else {
            alert('Your database connection was unsuccessful, try reloading the page or reaching out to sthompson@norainc.org for support')
        }
    }
    const {client_first_name, client_last_name} = serializedRecord.client_information.client_info;
    const {interview_type} = serializedRecord.interview_info;
    return (
        <div className={styles.container}>
            <Head>
                <title>NOMS SPARS TODO</title>
                <meta name="description" content="Detail of clients who haven't been entered into the SPARS system" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>
                    {client_first_name}
                </h1>
                <h1>
                    {client_last_name}
                </h1>
                <h2>
                    {interview_type.toString().toUpperCase()}
                </h2>
                <div className={styles.grid}>
                    <pre className={styles.code}>
                        {JSON.stringify(serializedRecord, null, '\t')}
                    </pre>
                    <h3>For BMI Stats, Services Received, and Admit Date, Check Dr. Cloud</h3>
                </div>
                <button className={styles.button} onClick={() => completeEntry()}><h3>NOMS Entered</h3></button>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    let client_id = JSON.stringify(params?.client_id);
    let interview_type = JSON.stringify(params?.interview_type);
    const { client } = await connectToDatabase();
    const clientRecordDetail = await client.db('interviews').collection(interview_type).findOne({
        _id: new ObjectId(JSON.parse(client_id))
    })
    let serializedRecord = JSON.parse(JSON.stringify(clientRecordDetail))
    return {
        props: { serializedRecord }
    }
}

export default ClientDetail