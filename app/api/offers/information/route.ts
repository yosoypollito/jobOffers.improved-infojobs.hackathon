import { NextResponse } from "next/server";

const infojobsToken = process.env.INFOJOBS_TOKEN ?? ''

async function getOfferById(id:string){
  const res = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
    headers:{
    Authorization: `Basic ${infojobsToken}`
    }
  });

  const offer = await res.json();
  
  return offer 
}

export async function GET(request:Request){
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if(id == null) return new Response("No id provided", { status:400 })
  
  const offer = await getOfferById(id);
  
  console.log({offer})

  return NextResponse.json({offer});
}