import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

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

export const divisions = sqliteTable('divisions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  groupType: text('group_type').notNull(),
  displayOrder: integer('display_order').notNull(),
});

export const staffMembers = sqliteTable('staff_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  divisionId: integer('division_id').references(() => divisions.id).notNull(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull(),
  displayOrder: integer('display_order').notNull(),
});

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  datetime: text('datetime').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
  displayOrder: integer('display_order').notNull().default(0),
  eventDate: integer('event_date'),
});

export const divisionsRelations = relations(divisions, ({ many }) => ({
  staffMembers: many(staffMembers),
}));

export const staffMembersRelations = relations(staffMembers, ({ one }) => ({
  division: one(divisions, {
    fields: [staffMembers.divisionId],
    references: [divisions.id],
  }),
}));
