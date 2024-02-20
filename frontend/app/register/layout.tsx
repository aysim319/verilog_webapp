import '../../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Done Page'
}
export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}