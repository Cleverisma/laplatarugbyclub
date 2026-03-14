import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const matches = sqliteTable('matches', {
  id: integer('id').primaryKey(),
  status: text('status', { enum: ['played', 'upcoming'] }).notNull(),
  matchDate: text('match_date').notNull(),
  homeTeam: text('home_team').notNull(),
  awayTeam: text('away_team').notNull(),
  homeScore: integer('home_score'),
  awayScore: integer('away_score'),
  location: text('location').notNull(),
  competition: text('competition'),
});

export const boardMembers = sqliteTable('board_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  role: text('role').notNull(),
  displayOrder: integer('display_order').notNull(),
});
