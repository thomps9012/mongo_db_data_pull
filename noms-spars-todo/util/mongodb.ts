import { MongoClient } from 'mongodb';
const { DATABASE_URL, DATABASE_NAME } = process.env;

declare global {
    var mongo: any;
}

if (!DATABASE_URL) {
    throw new Error(
        'Please define a database connection inside the .env file'
    )
}

if (!DATABASE_NAME) {
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

    if (!cached.promise && DATABASE_URL!=null) {
        cached.promise = MongoClient.connect(DATABASE_URL).then((client) => {
            return {
                client,
                db: client.db(DATABASE_NAME)
            }
        })
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// may need to change to mongoose