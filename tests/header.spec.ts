import { expect, test } from '@playwright/test'
import path from 'node:path'

test('keeps the start action aligned inside the mobile menu', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text())
    }
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
      }
    `,
  })

  const menuButton = page.getByRole('button', { name: 'Abrir menu' })
  await expect(menuButton).toBeVisible()
  await expect(page.locator('.desktop-navigation')).toBeHidden()

  await menuButton.click()

  const menu = page.locator('.header-menu__list')
  const startAction = menu.getByRole('link', { name: 'COMEÇAR' })
  await expect(menu).toBeVisible()
  await expect(startAction).toBeVisible()
  await page.waitForTimeout(250)

  const menuBox = await menu.boundingBox()
  const startActionBox = await startAction.boundingBox()

  if (!menuBox || !startActionBox) {
    throw new Error('Could not measure the mobile menu and start action.')
  }

  expect(startActionBox.x).toBeGreaterThanOrEqual(menuBox.x)
  expect(startActionBox.x + startActionBox.width).toBeLessThanOrEqual(menuBox.x + menuBox.width)
  expect(consoleErrors).toEqual([])

  const evidenceDirectory = process.env.EVIDENCE_DIR
  if (evidenceDirectory) {
    await menu.screenshot({
      path: path.join(evidenceDirectory, 'mobile-menu.png'),
    })
  }

  await startAction.click()
  await expect(page).toHaveURL(/\/trilhas\/nova$/)

  console.log(
    `mobile menu: ${menuBox.width}x${menuBox.height}; start action: ${startActionBox.width}x${startActionBox.height}`,
  )
})

test('shows arrows around the why use title on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')

  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/imgs/logo.ico')

  const arrows = page.locator('.porque-usar__arrow')

  await expect(arrows).toHaveCount(2)
  await expect(arrows.nth(0)).toBeVisible()
  await expect(arrows.nth(1)).toBeVisible()

  const evidenceDirectory = process.env.EVIDENCE_DIR
  if (evidenceDirectory) {
    await page.locator('.porque-usar').screenshot({
      path: path.join(evidenceDirectory, 'porque-usar-desktop.png'),
    })
  }
})

test('redirects unauthenticated users from the trail area to login', async ({ page }) => {
  await page.goto('/trilhas')

  await expect(page).toHaveURL(/\/login\?redirect=\/trilhas$/)
  await expect(page.getByRole('heading', { name: 'Suas trilhas, no seu ritmo.' })).toBeVisible()

  const evidenceDirectory = process.env.EVIDENCE_DIR
  if (evidenceDirectory) {
    await page.screenshot({ path: path.join(evidenceDirectory, 'login-guard.png'), fullPage: true })
  }
})

test('renders the cadastro page with the shared auth layout', async ({ page }) => {
  await page.goto('/cadastro')

  await expect(
    page.getByRole('heading', { name: 'Comece guardando seu próximo passo.' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Já tenho cadastro' })).toBeVisible()

  const evidenceDirectory = process.env.EVIDENCE_DIR
  if (evidenceDirectory) {
    await page.screenshot({
      path: path.join(evidenceDirectory, 'cadastro-layout.png'),
      fullPage: true,
    })
  }
})

test('lets visitors start the questionnaire from the presentation', async ({ page }) => {
  await page.goto('/')

  const startActions = page.locator('.welcome__action, .proposal__action, .steps__action a')
  await expect(startActions).toHaveCount(3)

  const evidenceDirectory = process.env.EVIDENCE_DIR
  if (evidenceDirectory) {
    await page.screenshot({
      path: path.join(evidenceDirectory, 'home-desktop.png'),
      fullPage: true,
    })
  }

  await startActions.first().click()

  await expect(page).toHaveURL(/\/trilhas\/nova$/)
  await expect(page.getByRole('heading', { name: 'Qual é o seu próximo objetivo?' })).toBeVisible()
  await expect(page.getByLabel('O que você quer aprender?')).toBeVisible()
})

test('moves through the presentation anchors', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Como funciona', exact: true }).first().click()

  await expect(page).toHaveURL(/\/#como-usar$/)
  await expect(page.getByRole('heading', { name: 'Do objetivo à próxima sessão.' })).toBeVisible()
})

test('keeps every public start action connected to the questionnaire', async ({ page }) => {
  const startActionSelectors = [
    '.header__start',
    '.welcome__action',
    '.proposal__action',
    '.steps__action a',
  ]

  for (const selector of startActionSelectors) {
    await page.goto('/')
    const startAction = page.locator(selector)

    await expect(startAction).toHaveAttribute('href', '/trilhas/nova')
    await startAction.click()
    await expect(page).toHaveURL(/\/trilhas\/nova$/)
  }
})

test('supports keyboard focus and activation in the mobile menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const menuButton = page.getByRole('button', { name: 'Abrir menu' })
  for (let focusStep = 0; focusStep < 12; focusStep += 1) {
    const menuButtonHasFocus = await menuButton.evaluate(
      (element) => document.activeElement === element,
    )
    if (menuButtonHasFocus) {
      break
    }

    await page.keyboard.press('Tab')
  }

  await expect(menuButton).toBeFocused()

  const focusRing = await menuButton.evaluate((element) => {
    const styles = window.getComputedStyle(element)
    return { outlineStyle: styles.outlineStyle, outlineWidth: parseFloat(styles.outlineWidth) }
  })

  expect(focusRing.outlineStyle).toBe('solid')
  expect(focusRing.outlineWidth).toBeGreaterThanOrEqual(3)

  await page.keyboard.press('Enter')
  const startAction = page.getByRole('link', { name: 'COMEÇAR', exact: true })
  await expect(startAction).toBeVisible()
  await startAction.focus()
  await page.keyboard.press('Enter')

  await expect(page).toHaveURL(/\/trilhas\/nova$/)
})

test('keeps the public page usable on a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Bem-vindos ao Lamarr' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Quem foi Hedy Lamarr?' })).toBeVisible()

  const viewport = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))

  expect(viewport.scrollWidth).toBeLessThanOrEqual(viewport.clientWidth)

  const evidenceDirectory = process.env.EVIDENCE_DIR
  if (evidenceDirectory) {
    await page.screenshot({ path: path.join(evidenceDirectory, 'home-mobile.png'), fullPage: true })
  }
})

test('returns from an unknown path through the shared layout', async ({ page }) => {
  await page.goto('/caminho-que-nao-existe')

  await expect(page.getByRole('heading', { name: 'Página não encontrada.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Voltar para o início', exact: true })).toBeVisible()

  const evidenceDirectory = process.env.EVIDENCE_DIR
  if (evidenceDirectory) {
    await page.screenshot({ path: path.join(evidenceDirectory, 'not-found.png'), fullPage: true })
  }

  await page.getByRole('link', { name: 'Voltar para o início', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Bem-vindos ao Lamarr' })).toBeVisible()
})
