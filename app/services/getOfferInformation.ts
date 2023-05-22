export default async function getOfferInformation(id:string){
  try{

  const res = await fetch('/api/offer/'+id);
  
  const offer = res.json();
  
  return offer;
  }catch(err){
    console.log(err);
  }
}