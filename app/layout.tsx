import './globals.css'

export const metadata = {
  title: 'Ofertas de trabajo infojobs por Daif',
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
