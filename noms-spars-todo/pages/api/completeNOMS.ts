import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req: { body: any }, res: { json: (arg0: any) => void; }) {
    const { client } = await connectToDatabase();
    let data = JSON.parse(req.body);
    console.log(data)
    const { interview_type, recordId } = data;
    const response = await client.db('interviews').collection(interview_type).updateOne(
        { _id: new ObjectId(recordId) },
        { $set: { spars_entry: true } }
    )
    res.json(response)
}