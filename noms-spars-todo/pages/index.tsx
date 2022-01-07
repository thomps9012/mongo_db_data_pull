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
          Welcome to Your NOMS SPARS Todo
        </h1>
        <div className={styles.grid}>
          {records.length > 0 ?
            <>
              <h1>Clients below need to be entered into SPARS</h1>
              {records.map(record => {
                let year = record.client_information.interviewDate.slice(0,4);
                let month = record.client_information.interviewDate.slice(5,7)
                let day = record.client_information.interviewDate.slice(8,10)
                let formattedDate = `${month}/${day}/${year}`;
                return (
                  <Link key={JSON.stringify(record._id)} href='/detail/:client_id' as={`/detail/${record._id}`} passHref>
                    <div key={JSON.stringify(record._id)} className={styles.card}>
                      <h1 key={JSON.stringify(record._id)}>{record.client_information.client_info.name}</h1>
                      <h2 key={JSON.stringify(record._id)}>{record.client_information.interview_type.toUpperCase()}</h2>
                      <h3 key={JSON.stringify(record._id)}>{formattedDate}</h3>
                    </div>
                  </Link>
                )
              })}
            </>
            :
            <h1>You are all caught up on your SPARS Data Entry</h1>}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { client } = await connectToDatabase()
    const projection = { _id: 1, client_information: 1 }
    const unenteredRecords = await client.db('spars_cmhs').collection('clients').find({
      spars_entry: false
    }).project(projection).toArray()
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
