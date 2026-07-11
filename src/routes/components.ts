import { Hono } from 'hono';
import { db } from '../db';
import { components, implementations, categories } from '../db/schema';
import { eq, and, type SQL } from 'drizzle-orm';

export const componentsRouter = new Hono();

// Shared select shape — defined once, reused everywhere.
// This prevents TypeScript from inferring conflicting types
// across multiple separate .select() calls.
const componentFields = {
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
  createdAt:   components.createdAt,
};

// GET /api/components?library=quantum&category=buttons&framework=react&limit=20&offset=0
componentsRouter.get('/', async (c) => {
  const libraryId    = c.req.query('library');
  const categorySlug = c.req.query('category');
  const framework     = c.req.query('framework');
  const limit         = Math.min(parseInt(c.req.query('limit')  ?? '20'), 100);
  const offset        = parseInt(c.req.query('offset') ?? '0');

  try {
    const resolvedCategoryId =
      libraryId && categorySlug ? `${libraryId}-${categorySlug}` : undefined;

    // Build ONE dynamic where condition instead of branching queries.
    let whereCondition: SQL | undefined;

    if (libraryId && resolvedCategoryId) {
      whereCondition = and(
        eq(components.libraryId,  libraryId),
        eq(components.categoryId, resolvedCategoryId)
      );
    } else if (libraryId) {
      whereCondition = eq(components.libraryId, libraryId);
    }

    // Single query — TypeScript infers ONE consistent type.
    const allComponents = whereCondition
      ? await db
          .select(componentFields)
          .from(components)
          .where(whereCondition)
          .limit(limit)
          .offset(offset)
      : await db
          .select(componentFields)
          .from(components)
          .limit(limit)
          .offset(offset);

    // Filter by framework if provided
    let filtered = allComponents;
    if (framework && allComponents.length > 0) {
      const results = await Promise.all(
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
      filtered = results.filter(
        (item): item is NonNullable<typeof item> => item !== null
      );
    }

    return c.json({
      success: true,
      data:    filtered,
      count:   filtered.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('[GET /components]', error);
    return c.json({ success: false, error: 'Failed to fetch components' }, 500);
  }
});

// GET /api/components/:id
componentsRouter.get('/:id', async (c) => {
  const id        = c.req.param('id');
  const framework = c.req.query('framework');

  try {
    const component = await db
      .select()
      .from(components)
      .where(eq(components.id, id))
      .limit(1);

    if (component.length === 0) {
      return c.json({ success: false, error: 'Component not found' }, 404);
    }

    const implWhereCondition = framework
      ? and(
          eq(implementations.componentId, id),
          eq(implementations.framework,   framework)
        )
      : eq(implementations.componentId, id);

    const impls = await db
      .select()
      .from(implementations)
      .where(implWhereCondition);

    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, component[0].categoryId))
      .limit(1);

    return c.json({
      success: true,
      data: {
        ...component[0],
        category:            category[0] ?? null,
        implementations:     impls,
        availableFrameworks: impls.map((i) => i.framework),
      },
    });
  } catch (error) {
    console.error('[GET /components/:id]', error);
    return c.json({ success: false, error: 'Failed to fetch component' }, 500);
  }
});