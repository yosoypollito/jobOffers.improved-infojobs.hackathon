import Footer from './Footer'
import NavBar from './NavBar'
import Filters from './components/Filters';
import ListOfOffers from './components/Offers';
import getOffers from './services/getOffers'
import { useOffersStore } from './store';

export default async function Home() {

  const { filters, fetchOffers } = useOffersStore.getState();
  await fetchOffers(filters);
  const { listOfOffers, facets } = useOffersStore.getState();

  return (
    <div className="grid grid-cols-[1fr] w-full grid-rows-[min-content_1fr_min-content]">
      <NavBar />
      <main className='grid grid-cols-[min-content_1fr] justify-start items-start cols-span-1 gap-4 p-2'>
        <Filters facets={facets} />
        <ListOfOffers offers={listOfOffers} />

      </main>
      <Footer />
    </div>
  )
}
