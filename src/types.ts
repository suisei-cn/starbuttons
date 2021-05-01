export interface SiteConfig {
  sounds: string
  categories: string
  assets_path: string
  notice: string
}

export interface NameWithL10n {
  name: string
  name_l10n?: { [key: string]: string }
  order?: number
}

export interface Sound extends NameWithL10n {
  file: string | string[]
  type: string
  category?: string | string[]
}

export interface Categories {
  [slug: string]: NameWithL10n
}

export interface SoundCategory {
  slug: string
  sounds: Sound[]
}

export interface CategorizedSounds {
  [slug: string]: Sound[]
}

export interface ErrorObject {
  html: string
  slug: string
  defaultTime: number
}

export type ErrorFormatter = (name: string, time?: number) => void

export interface ButtonItem {
  title: string
  audios: string[]
}

export enum MsgStatus {
  PENDING = 1,
  RESOLVED = 2,
  REJECTED = 3,
}

export enum AudioStatus {
  PENDING = 1,
  RESOLVED = 2,
  REJECTED = 3,
  WAITING_FOR_INPUT = 4,
}
