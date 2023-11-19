import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '...',
    default: '...',
    absolute: '...',
  },
}
export default function Head() {
  return (
    <>
      <link rel="icon" href="/favicon.svg" />
      <title>Dashcode - Next js </title>
    </>
  )
}
