import image from "next/image";
import link from "next/link";

type child ={
  childtitle:string;
  childlink:string;
  childicon:string;
}
type singleMegamenu={
  m_childtitle:string;
  m_childlink:string;

}
type megamenu={
  megamenutitle: string,
  megamenuicon: string,
  singleMegamenu?:singleMegamenu[]
}
export interface Idata{
  title?: string;
  icon?: string;
  link?: string;
  child?: child[];
  megamenu?:megamenu[];

}
/*================ menuItems=========================== */
export interface MenuItem {
  title: string;
  icon?: string;
  link?: string;
  isHide?: boolean;
  badge?: string;
  child?: childMenuItem[];
  isOpen?: boolean;
  isHeadr?: boolean;
  multi_menu?: MultiMenuItem[];
}

interface MultiMenuItem {
  multiTitle: string;
  multiLink: string;
}

type childMenuItem={
  childtitle:string;
  childlink:string;
  multi_menu?:multi_menu[];
}
type multi_menu={
  multiTitle:string;
  multiLink:string;
}

/**===========notifications=========== */

export interface Inotifications{
    title?: string,
    desc?: string,
    unread?: boolean,
    image?: string,
    link?: string,
  }


