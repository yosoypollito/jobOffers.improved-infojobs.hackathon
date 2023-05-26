export default async function getOfferDetailedInformation(id: string) {
  console.log('Fetched')
  try {
    const res = await fetch('/api/offers/information?id=' + id)
    const { offerInformation } = await res.json();

    return offerInformation
  } catch (err) {
    console.log({ err });
    return null;
  }
}