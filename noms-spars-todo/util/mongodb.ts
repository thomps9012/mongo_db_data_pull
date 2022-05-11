import { MongoClient } from 'mongodb';
const { ATLAS_URI, DATABASE } = process.env;

declare global {
    var mongo: any;
}

if (!ATLAS_URI) {
    throw new Error(
        'Please define a database connection inside the .env file'
    )
}

if (!DATABASE) {
    throw new Error(
        'Please define a database name inside the .env file'
        )
}

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null}
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise && ATLAS_URI!=null) {
        cached.promise = MongoClient.connect(ATLAS_URI).then((client) => {
            return {
                client,
                db: client.db(DATABASE)
            }
        })
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// may need to change to mongoose