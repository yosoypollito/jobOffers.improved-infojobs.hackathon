export default async function getOfferDetailedInformation(id: string) {
  console.log('Fetched')
  try {
    const res = await fetch('/api/offers/information?id=' + id)
    const detailedInformation = await res.json();

    return detailedInformation
  } catch (err) {
    console.log({ err });
  }
}