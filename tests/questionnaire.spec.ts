import { expect, test } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'
import path from 'node:path'

async function tabTo(page: Page, target: Locator) {
  for (let step = 0; step < 60; step += 1) {
    const hasFocus = await target.evaluate((element) => document.activeElement === element)
    if (hasFocus) {
      return
    }

    await page.keyboard.press('Tab')
  }

  await expect(target).toBeFocused()
}

async function measureStatusContrast(status: Locator) {
  return status.evaluate((alert) => {
    function parseColor(color: string) {
      return color.match(/[\d.]+/g)!.map(Number)
    }

    function blend(foreground: number[], background: number[], opacity = foreground[3] ?? 1) {
      return background.map(
        (channel, index) => foreground[index] * opacity + channel * (1 - opacity),
      )
    }

    function luminance(color: number[]) {
      const channels = color.map((channel) => {
        const value = channel / 255
        if (value <= 0.04045) {
          return value / 12.92
        }

        return ((value + 0.055) / 1.055) ** 2.4
      })
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
    }

    const application = document.querySelector('.v-application')!
    const shell = alert.closest('.questionnaire-shell')!
    const underlay = alert.querySelector('.v-alert__underlay')!
    const applicationBackground = parseColor(getComputedStyle(application).backgroundColor).slice(
      0,
      3,
    )
    const shellBackground = blend(
      parseColor(getComputedStyle(shell).backgroundColor),
      applicationBackground,
    )
    const alertBackground = blend(
      parseColor(getComputedStyle(underlay).backgroundColor),
      shellBackground,
      Number(getComputedStyle(underlay).opacity),
    )
    const foreground = blend(parseColor(getComputedStyle(alert).color), alertBackground)
    const light = Math.max(luminance(foreground), luminance(alertBackground))
    const dark = Math.min(luminance(foreground), luminance(alertBackground))
    return (light + 0.05) / (dark + 0.05)
  })
}

test('preserves custom answers through navigation, reload, and review', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/trilhas/nova')
  await page.getByRole('textbox', { name: 'Seu nome', exact: true }).fill('Olive')
  await page.getByRole('textbox', { name: 'Seu email', exact: true }).fill('olive@example.com')
  await page.getByRole('textbox', { name: 'O que você quer aprender?' }).fill('TypeScript')
  await page.getByRole('radio', { name: 'Nunca tive contato', exact: true }).check()
  await page.getByRole('radio', { name: 'Começar do zero', exact: true }).check()
  await page.getByLabel('Data de início', { exact: true }).fill('2099-01-01')
  await page.getByRole('spinbutton', { name: 'Horas por dia', exact: true }).fill('0.5')
  await page.getByRole('checkbox', { name: 'Computador', exact: true }).check()
  await page.getByRole('checkbox', { name: 'Outro recurso', exact: true }).check()
  await page
    .getByRole('textbox', { name: 'Descreva o outro recurso', exact: true })
    .fill('Laboratório')
  await page.getByRole('radio', { name: 'Equilibrada', exact: true }).check()
  await page.getByRole('radio', { name: 'Não', exact: true }).check()
  await page.getByRole('radio', { name: 'Gratuitos', exact: true }).check()
  await page.getByRole('button', { name: 'Avançar para preferências' }).click()
  await expect(page.getByRole('heading', { name: 'Preferências de estudo' })).toBeFocused()

  await page.getByRole('button', { name: 'Voltar', exact: true }).click()
  await expect(page.getByRole('checkbox', { name: 'Outro recurso', exact: true })).toBeChecked()
  await expect(
    page.getByRole('textbox', { name: 'Descreva o outro recurso', exact: true }),
  ).toHaveValue('Laboratório')
  await page.getByRole('textbox', { name: 'Seu nome', exact: true }).fill('Olive revisado')
  await page.reload()
  await expect(page.getByRole('checkbox', { name: 'Outro recurso', exact: true })).toBeChecked()
  await expect(
    page.getByRole('textbox', { name: 'Descreva o outro recurso', exact: true }),
  ).toHaveValue('Laboratório')
  await page.getByRole('button', { name: 'Avançar para preferências' }).click()

  await page
    .getByRole('textbox', { name: 'Como você costuma organizar suas ideias?' })
    .press('Enter')
  await page.getByRole('option', { name: 'Outro jeito', exact: true }).click()
  await page.getByRole('radio', { name: 'Não', exact: true }).check()
  await page.getByRole('checkbox', { name: 'Outro método', exact: true }).check()
  await page.getByRole('radio', { name: 'Noite', exact: true }).check()
  await page.getByRole('radio', { name: 'Outro tipo de projeto', exact: true }).check()
  await page.getByRole('button', { name: 'Revisar respostas' }).click()
  await expect(page.getByRole('heading', { name: 'Preferências de estudo' })).toBeVisible()
  await expect(
    page.getByText('Descreva como você organiza suas ideias.', { exact: true }).first(),
  ).toBeVisible()
  await expect(
    page.getByText('Descreva o outro tipo de projeto.', { exact: true }).first(),
  ).toBeVisible()

  await page
    .getByRole('textbox', { name: 'Descreva como você organiza suas ideias' })
    .fill('Quadro')
  await page.getByRole('textbox', { name: 'Descreva seu outro método' }).fill('Ensinar')
  await page.getByRole('textbox', { name: 'Descreva o outro tipo de projeto' }).fill('Em grupo')
  await page.getByRole('button', { name: 'Revisar respostas' }).click()
  await expect(page.getByRole('heading', { name: 'Revise suas respostas' })).toBeVisible()
  await expect(page.getByText('computer, Laboratório', { exact: true })).toBeVisible()
  await expect(page.getByText('6 horas', { exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Editar preferências', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Descreva seu outro método' })).toHaveValue(
    'Ensinar',
  )
  await page.getByRole('button', { name: 'Revisar respostas' }).click()
  await page.getByRole('button', { name: 'Confirmar e preparar geração' }).click()
  await expect(page.getByRole('status')).toContainText('Respostas confirmadas')
  expect(await measureStatusContrast(page.getByRole('status'))).toBeGreaterThanOrEqual(4.5)
  await page.setViewportSize({ width: 390, height: 844 })
  const layout = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
    shell: document.querySelector('.questionnaire-shell')!.getBoundingClientRect().right,
  }))
  expect(layout.content).toBeLessThanOrEqual(layout.viewport)
  expect(layout.shell).toBeLessThanOrEqual(layout.viewport)
  expect(errors).toEqual([])
})

