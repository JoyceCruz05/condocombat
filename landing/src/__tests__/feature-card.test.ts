import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import FeatureCard from '../components/FeatureCard.astro'

test('FeatureCard renders icon, title, and description', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(FeatureCard, {
    props: { icon: '🔥', title: 'Teste', description: 'Descrição' },
  })

  expect(result).toContain('🔥')
  expect(result).toContain('Teste')
  expect(result).toContain('Descrição')
})

test('FeatureCard has aria-hidden on decorative icon', async () => {
  const container = await AstroContainer.create()
  const result = await container.renderToString(FeatureCard, {
    props: { icon: '📊', title: 'Stats', description: 'Data' },
  })

  expect(result).toContain('aria-hidden="true"')
})
