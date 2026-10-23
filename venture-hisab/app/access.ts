import {currentUser} from '../auth/session';
export const adminEmail=()=>String(process.env.ADMIN_EMAIL||'').trim().toLowerCase();
export const isAdminEmail=(email:string)=>!!adminEmail()&&email.toLowerCase()===adminEmail();
export async function actor(){const u=await currentUser();if(!u||u.status!=='approved')return null;if(u.role==='admin'&&isAdminEmail(u.email))return {role:'admin',owner:u.id,email:u.email};if(!['staff','b2b'].includes(u.role)||!u.owner||!u.affiliation)return null;return {role:u.role,owner:u.owner,email:u.email,affiliation:u.affiliation}}
