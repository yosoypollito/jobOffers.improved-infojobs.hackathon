export default async function getOfferDetailedInformation(id: string) {
  console.log('Fetched')
  try {
    const res = await fetch('/api/offers/information?id=' + id)
    const { offerInformation } = await res.json();

    console.log({ offerInformation })

    return offerInformation
  } catch (err) {
    return null;
    console.log({ err });
  }
}