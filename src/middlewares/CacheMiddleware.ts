import { getRedis, getTTL, getCacheKey } from '../services/cache/redis';
import { Request, Response, NextFunction } from 'express';

class CacheMiddleware {
    checkCache = async (req: Request, res: Response, next: NextFunction) =>{
        const cacheKey = getCacheKey(req);

        const cachedData = await getRedis(cacheKey);
        if(cachedData){
            const ttl = await getTTL(cacheKey);
            res.set('Cache-Control', `max-age=${ttl}`);
            res.status(200).json(JSON.parse(cachedData));
        }else{
            next()
        }        
    }
}

export const cacheMiddleware = new CacheMiddleware();