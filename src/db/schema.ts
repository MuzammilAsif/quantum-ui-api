import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  uuid,
} from 'drizzle-orm/pg-core';

// ─── Libraries ────────────────────────────────────────────────────────────────
// Each library is a source of components (shadcn, magicui, etc.)

export const libraries = pgTable('libraries', {
  id: text('id').primaryKey(), // 'quantum', 'shadcn', 'magicui', etc.
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  website: text('website'),
  color: text('color').notNull(),       // hex accent color for the UI tile
  textColor: text('text_color').notNull().default('#ffffff'),
  isActive: boolean('is_active').default(true).notNull(),
  isOfficial: boolean('is_official').default(false).notNull(),
  componentCount: integer('component_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Categories ───────────────────────────────────────────────────────────────
// Categories belong to a specific library.

export const categories = pgTable('categories', {
  id: text('id').primaryKey(), // 'quantum-buttons', 'shadcn-cards', etc.
  libraryId: text('library_id')
    .references(() => libraries.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),          // 'buttons', 'cards', etc.
  icon: text('icon').notNull(),
  description: text('description'),
  order: integer('order').default(0).notNull(),
  componentCount: integer('component_count').default(0).notNull(),
});

// ─── Components ───────────────────────────────────────────────────────────────
// A component is a logical UI piece that can have multiple framework implementations.

export const components = pgTable('components', {
  id: uuid('id').primaryKey().defaultRandom(),
  libraryId: text('library_id')
    .references(() => libraries.id, { onDelete: 'cascade' })
    .notNull(),
  categoryId: text('category_id')
    .references(() => categories.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description').notNull(),
  difficulty: text('difficulty').notNull().default('Beginner'),
  styleTag: text('style_tag'),
  isPremium: boolean('is_premium').default(false).notNull(),
  isNew: boolean('is_new').default(false).notNull(),
  tags: jsonb('tags').$type<string[]>().default([]).notNull(),
  author: text('author').notNull().default('Quantum UI'),
  version: text('version').default('1.0.0').notNull(),
  previewType: text('preview_type').default('html').notNull(), // 'html' | 'image' | 'iframe'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Implementations ──────────────────────────────────────────────────────────
// Each implementation is framework-specific code for a component.
// One component can have many implementations (React, Vue, HTML, etc.)

export const implementations = pgTable('implementations', {
  id: uuid('id').primaryKey().defaultRandom(),
  componentId: uuid('component_id')
    .references(() => components.id, { onDelete: 'cascade' })
    .notNull(),
  framework: text('framework').notNull(), // 'react' | 'vue' | 'html' | 'angular' | 'nextjs'
  language: text('language').notNull().default('tsx'), // file extension
  code: text('code').notNull(),
  previewHtml: text('preview_html'),      // simplified HTML for iframe preview
  dependencies: jsonb('dependencies')
    .$type<string[]>()
    .default([])
    .notNull(),
  devDependencies: jsonb('dev_dependencies')
    .$type<string[]>()
    .default([])
    .notNull(),
  version: text('version').default('1.0.0').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Type exports ─────────────────────────────────────────────────────────────

export type Library = typeof libraries.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Component = typeof components.$inferSelect;
export type Implementation = typeof implementations.$inferSelect;

export type LibraryInsert = typeof libraries.$inferInsert;
export type CategoryInsert = typeof categories.$inferInsert;
export type ComponentInsert = typeof components.$inferInsert;
export type ImplementationInsert = typeof implementations.$inferInsert;