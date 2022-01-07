import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: {body: any}, res: { json: (arg0: any) => void; }) {
    const { client } = await connectToDatabase();
    let data = JSON.parse(req.body)
    const response = await client.db('spars_cmhs').collection('clients').updateOne(
        { _id: new ObjectId(data.recordId) },
        { $set: {
            gift_card_received: true,
            NORA_acknowledged: data.nora,
            client_acknowledged: data.client,
            card_type: data.card_type,
            card_amt: data.card_amt
        }}
    )
    res.json(response)
}