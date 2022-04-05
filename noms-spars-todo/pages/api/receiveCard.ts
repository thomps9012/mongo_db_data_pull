import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: { body: any }, res: { json: (arg0: any) => void; }) {
    const { client } = await connectToDatabase();
    let data = JSON.parse(req.body)
    const { nora, card_type, card_amt, recordId, interviewtype } = data;
    const possibleColls = [interviewtype, `youth_${interviewtype}`];
    for (const collection in possibleColls) {
        const response = await client.db('giftcards').collection(possibleColls[collection]).updateOne(
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
        if (response != null) {
            res.json(response)
        }
    }
}