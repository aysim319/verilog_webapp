import '../../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Login Page'
}
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}