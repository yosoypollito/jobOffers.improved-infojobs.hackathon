import Footer from './Footer'
import NavBar from './NavBar'
import Filters from './components/Filters';
import InfoAndAction from './components/InfoAndAction';
import LoadingInterfaceBlocker from './components/LoadingInterfaceBlocker';
import ListOfOffers from './components/Offers';
import Pagination from './components/Pagination';
import { getOffers } from './services/getOffers';
import { useOffersStore } from './store';

export const revalidate = 60;

export default async function Home() {

  const { filters } = useOffersStore.getState();
  const { pagination, offers, facets } = await getOffers(filters);

  return (
    <div className="grid grid-cols-[1fr] w-full grid-rows-[min-content_1fr_min-content]">
      <NavBar />
      <div className='max-w-[1280px] m-auto w-full'>
        <main className='grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] justify-start items-start cols-span-1 gap-4 p-2 max-w-[960px]'>

          <InfoAndAction />

          <Filters facets={facets} />
          <div className='col-span-2 md:col-span-1'>
            <ListOfOffers offers={offers} />
            <Pagination pagination={pagination} />
          </div>
          <LoadingInterfaceBlocker />
        </main>
      </div>
      <Footer />
    </div>
  )
}
