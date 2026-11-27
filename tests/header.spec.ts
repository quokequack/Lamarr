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
  expect(startActionBox.x + startActionBox.width).toBeLessThanOrEqual(
    menuBox.x + menuBox.width,
  )
  expect(consoleErrors).toEqual([])

  const evidenceDirectory = process.env.EVIDENCE_DIR
  if (evidenceDirectory) {
    await menu.screenshot({
      path: path.join(evidenceDirectory, 'mobile-menu.png'),
    })
  }

  console.log(
    `mobile menu: ${menuBox.width}x${menuBox.height}; start action: ${startActionBox.width}x${startActionBox.height}`,
  )
})

test('shows arrows around the why use title on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')

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
