import Footer from './Footer'
import NavBar from './NavBar'
import ListOfOffers from './components/Offers';
import getOffers from './services/getOffers'

export default async function Home() {
  const { offers } = await getOffers('React');
  return (
    <div className="grid grid-cols-[1fr] w-full grid-rows-[min-content_1fr_min-content] h-screen">
      <NavBar />
      <main className='flex flex-row justify-start items-center cols-span-1 gap-4 p-2'>
        <div>
          filters
        </div>
        <ListOfOffers offers={offers} />

      </main>
      <Footer />
    </div>
  )
}
