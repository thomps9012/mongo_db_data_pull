import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: {body: any}, res: { json: (arg0: any) => void; }) {
    const { client } = await connectToDatabase();
    console.log(req.body)
    const response = await client.db('spars_cmhs').collection('clients').updateOne(
        { _id: new ObjectId(req.body.recordId) },
        { $set: {
            gift_card_received: true,
            NORA_acknowledged: req.body.nora,
            client_acknowledged: req.body.client,
            card_type: req.body.card_type,
            card_amt: req.body.card_amt
        }}
    )
    console.log(response)
    res.json(response)
}