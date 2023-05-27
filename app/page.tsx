import Footer from './Footer'
import NavBar from './NavBar'
import Filters from './components/Filters';
import LoadingInterfaceBlocker from './components/LoadingInterfaceBlocker';
import ListOfOffers from './components/Offers';
import { getOffers } from './services/getOffers';
import { useOffersStore } from './store';


export default async function Home() {

  const { filters } = useOffersStore.getState();
  const { pagination, offers, facets } = await getOffers(filters);

  return (
    <div className="grid grid-cols-[1fr] w-full grid-rows-[min-content_1fr_min-content]">
      <NavBar />
      <div className='max-w-[1280px] m-auto w-full'>
        <main className='grid grid-cols-[min-content_1fr] justify-start items-start cols-span-1 gap-4 p-2 max-w-[960px]'>

          <Filters facets={facets} />
          <ListOfOffers offers={offers} />
          <LoadingInterfaceBlocker />
        </main>
      </div>
      <Footer />
    </div>
  )
}
