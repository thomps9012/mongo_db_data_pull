import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: {body: any}, res: { json: (arg0: any) => void; }) {
    const { client } = await connectToDatabase();
    let clientId = JSON.parse(req.body.client_id)
    const response = await client.db('spars_cmhs').collection('clients').updateOne(
        { _id: new ObjectId(clientId) },
        { $set: {
            gift_card_received: true,
            NORA_acknowledged: true,
            client_acknowledged: true,
            card_type: req.body.card_type,
            card_amt: req.body.card_amt
        }}
    )
    res.json(response)
}