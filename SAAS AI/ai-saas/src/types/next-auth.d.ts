import type { DefaultSession } from 'next-auth';


declare module "next-auth"{
     interface Session {
        accessToken?:string;
        user: {
            id:string;
        } & DefaultSession['user'] 
        & User;
}


interface User{
    image?:string;
    superAdmin:boolean;
    organizations:{ id:string; name: string; role:string}[];
}


}