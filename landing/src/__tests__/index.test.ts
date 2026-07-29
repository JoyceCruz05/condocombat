import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Index from '../pages/index.astro'

test('Index page renders all sections', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Index)

  expect(result).toContain('CondoCombat')
  expect(result).toContain('Seu condomínio é um circo?')
  expect(result).toContain('Funcionalidades')
  expect(result).toContain('Por que o CondoCombat?')
  expect(result).toContain('Pronto para organizar')
  expect(result).toContain('2026 CondoCombat')
})

test('Index page has HTML document structure via Layout', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Index)

  expect(result).toContain('<html lang="pt-BR">')
  expect(result).toContain('<body class="min-h-screen bg-slate-50')
})

test('Index page has OG meta tags', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Index)

  expect(result).toContain('ERP da Fofoca')
  expect(result).toContain('og:title')
})
