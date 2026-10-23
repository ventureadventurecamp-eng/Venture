import {sqliteTable,text} from 'drizzle-orm/sqlite-core';
export const accounts=sqliteTable('accounts',{owner:text('owner').primaryKey(),data:text('data').notNull()});
export const members=sqliteTable('members',{email:text('email').primaryKey(),owner:text('owner').notNull(),role:text('role').notNull(),affiliation:text('affiliation').notNull(),active:text('active').notNull().default('yes')});
