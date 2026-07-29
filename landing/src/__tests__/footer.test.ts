import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Footer from '../components/Footer.astro'

test('Footer renders brand name', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Footer)

  expect(result).toContain('CondoCombat')
})

test('Footer renders quick links', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Footer)

  expect(result).toContain('Início')
  expect(result).toContain('Recursos')
  expect(result).toContain('Diferenciais')
  expect(result).toContain('Contato')
})

test('Footer renders legal links', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Footer)

  expect(result).toContain('Política de Privacidade')
  expect(result).toContain('Termos de Uso')
})

test('Footer has copyright', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Footer)

  expect(result).toContain('2026 CondoCombat')
})

test('Footer links have hover rose accent', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Footer)

  expect(result).toContain('hover:text-rose-400')
})
