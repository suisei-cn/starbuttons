import type { SiteConfig } from './types'

export default {
  sounds: 'https://didjcksqhgjn7.cloudfront.net/sounds.json',
  categories: 'https://didjcksqhgjn7.cloudfront.net/categories.json',
  assets_path: 'https://didjcksqhgjn7.cloudfront.net/assets/',
  notice: 'https://didjcksqhgjn7.cloudfront.net/notice.json',
} as SiteConfig

export const testingConfig = {
  sounds: 'sounds.json',
  categories: 'categories.json',
  assets_path: 'assets/',
} as SiteConfig
