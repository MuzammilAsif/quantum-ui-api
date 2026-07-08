import { Hono } from 'hono';
import { db } from '../db';
import { components, implementations } from '../db/schema';
import { like, or, eq, and, sql } from 'drizzle-orm';

export const searchRouter = new Hono();

// GET /api/search?q=button&library=shadcn&framework=react&limit=20
// Searches across component names, descriptions, and tags
searchRouter.get('/', async (c) => {
  const query     = c.req.query('q')         ?? '';
  const libraryId = c.req.query('library');
  const framework = c.req.query('framework');
  const difficulty= c.req.query('difficulty');
  const limit     = parseInt(c.req.query('limit') ?? '20');

  if (!query.trim()) {
    return c.json({
      success: false,
      error: 'Query parameter q is required',
    }, 400);
  }

  try {
    const searchTerm = `%${query.toLowerCase()}%`;

    // Build conditions
    const conditions = [
      or(
        like(components.name,        searchTerm),
        like(components.description, searchTerm),
        like(components.slug,        searchTerm),
        sql`${components.tags}::text ILIKE ${searchTerm}`
      )!,
    ];

    if (libraryId)  conditions.push(eq(components.libraryId, libraryId));
    if (difficulty) conditions.push(eq(components.difficulty, difficulty));

    const results = await db
      .select({
        id:          components.id,
        libraryId:   components.libraryId,
        categoryId:  components.categoryId,
        name:        components.name,
        slug:        components.slug,
        description: components.description,
        difficulty:  components.difficulty,
        styleTag:    components.styleTag,
        isPremium:   components.isPremium,
        isNew:       components.isNew,
        tags:        components.tags,
        author:      components.author,
        version:     components.version,
      })
      .from(components)
      .where(and(...conditions))
      .limit(Math.min(limit, 50));

    // Filter by framework if provided
    let filtered = results;
    if (framework) {
      const withImpl = await Promise.all(
        results.map(async (comp) => {
          const impl = await db
            .select({ id: implementations.id })
            .from(implementations)
            .where(
              and(
                eq(implementations.componentId, comp.id),
                eq(implementations.framework,   framework)
              )
            )
            .limit(1);
          return impl.length > 0 ? comp : null;
        })
      );
      filtered = withImpl.filter(Boolean) as typeof results;
    }

    return c.json({
      success: true,
      data: filtered,
      count: filtered.length,
      query,
    });
  } catch (error) {
    return c.json({ success: false, error: 'Search failed' }, 500);
  }
});