
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
