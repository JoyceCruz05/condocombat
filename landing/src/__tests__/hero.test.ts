import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Hero from '../components/Hero.astro'

test('Hero renders the satirical headline', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Hero)

  expect(result).toContain('Seu condomínio é um circo?')
  expect(result).toContain('Nós temos o palhaço.')
})

test('Hero renders descriptive paragraph', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Hero)

  expect(result).toContain('ERP que organiza fofocas')
})

test('Hero has CTA buttons', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Hero)

  expect(result).toContain('Começar Agora')
  expect(result).toContain('Saiba Mais')
  expect(result).toContain('app.condocombat.com')
  expect(result).toContain('#recursos')
})

test('Hero has decorative dashboard cards (desktop)', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Hero)

  expect(result).toContain('Rivalidade Ativa')
  expect(result).toContain('Fofoca do Dia')
  expect(result).toContain('Multas Pendentes')
  expect(result).toContain('Próxima Assembleia')
  expect(result).toContain('Caos Geral')
})

test('Hero uses rose accent color for headline highlight', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Hero)

  expect(result).toContain('text-rose-600')
})
