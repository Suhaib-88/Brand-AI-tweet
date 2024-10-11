import {createClient} from 'redis';
const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
    await client.connect();
}

connectRedis();

export async function cacheData(key: string, data: any, expirationInSeconds: number) {
    await client.set(key, JSON.stringify(data), {EX: expirationInSeconds});
}

export async function getcacheData(key: string) {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
}

