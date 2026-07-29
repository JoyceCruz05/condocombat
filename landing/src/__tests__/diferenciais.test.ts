import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Diferenciais from '../components/Diferenciais.astro'

test('Diferenciais renders heading', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Diferenciais)

  expect(result).toContain('Por que o CondoCombat?')
})

test('Diferenciais renders all 3 value props', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Diferenciais)

  expect(result).toContain('Zero Burocracia')
  expect(result).toContain('Tempo Real')
  expect(result).toContain('Síndico Herói')
})

test('Diferenciais renders stats bar', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Diferenciais)

  expect(result).toContain('Fofocas Registradas')
  expect(result).toContain('Síndicos Ativos')
  expect(result).toContain('Condomínios')
  expect(result).toContain('Satisfação')
})

test('Diferenciais has dark background section', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Diferenciais)

  expect(result).toContain('bg-slate-900')
})

test('Diferenciais uses glass-morphism effect on cards', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Diferenciais)

  expect(result).toContain('backdrop-blur')
  expect(result).toContain('bg-white/5')
})
