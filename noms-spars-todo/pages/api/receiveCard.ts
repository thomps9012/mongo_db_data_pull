import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: {body: any}, res: { json: (arg0: any) => void; }) {
    const { client } = await connectToDatabase();
    let clientId = JSON.parse(req.body.client_id)
    let cardType = JSON.parse(req.body.card_type)
    let cardAmt = JSON.parse(req.body.card_amt)
    let clientAcknowleged = JSON.parse(req.body.client)
    let NORAAcknowleged = JSON.parse(req.body.nora)
    const response = await client.db('spars_cmhs').collection('clients').updateOne(
        { _id: new ObjectId(clientId) },
        { $set: {
            gift_card_received: true,
            NORA_acknowledged: NORAAcknowleged,
            client_acknowledged: clientAcknowleged,
            card_type: cardType,
            card_amt: cardAmt
        }}
    )
    res.json(response)
}