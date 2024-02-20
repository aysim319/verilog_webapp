import '../../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home Page'
}
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}