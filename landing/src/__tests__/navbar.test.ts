import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Navbar from '../components/Navbar.astro'

test('Navbar renders the brand name with link', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Navbar)

  expect(result).toContain('CondoCombat')
  expect(result).toContain('href="/"')
})

test('Navbar renders all navigation links', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Navbar)

  expect(result).toContain('Início')
  expect(result).toContain('Recursos')
  expect(result).toContain('Diferenciais')
  expect(result).toContain('Contato')
})

test('Navbar has CTA button', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Navbar)

  expect(result).toContain('Acessar Plataforma')
  expect(result).toContain('app.condocombat.com')
})

test('Navbar has sticky header with backdrop blur', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Navbar)

  expect(result).toContain('sticky')
  expect(result).toContain('backdrop-blur')
})

test('Navbar has mobile hamburger menu', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Navbar)

  expect(result).toContain('<details')
  expect(result).toContain('Abrir menu')
})

test('Navbar uses aria-label for navigation', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Navbar)

  expect(result).toContain('aria-label="Navegação principal"')
})

test('Navbar uses environment variable for CTA URL if provided', async () => {
  import.meta.env.PUBLIC_APP_URL = 'https://custom-app.netlify.app'
  const container = await AstroContainer.create()
  const result = await container.renderToString(Navbar)

  expect(result).toContain('Acessar Plataforma')
  expect(result).toContain('https://custom-app.netlify.app')

  // Cleanup
  delete import.meta.env.PUBLIC_APP_URL
})

