export default async function getOffers() {

  try {
    const res = await fetch('/api/offers');
    const offers = await res.json();

    return offers;
  } catch (e) {
    return [];
  }
}