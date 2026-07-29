import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import CTA from '../components/CTA.astro'

test('CTA renders headline', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(CTA)

  expect(result).toContain('Pronto para organizar o caos do seu condomínio?')
})

test('CTA renders subtext', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(CTA)

  expect(result).toContain('Comece grátis')
})

test('CTA has primary button', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(CTA)

  expect(result).toContain('Quero Começar')
  expect(result).toContain('app.condocombat.com')
})

test('CTA has outline secondary button', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(CTA)

  expect(result).toContain('Ver Demonstração')
})

test('CTA uses gradient background', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(CTA)

  expect(result).toContain('bg-gradient-to-br')
  expect(result).toContain('from-rose-600')
})
