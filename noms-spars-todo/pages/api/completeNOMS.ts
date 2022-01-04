import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: { body: any }, res: { json: (arg0: any) => void; }) {
    const { client } = await connectToDatabase();
    let clientId = (JSON.parse(req.body))
    const response = await client.db('spars_cmhs').collection('clients').updateOne(
        { _id: new ObjectId(clientId) },
        { $set: { spars_entry: true } }
    )
    res.json(response)
}