test('completes and edits the questionnaire using only the keyboard', async ({ page }) => {
  await page.goto('/trilhas/nova')
  const name = page.getByRole('textbox', { name: 'Seu nome', exact: true })
  await tabTo(page, name)
  const focusRing = await name.evaluate((element) => {
    const style = getComputedStyle(element.closest('.v-field')!)
    return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) }
  })
  expect(focusRing.style).toBe('solid')
  expect(focusRing.width).toBeGreaterThanOrEqual(3)
  const evidenceDirectory = process.env.EVIDENCE_DIR
  if (evidenceDirectory) {
    await name.scrollIntoViewIfNeeded()
    await page.screenshot({
      path: path.join(evidenceDirectory, 'questionnaire-keyboard-focus.png'),
    })
  }
  await page.keyboard.type('Olive')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('textbox', { name: 'Seu email', exact: true })).toBeFocused()
  await page.keyboard.type('olive@example.com')
  await page.keyboard.press('Tab')
  await page.keyboard.type('TypeScript')
  await tabTo(page, page.getByRole('radio', { name: 'Nunca tive contato', exact: true }))
  await page.keyboard.press('Space')
  await tabTo(page, page.getByRole('radio', { name: 'Começar do zero', exact: true }))
  await page.keyboard.press('Space')

  await tabTo(page, page.getByRole('textbox', { name: 'Unidade do prazo', exact: true }))
  await page.keyboard.press('Enter')
  await expect(page.getByRole('listbox')).toBeVisible()
  await page.keyboard.press('Escape')
  await tabTo(page, page.getByRole('checkbox', { name: 'Livros', exact: true }))
  await page.keyboard.press('Space')
  await tabTo(page, page.getByRole('radio', { name: 'Mais prática', exact: true }))
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('radio', { name: 'Equilibrada', exact: true })).toBeChecked()
  await tabTo(page, page.getByRole('radio', { name: 'Sim', exact: true }))
  await page.keyboard.press('ArrowDown')
  await tabTo(page, page.getByRole('radio', { name: 'Gratuitos', exact: true }))
  await page.keyboard.press('Space')
  await tabTo(page, page.getByRole('button', { name: 'Avançar para preferências' }))
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Preferências de estudo' })).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('textbox', { name: 'Como você costuma organizar suas ideias?' }),
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('listbox')).toBeVisible()
  await page.keyboard.press('Home')
  await expect(page.getByRole('option', { name: 'Anotações simples', exact: true })).toBeFocused()
  await page.keyboard.press('Enter')
  await tabTo(page, page.getByRole('radio', { name: 'Sim', exact: true }))
  await page.keyboard.press('ArrowDown')
  await tabTo(page, page.getByRole('checkbox', { name: 'Lendo', exact: true }))
  await page.keyboard.press('Space')
  await tabTo(page, page.getByRole('radio', { name: 'Manhã', exact: true }))
  await page.keyboard.press('Space')
  await tabTo(page, page.getByRole('radio', { name: 'Lógica e análise de dados', exact: true }))
  await page.keyboard.press('Space')
  await tabTo(page, page.getByRole('button', { name: 'Revisar respostas' }))
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Revisão', exact: true })).toBeFocused()

  await tabTo(page, page.getByRole('button', { name: 'Editar objetivos', exact: true }).first())
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Objetivos e disponibilidade' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(name).toBeFocused()
  await tabTo(page, page.getByRole('button', { name: 'Avançar para preferências' }))
  await page.keyboard.press('Enter')
  await tabTo(page, page.getByRole('button', { name: 'Revisar respostas' }))
  await page.keyboard.press('Enter')
  await tabTo(page, page.getByRole('button', { name: 'Confirmar e preparar geração' }))
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toContainText('Respostas confirmadas')

  if (evidenceDirectory) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({
      path: path.join(evidenceDirectory, 'questionnaire-keyboard-confirmed.png'),
      fullPage: true,
    })
  }
})
