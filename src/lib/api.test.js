import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  searchCocktailsByName,
  filterCocktailsByIngredient,
  lookupCocktailById,
  getRandomCocktail,
  listIngredients,
} from './api'

const makeFetch = (payload, ok = true) =>
  vi.fn().mockResolvedValue({ ok, json: vi.fn().mockResolvedValue(payload) })

describe('CocktailDB API wrapper', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('searchCocktailsByName returns drinks array', async () => {
    globalThis.fetch = makeFetch({ drinks: [{ idDrink: '1' }] })
    const res = await searchCocktailsByName('margarita')
    expect(res).toEqual([{ idDrink: '1' }])
  })

  it('searchCocktailsByName returns [] when none', async () => {
    globalThis.fetch = makeFetch({ drinks: null })
    const res = await searchCocktailsByName('nope')
    expect(res).toEqual([])
  })

  it('filterCocktailsByIngredient returns drinks array', async () => {
    globalThis.fetch = makeFetch({ drinks: [{ idDrink: '2' }] })
    const res = await filterCocktailsByIngredient('Gin')
    expect(res).toEqual([{ idDrink: '2' }])
  })

  it('lookupCocktailById returns single drink', async () => {
    globalThis.fetch = makeFetch({ drinks: [{ idDrink: '11007' }] })
    const res = await lookupCocktailById('11007')
    expect(res).toEqual({ idDrink: '11007' })
  })

  it('lookupCocktailById returns null when not found', async () => {
    globalThis.fetch = makeFetch({ drinks: [] })
    const res = await lookupCocktailById('999')
    expect(res).toBeNull()
  })

  it('getRandomCocktail returns single drink', async () => {
    globalThis.fetch = makeFetch({ drinks: [{ idDrink: '3' }] })
    const res = await getRandomCocktail()
    expect(res).toEqual({ idDrink: '3' })
  })

  it('listIngredients returns array', async () => {
    globalThis.fetch = makeFetch({ drinks: [{ strIngredient1: 'Gin' }] })
    const res = await listIngredients()
    expect(res).toEqual([{ strIngredient1: 'Gin' }])
  })

  it('returns [] or null on network error', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('network'))

    expect(await searchCocktailsByName('x')).toEqual([])
    expect(await filterCocktailsByIngredient('y')).toEqual([])
    expect(await listIngredients()).toEqual([])
    expect(await lookupCocktailById('1')).toBeNull()
    expect(await getRandomCocktail()).toBeNull()
  })

  it('handles non-OK response gracefully', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false })

    expect(await searchCocktailsByName('x')).toEqual([])
    expect(await filterCocktailsByIngredient('y')).toEqual([])
    expect(await listIngredients()).toEqual([])
    expect(await lookupCocktailById('1')).toBeNull()
    expect(await getRandomCocktail()).toBeNull()
  })
})
