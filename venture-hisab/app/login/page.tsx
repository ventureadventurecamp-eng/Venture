import Login from './ui';import {currentUser} from '../../auth/session';import {redirect} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function Page(){if(await currentUser())redirect('/');return <Login/>}
