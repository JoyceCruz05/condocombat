import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Layout from '../layouts/Layout.astro'

test('Layout renders full HTML document', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Layout, {
    props: { title: 'Test Title', description: 'Test Description' },
    slots: { default: '<p>Content</p>' },
  })

  expect(result).toContain('<html lang="pt-BR">')
  expect(result).toContain('<title>Test Title</title>')
  expect(result).toContain('<meta name="description" content="Test Description">')
  expect(result).toContain('<p>Content</p>')
})

test('Layout uses default title when no prop provided', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Layout, {
    slots: { default: '<p>Hello</p>' },
  })

  expect(result).toContain('<title>CondoCombat</title>')
})

test('Layout includes OG meta tags', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Layout, {
    props: { title: 'OG Test' },
    slots: { default: '' },
  })

  expect(result).toContain('<meta property="og:title" content="OG Test">')
  expect(result).toContain('<meta property="og:type" content="website">')
})

test('Layout includes Inter font preconnect', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(Layout, {
    slots: { default: '' },
  })

  expect(result).toContain('fonts.googleapis.com')
  expect(result).toContain('fonts.gstatic.com')
  expect(result).toContain('family=Inter')
})
