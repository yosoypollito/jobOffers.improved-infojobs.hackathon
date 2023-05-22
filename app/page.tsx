import Image from 'next/image'
import Footer from './Footer'
import NavBar from './NavBar'

export default async function Home() {
  return (
    <div className="grid grid-cols-[1fr] w-full grid-rows-[min-content_1fr_min-content] h-screen">
      <NavBar />
      <main className='flex flex-col justify-center items-center  cols-span-1'>
        Jobs Finder
      </main>
      <Footer />
    </div>
  )
}
