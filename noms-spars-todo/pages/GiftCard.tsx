import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { connectToDatabase } from '../util/mongodb'
import Link from 'next/link'
import { useState } from 'react'
import { Props } from '../util/Props'
import { GetServerSideProps } from 'next'
import React from 'react'

function GiftCard({ serializedRecords }: Props) {
    const [cardRecords] = useState(serializedRecords);
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
                        let year = record.interview_info.interviewDate.slice(0,4);
                        let month = record.interview_info.interviewDate.slice(5,7)
                        let day = record.interview_info.interviewDate.slice(8,10)
                        let formattedDate = `${month}/${day}/${year}`;
                        return (
                            <Link key={JSON.stringify(record._id)} href='/carddetail/:client_id' as={`/carddetail/${record._id}`} passHref>
                              <div className={styles.card}>
                                <h2>{record.client_information.client_info.client_first_name}</h2>
                                <h2>{record.client_information.client_info.client_last_name}</h2>
                                <h3>{record.interview_info.interview_type.toUpperCase()}</h3>
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
        const projection = {_id: 1, client_information: 1, interview_info: 1}
        const unreceivedCards = await client.db('spars_cmhs').collection('clients').find({
            gift_card_received: false
        }).project(projection).toArray()
        const serializedRecords = JSON.parse(JSON.stringify(unreceivedCards))
        return {
            props: {serializedRecords: serializedRecords}
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