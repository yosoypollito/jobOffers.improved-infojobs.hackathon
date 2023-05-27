import { getOffers } from "@/app/services/getOffers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filters = Object.fromEntries(searchParams);

  const offers = await getOffers(filters);

  return NextResponse.json(offers);
}