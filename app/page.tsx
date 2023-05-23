import Image from 'next/image'
import Footer from './Footer'
import NavBar from './NavBar'
import getOffers from './services/getOffers'
import JobCard from './components/JobCard';

export default async function Home() {
  const { offers } = await getOffers('React');
  console.log({ offers })
  console.log({ fisrt: offers[0] })
  return (
    <div className="grid grid-cols-[1fr] w-full grid-rows-[min-content_1fr_min-content] h-screen">
      <NavBar />
      <main className='flex flex-row justify-start items-center cols-span-1 gap-4 p-2'>
        <div>
          filters
        </div>
        <div className='flex flex-col w-full gap-4 flex-1 max-w-[728px]'>
          {offers.map(offer => <JobCard key={offer.id} {...offer} />)}
        </div>
      </main>
      <Footer />
    </div>
  )
}
