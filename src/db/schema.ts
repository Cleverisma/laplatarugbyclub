import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
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
  groupType: text('group_type').notNull(), // 'Plantel Superior', 'Juvenil', 'Infantil', 'Escuelita'
  sectionType: text('section_type').notNull().default('equipo'), // 'subcomision', 'coaching', 'equipo'
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

export const standings = sqliteTable('standings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  teamName: text('team_name').notNull(),
  matchesPlayed: integer('matches_played').notNull().default(0),
  points: integer('points').notNull().default(0),
});

// Auth: tabla de usuarios para el login del panel de administración
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  lastLogin: integer('last_login', { mode: 'timestamp' }),
});

export const heroSlides = sqliteTable('hero_slides', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  imageUrl: text('image_url').notNull(),
  title: text('title'),
  order: integer('display_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

export const siteSettings = sqliteTable('site_settings', {
  id: integer('id').primaryKey().default(1),
  playersCount: integer('players_count').notNull().default(1199),
  membersCount: integer('members_count').notNull().default(2899),
  followersCount: integer('followers_count').notNull().default(61000),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

export const instagramPosts = sqliteTable('instagram_posts', {
  id: text('id').primaryKey(),
  permalink: text('permalink').notNull(),
  mediaUrl: text('media_url').notNull(),
  mediaType: text('media_type'),
  caption: text('caption'),
  timestamp: text('timestamp'),
});

export const verticalVideos = sqliteTable('vertical_videos', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  videoUrl: text('video_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  isActive: integer('is_active').notNull().default(1),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const sponsors = sqliteTable('sponsors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  logoUrl: text('logo_url').notNull(),
  url: text('url'),
  displayOrder: integer('display_order').notNull().default(0),
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
