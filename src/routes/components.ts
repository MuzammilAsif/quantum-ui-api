import { Hono } from 'hono';
import { db } from '../db';
import { components, implementations, categories } from '../db/schema';
import { eq, and } from 'drizzle-orm';

export const componentsRouter = new Hono();

// GET /api/components?library=quantum&category=buttons&framework=react&limit=20&offset=0
// Returns components with optional filters
componentsRouter.get('/', async (c) => {
  const libraryId  = c.req.query('library');
  const categoryId = c.req.query('category'); // slug like 'buttons'
  const framework  = c.req.query('framework');
  const limit      = parseInt(c.req.query('limit')  ?? '20');
  const offset     = parseInt(c.req.query('offset') ?? '0');

  try {
    // Build category ID from library + slug if both provided
    let resolvedCategoryId: string | undefined;
    if (libraryId && categoryId) {
      resolvedCategoryId = `${libraryId}-${categoryId}`;
    }

    // Build conditions
    const conditions = [];
    if (libraryId)           conditions.push(eq(components.libraryId,  libraryId));
    if (resolvedCategoryId)  conditions.push(eq(components.categoryId, resolvedCategoryId));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const allComponents = await db
      .select({
        id:          components.tags,
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
        createdAt:   components.createdAt,
      })
      .from(components)
      .where(whereClause)
      .limit(Math.min(limit, 100))
      .offset(offset);

    // If framework filter is applied, only return components
    // that have an implementation for that framework
    let filtered = allComponents;
    if (framework) {
      const withImpl = await Promise.all(
        allComponents.map(async (comp) => {
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
      filtered = withImpl.filter(Boolean) as typeof allComponents;
    }

    return c.json({
      success: true,
      data: filtered,
      count: filtered.length,
      limit,
      offset,
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch components' }, 500);
  }
});

// GET /api/components/:id
// Returns a single component with ALL its implementations
componentsRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const framework = c.req.query('framework'); // optional — filter to one implementation

  try {
    const component = await db
      .select()
      .from(components)
      .where(eq(components.id, id))
      .limit(1);

    if (component.length === 0) {
      return c.json({ success: false, error: 'Component not found' }, 404);
    }

    // Fetch implementations
    const implConditions = [eq(implementations.componentId, id)];
    if (framework) implConditions.push(eq(implementations.framework, framework));

    const impls = await db
      .select()
      .from(implementations)
      .where(and(...implConditions));

    // Fetch category info
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, component[0].categoryId))
      .limit(1);

    return c.json({
      success: true,
      data: {
        ...component[0],
        category: category[0] ?? null,
        implementations: impls,
        availableFrameworks: impls.map((i) => i.framework),
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch component' }, 500);
  }
});