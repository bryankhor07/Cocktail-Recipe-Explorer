/**
 * CocktailDB API wrapper
 * Base URL docs: https://www.thecocktaildb.com/api.php
 */

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

/**
 * Generic GET JSON helper using fetch
 * @param {string} path - Path beginning with '/'
 * @returns {Promise<any|null>} Parsed JSON or null on network/parse errors
 */
async function getJson(path) {
  try {
    const res = await fetch(`${BASE_URL}${path}`)
    if (!res.ok) return null
    return await res.json()
  } catch (err) {
    // Network error or CORS
    return null
  }
}

/**
 * Search cocktails by name.
 * Wraps `/search.php?s=`
 * @param {string} name
 * @returns {Promise<Array>} Array of drinks; empty array if none or on error
 */
export async function searchCocktailsByName(name) {
  const q = encodeURIComponent(name ?? '')
  const data = await getJson(`/search.php?s=${q}`)
  if (!data || !Array.isArray(data.drinks)) return []
  return data.drinks
}

/**
 * Filter cocktails by ingredient.
 * Wraps `/filter.php?i=`
 * @param {string} ingredient
 * @returns {Promise<Array>} Array of drinks (idDrink, strDrink, strDrinkThumb); [] on error/none
 */
export async function filterCocktailsByIngredient(ingredient) {
  const q = encodeURIComponent(ingredient ?? '')
  const data = await getJson(`/filter.php?i=${q}`)
  if (!data || !Array.isArray(data.drinks)) return []
  return data.drinks
}

/**
 * Lookup detailed cocktail by ID.
 * Wraps `/lookup.php?i=`
 * @param {string|number} id
 * @returns {Promise<object|null>} Single drink object or null on error/not found
 */
export async function lookupCocktailById(id) {
  const q = encodeURIComponent(String(id ?? ''))
  const data = await getJson(`/lookup.php?i=${q}`)
  if (!data || !Array.isArray(data.drinks) || data.drinks.length === 0) return null
  return data.drinks[0]
}

/**
 * Get a random cocktail.
 * Wraps `/random.php`
 * @returns {Promise<object|null>} Single drink object or null on error
 */
export async function getRandomCocktail() {
  const data = await getJson('/random.php')
  if (!data || !Array.isArray(data.drinks) || data.drinks.length === 0) return null
  return data.drinks[0]
}

/**
 * List all ingredients.
 * Wraps `/list.php?i=list`
 * @returns {Promise<Array>} Array of ingredients; [] on error/none
 */
export async function listIngredients() {
  const data = await getJson('/list.php?i=list')
  if (!data || !Array.isArray(data.drinks)) return []
  return data.drinks
}

// For testing convenience (non-default export keeps tree-shaking friendly)
export const __TESTING__ = { BASE_URL, getJson }
