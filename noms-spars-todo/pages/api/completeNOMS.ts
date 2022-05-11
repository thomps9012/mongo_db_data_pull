import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: { body: any }, res: { json: (arg0: any) => void; }) {
    const { client } = await connectToDatabase();
    let data = JSON.parse(req.body);
    console.log(data)
    const { interview_type, recordId } = data;
    const possibleColls = [interview_type, `youth_${interview_type}`];
    for (const collection in possibleColls) {
        const response = await client.db.collection(possibleColls[collection]).updateOne(
            { _id: new ObjectId(recordId) },
            { $set: { spars_entry: true } }
        )
        if (response != null) {
            res.json(response)
        }
    }
}