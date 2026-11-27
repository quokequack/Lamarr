import { vi } from 'vitest'

// jsdom has no layout observer; Playwright exercises Vuetify's layout in Chromium.
vi.stubGlobal(
  'ResizeObserver',
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)
