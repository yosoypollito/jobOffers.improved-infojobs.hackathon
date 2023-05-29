import getOfferById from "@/app/services/getOfferById";
import { NextResponse } from "next/server";

import { Redis } from "@upstash/redis";
import getDetailedInformation from "@/app/services/getDetailedInformation";


const redis = Redis.fromEnv({
  retry: {
    retries: 5,
    backoff: (retryCount) => Math.exp(retryCount) * 500
  }
});
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id == null) return new Response("No id provided", { status: 400 })

  try {

    const offer = await getOfferById(id);

    const offerFromRedis = await redis.get(`offer.detailedInformation.${id}`)

    let detailedInformation = offerFromRedis || {};

    if (!offerFromRedis || Object.keys(offerFromRedis).length === 0) {

      const toMerge: { [key: string]: any } = {
        minRequirementInformation: {},
        descriptionInformation: {}
      }


      if (offer.minRequirements) toMerge.minRequirementInformation = await getDetailedInformation(offer.minRequirements);
      if (offer.description) toMerge.descriptionInformation = await getDetailedInformation(offer.description);
      console.log({ toMerge });
      //TODO Add some functionality to save this information to database to make fast access after first time.
      // also handle if description is updated.
      // 
      const offerInformation: { [key: string]: string | Array<string> } = {
        yearsOfExperience: '',
        schedule: '',
        requiredSkills: [],
        desirableSkills: [],
        contract: '',
        responsabilities: [],
        benefits: [],
        culture: '',
        salary: ''
      }

      Object.keys(offerInformation).forEach((key: any) => {
        offerInformation[key] = toMerge.descriptionInformation[key] ? toMerge.descriptionInformation[key] : toMerge.minRequirementInformation[key]
      })

      await redis.set(`offer.detailedInformation.${id}`, { ...offerInformation });
      detailedInformation = offerInformation;
    }

    if (Object.keys(detailedInformation).length === 0) {
      return new Response("Information not found, please try again", { status: 404 })
    }

    return NextResponse.json({ offerInformation: detailedInformation });

  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 400 });
  }
}