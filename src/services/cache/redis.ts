import Redis from "ioredis";
import { promisify } from "util";
import { Request, Response } from 'express';
import { slugify } from '../../utils';

const redisClient = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_ENDPOINT,
    username: process.env.REDIS_USER_NAME,
    password: process.env.REDIS_PASSWORD,
    db: 0, // Defaults to 0
});

function getRedis(key: string) {
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(key);
}

function setRedis(key: string, value: string, expire: number = Number(process.env.CACHE_TIME_DEFAULT)) {
    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    const syncRedisExpire = promisify(redisClient.expire).bind(redisClient);

    syncRedisSet(key, value);    

    return syncRedisExpire(key, expire);
}

function getTTL(key:string){
    const syncRedisGetTTL = promisify(redisClient.ttl).bind(redisClient);
    return syncRedisGetTTL(key);
}

function getCacheKey(req: Request):string{
    let cacheKey = req.originalUrl;
    if(req.body.nome){
        cacheKey = `${cacheKey}/${slugify(req.body.nome)}`;
    }
    return cacheKey;
}

async function setCache(data: any, req: Request, res: Response){
    const cacheKey = getCacheKey(req);
    const maxAge = Number(process.env.CACHE_TIME_DEFAULT);  

    await setRedis(cacheKey, JSON.stringify(data), maxAge);    
    res.set('Cache-Control', `max-age=${maxAge}`);
}

export { getRedis, setRedis, getTTL, setCache, getCacheKey };