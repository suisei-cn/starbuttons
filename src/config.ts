import type { SiteConfig } from './types'

export default {
  sounds: 'https://io.cafe.two.li/suisei-moe/sounds.json',
  categories: 'https://io.cafe.two.li/suisei-moe/categories.json',
  assets_path: 'https://io.cafe.two.li/suisei-moe/assets/',
  notice: 'https://io.cafe.two.li/suisei-moe/notice.json',
} as SiteConfig

export const testingConfig = {
  sounds: 'sounds.json',
  categories: 'categories.json',
  assets_path: 'assets/',
} as SiteConfig
