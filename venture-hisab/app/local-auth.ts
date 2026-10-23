import {currentUser} from '../auth/session';
export async function getLocalUser(){const u=await currentUser();return u&&u.status==='approved'?{userId:u.id,email:u.email,role:u.role}:null}
