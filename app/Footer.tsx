"use client"
import Link from "next/link";
import useOffers from "./hook/useOffers";

export default function Footer() {

  const { listOfOffers } = useOffers({});
  console.log({ listOfOffers })
  return (
    <footer className="flex flex-row justify-center p-4 bg-ij-container-bg border-ij-container-border border-t-2">
      <p>
        Creado con <Link href="https://www.infojobs.net/">InfoJobs</Link> y <Link href="https://openai.com/">OpenAi</Link> por <Link href="https://github.com/yosoypollito">Daif</Link>
      </p>
    </footer>
  )
}