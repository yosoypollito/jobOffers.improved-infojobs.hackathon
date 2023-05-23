const infojobsUrl = process.env.INFOJOBS_API_URL ?? '';
const infojobsToken = process.env.INFOJOBS_TOKEN ?? ''

export default async function getOfferById(id: string) {
  const res = await fetch(`${infojobsUrl}offer/${id}`, {
    headers: {
      Authorization: `Basic ${infojobsToken}`
    }
  });
  const offer = await res.json();
  return offer;
}