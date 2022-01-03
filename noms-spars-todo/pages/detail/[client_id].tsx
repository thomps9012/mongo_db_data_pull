import { GetServerSideProps } from "next";
import { clientRecordInterface } from '../../types'
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";
import { ClientDetail } from "./ClientDetail";

export type Props = {
    serializedRecord: typeof clientRecordInterface
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    let client_id = params?.client_id;
    const { client } = await connectToDatabase();
    const clientRecordDetail = await client.db('spars_cmhs').collection('clients').findOne({
        _id: new ObjectId(client_id)
    })
    let serializedRecord = JSON.parse(JSON.stringify(clientRecordDetail))
    console.log(serializedRecord)
    return {
        props: { serializedRecord }
    }
}

export default ClientDetail