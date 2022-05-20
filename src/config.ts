import type { SiteConfig } from './types'

export default {
  sounds: 'https://sbtn-assets.outv.im/sounds.json',
  categories: 'https://sbtn-assets.outv.im/categories.json',
  assets_path: 'https://sbtn-assets.outv.im/assets/',
  notice: 'https://sbtn-assets.outv.im/notice.json',
} as SiteConfig

export const testingConfig = {
  sounds: 'sounds.json',
  categories: 'categories.json',
  assets_path: 'assets/',
} as SiteConfig
