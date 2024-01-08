import Honeybadger from "@honeybadger-io/js";
import dotenv from 'dotenv';
dotenv.config();

Honeybadger.configure({
  apiKey: process.env.HONEY_BADGER_API_KEY,
  environment: process.env.HONEY_BADGER_API_ENVIRONMENT,
  filters: ['creditcard', 'password', 'senha', 'token']
});

interface Notice {
  message: string;    
  context: object;  
}

interface LoginBody {
  email?: string;    
  password: string;  
}

Honeybadger.beforeNotify(function(notice) {
  if(notice){
    const objNotice = notice as Notice
    Object.keys(objNotice.context).forEach(function(key) {
      if (/body/.test(key)) {
        const body = notice.context[key] as Object;
        Object.keys(body).forEach(function(key, i) {
          if(key == 'password'){
            const loginBody = body as LoginBody
            loginBody.password = "[FILTERED]"
          }
        })
      }
    });
  }
});

const Log = Honeybadger;
export default Log;