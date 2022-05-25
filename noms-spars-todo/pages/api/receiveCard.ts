import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: { body: any }, res: { json: (arg0: any) => void; }) {
    const { client, db} = await connectToDatabase();
    let data = JSON.parse(req.body)
    let { nora, card_type, card_amt, recordId, interview_type } = data;
    if (interview_type !== 'intake' && interview_type !== 'discharge' && !/youth_\w+/g.test(JSON.stringify(interview_type))) {
        interview_type = interview_type + 'month';
    }
    const possibleColls = [interview_type, `youth_${interview_type}`];
    for (const collection in possibleColls) {
        const response = await db.collection(possibleColls[collection]+'_giftcards').updateOne(
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