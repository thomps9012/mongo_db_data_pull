import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { connectToDatabase } from '../util/mongodb'
import Link from 'next/link'
import { useState } from 'react'
import { Props } from '../util/Props'
import { GetServerSideProps } from 'next'
import React from 'react'

function Home({ serializedRecords }: Props) {
  const [records] = useState(serializedRecords)
  return (
    <div className={styles.container}>
      <Head>
        <title>NOMS SPARS TODO</title>
        <meta name="description" content="Overview of clients who need to have NOMS input into SPARS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          NOMS SPARS Todo
        </h1>
        <div className={styles.grid}>
          {records.length > 0 ?
            <>
              <h1>Clients below need to be entered into SPARS</h1>
              {records.map(record => {
                const { interviewDate, interview_type } = record.interview_info;
                const { client_first_name, client_last_name } = record.client_information.client_info;
                let year = interviewDate.slice(0, 4);
                let month = interviewDate.slice(5, 7)
                let day = interviewDate.slice(8, 10)
                let formattedDate = `${month}/${day}/${year}`;
                return (
                  <Link key={JSON.stringify(record._id)} href='/detail/:interview_type/:client_id' as={`/detail/${interview_type}/${record._id}`} passHref>
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
            <h1>You are all caught up on your SPARS Data Entry</h1>}
        </div>
        <Link href='/GiftCard'>
          <a><h4>
            Take me over to gift card records instead
          </h4>
          </a>
        </Link>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { client, db } = await connectToDatabase()
    const projection = { _id: 1, client_information: 1, interview_info: 1 }
    const collections = ['intake', '6month', '12month', '18month', 'youth_intake', 'youth_6month', 'youth_12month', 'youth_18month']
    const unenteredRecords = [];
    for (const item in collections) {
      const collectionRecords = await db.collection(collections[item]).find({
        spars_entry: false
      }).project(projection).toArray()
      if (collectionRecords.length > 0){
        unenteredRecords.push(...collectionRecords)
      }
    }
    const serializedRecords = JSON.parse(JSON.stringify(unenteredRecords))
    return {
      props: { serializedRecords: serializedRecords }
    }
  } catch (error) {
    return {
      props: {
        error: error
      }
    }
  }
}

export default Home
