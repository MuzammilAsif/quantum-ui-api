import { Hono } from 'hono';
import { db } from '../db';
import { libraries, categories, components } from '../db/schema';
import { eq, count } from 'drizzle-orm';

export const librariesRouter = new Hono();

// GET /api/libraries
// Returns all active libraries
librariesRouter.get('/', async (c) => {
  try {
    const allLibraries = await db
      .select()
      .from(libraries)
      .where(eq(libraries.isActive, true));

    return c.json({
      success: true,
      data: allLibraries,
      count: allLibraries.length,
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch libraries' }, 500);
  }
});

// GET /api/libraries/:id
// Returns a single library with its categories
librariesRouter.get('/:id', async (c) => {
  const id = c.req.param('id');

  try {
    const library = await db
      .select()
      .from(libraries)
      .where(eq(libraries.id, id))
      .limit(1);

    if (library.length === 0) {
      return c.json({ success: false, error: 'Library not found' }, 404);
    }

    const libCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.libraryId, id))
      .orderBy(categories.order);

    // Get live component counts per category
    const categoriesWithCounts = await Promise.all(
      libCategories.map(async (cat) => {
        const [result] = await db
          .select({ count: count() })
          .from(components)
          .where(eq(components.categoryId, cat.id));

        return { ...cat, componentCount: result?.count ?? 0 };
      })
    );

    return c.json({
      success: true,
      data: {
        ...library[0],
        categories: categoriesWithCounts,
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch library' }, 500);
  }
});

// GET /api/libraries/:id/categories
// Returns just the categories for a library
librariesRouter.get('/:id/categories', async (c) => {
  const id = c.req.param('id');

  try {
    const libCategories = await db
      .select()
      .from(categories)
      .where(eq(categories.libraryId, id))
      .orderBy(categories.order);

    return c.json({
      success: true,
      data: libCategories,
      count: libCategories.length,
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch categories' }, 500);
  }
});