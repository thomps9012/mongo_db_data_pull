import { GetServerSideProps } from "next";
import { Props } from "../../../util/Props";
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";
import styles from '../../../styles/Home.module.css';
import Head from "next/head";
import React from 'react';
import toTitleCase from "../../../util/titleCase";

function ClientDetail({serializedRecord}: Props) {
    const { interview_type } = serializedRecord.interview_info;
    const { client_first_name, client_last_name } = serializedRecord.client_information.client_info;
    const recordId = serializedRecord._id
    const body = JSON.stringify({ recordId, interview_type })
    let completeEntry = async () => {
        const res = await fetch('/api/completeNOMS', {
            method: 'PUT',
            body: body
        }); if (res.ok) {
            window.location.replace('/')
        }
        else {
            alert('Your database connection was unsuccessful, try reloading the page or reaching out to sthompson@norainc.org for support')
        }
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>NOMS SPARS TODO</title>
                <meta name="description" content="Detail of clients who haven't been entered into the SPARS system" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>
                    {toTitleCase(client_first_name)}
                </h1>
                <h1>
                    {toTitleCase(client_last_name)}
                </h1>
                <h2>
                    {interview_type === 'intake' ?
                        'Intake'
                        : interview_type === 'discharge' ?
                            'Discharge'
                            : interview_type + ' Month'}
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
    let interview_type = params?.interview_type;
    const { db } = await connectToDatabase();
    if (interview_type !== 'intake' && interview_type !== 'discharge') {
        interview_type = interview_type+'month';
    }
    const possibleColls = [interview_type, `youth_${interview_type}`];
    let recordDetail;
    for (const collection in possibleColls) {
        const clientRecordDetail = await db.collection(possibleColls[collection]).findOne({
            _id: new ObjectId(JSON.parse(client_id))
        })
        if (clientRecordDetail != null) {
            recordDetail = clientRecordDetail;
        }
    }
    let serializedRecord = JSON.parse(JSON.stringify(recordDetail))
    return {
        props: { serializedRecord }
    }
}

export default ClientDetail