import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
    <Head>
      <title>Awards 2021</title>
    </Head>
      <Component {...pageProps} />
    </main>
  )
}
