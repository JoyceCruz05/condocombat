import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Features from '../components/Features.astro'

test('Features renders section heading', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Features)

  expect(result).toContain('Funcionalidades que vão além do regulamento')
})

test('Features renders all 6 feature cards', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Features)

  expect(result).toContain('Painel de Fofocas')
  expect(result).toContain('Mapa de Rivalidades')
  expect(result).toContain('Métricas do Caos')
  expect(result).toContain('Modo Fofoqueiro')
  expect(result).toContain('Ranking da Bagunça')
  expect(result).toContain('Alertas de Treta')
})

test('Features section has id="recursos"', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Features)

  expect(result).toContain('id="recursos"')
})

test('Features has responsive grid', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Features)

  expect(result).toContain('grid')
  expect(result).toContain('md:grid-cols-2')
  expect(result).toContain('lg:grid-cols-3')
})
