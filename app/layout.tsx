import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ofertas de trabajo | Daif',
  description: 'Version mejorada para buscar ofertas de trabajo en InfoJobs, Creado con InfoJobs y OpenAi por Daif',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-ij-page-bg`}>{children}</body>
    </html>
  )
}
