import {cookies} from 'next/headers';import {sessionUser} from './security.mjs';
export async function currentUser(){const jar=await cookies();return sessionUser(jar.get('venture_session')?.value) as null|{id:string,email:string,name:string,status:string,role:string,affiliation:string,owner:string}}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');if(!origin)return false;try{const configured=process.env.APP_ORIGIN;return new URL(origin).origin===(configured?new URL(configured).origin:new URL(req.url).origin)}catch{return false}}
export const cookieOptions=()=>({httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax' as const,path:'/',maxAge:12*60*60});
