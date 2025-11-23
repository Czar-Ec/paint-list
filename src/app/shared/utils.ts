/**
 * Find the category for a given value based on lookup data.
 * @param lookupData Array of objects mapping category -> array of values
 * @param value The string to search for
 * @returns The category name if found, otherwise null
 */
export function findCategory(
  lookupData: Array<Record<string, string[]>>,
  value: string
): string | null {
  // Build a quick lookup map: category -> Set of values
  const lookup: Record<string, Set<string>> = {};

  for (const obj of lookupData) {
    const key = Object.keys(obj)[0];
    lookup[key] = new Set(obj[key]);
  }

  // Search the value in all categories
  for (const [category, set] of Object.entries(lookup)) {
    if (set.has(value)) {
      return category;
    }
  }

  return null;
}