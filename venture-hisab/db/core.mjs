import {DatabaseSync} from 'node:sqlite';import {mkdirSync} from 'node:fs';import {dirname,resolve} from 'node:path';
let instance;
export function sqlite(){if(instance)return instance;const path=resolve(process.env.DB_PATH||'data/venture.sqlite');mkdirSync(dirname(path),{recursive:true,mode:0o700});instance=new DatabaseSync(path);instance.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS accounts(owner TEXT PRIMARY KEY,data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS members(email TEXT PRIMARY KEY,owner TEXT NOT NULL,role TEXT NOT NULL,affiliation TEXT NOT NULL,active TEXT NOT NULL DEFAULT 'yes');
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,password_hash TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'pending',role TEXT NOT NULL DEFAULT 'staff',affiliation TEXT NOT NULL DEFAULT '',owner TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL,requested_role TEXT NOT NULL DEFAULT 'staff');
CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS auth_limits(key TEXT PRIMARY KEY,count INTEGER NOT NULL,reset_at INTEGER NOT NULL);
`);return instance}
