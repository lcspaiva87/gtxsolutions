type child = {
  childtitle: string
  childlink: string
  childicon: string
}
type singleMegamenu = {
  m_childtitle: string
  m_childlink: string
}
type megamenu = {
  megamenutitle: string
  megamenuicon: string
  singleMegamenu?: singleMegamenu[]
}
export interface Idata {
  title?: string
  icon?: string
  link?: string
  child?: child[]
  megamenu?: megamenu[]
}
/* ================ menuItems=========================== */
export interface MenuItem {
  title: string
  icon?: string
  link?: string
  isHide?: boolean
  badge?: string
  // eslint-disable-next-line no-use-before-define
  child?: childMenuItem[]
  isOpen?: boolean
  isHeadr?: boolean
  // eslint-disable-next-line no-use-before-define
  multi_menu?: MultiMenuItem[]
}

interface MultiMenuItem {
  multiTitle: string
  multiLink: string
}

type childMenuItem = {
  childtitle: string
  childlink: string
  // eslint-disable-next-line no-use-before-define
  multi_menu?: multi_menu[]
}
type multi_menu = {
  multiTitle: string
  multiLink: string
}

/** ===========notifications=========== */

export interface Inotifications {
  title?: string
  desc?: string
  unread?: boolean
  image?: string
  link?: string
}
/** ===========notifications=========== */

export interface Imessage {
  title: string
  desc: string
  active?: boolean
  hasnotifaction?: boolean
  notification_count?: number
  image: string
  link: string
}
/** ===========ItopFilterLists=========== */

export interface ItopFilterLists {
  name: string
  value: string
  icon: string
}
/** ===========IbottomFilterLists=========== */
export interface IbottomFilterLists {
  name: string
  value: string
  icon: string
}
/** ===========Imeets=========== */

export interface Imeets {
  img: string
  title: string
  date: string
  meet: string
}
/** ===========Ifiles=========== */

export interface Ifiles {
  img: string
  title: string
  date: string
}
