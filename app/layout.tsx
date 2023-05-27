import './globals.css'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin']
})

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
      <body className={`font-sans bg-ij-page-bg`}>{children}</body>
    </html>
  )
}
