import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: { body: any }, res: { json: (arg0: any) => void; }) {
    const { client } = await connectToDatabase();
    let data = JSON.parse(req.body)
    const { nora, card_type, card_amt, recordId, interviewtype } = data;
    const response = await client.db('giftcards').collection(interviewtype).updateOne(
        { _id: new ObjectId(recordId) },
        {
            $set: {
                gift_card_received: true,
                NORA_acknowledged: nora,
                client_acknowledged: data.client,
                card_type: card_type,
                card_amt: card_amt
            }
        }
    )
    res.json(response)
}