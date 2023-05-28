"use client"
import useOffers from "./hook/useOffers";
import { HTMLProps } from "react";

const FooterLink = (props: HTMLProps<HTMLAnchorElement>) => {

  return (
    <a className="underline text-primary" {...props}>
      {props.children}
    </a>
  )
}

export default function Footer() {

  return (
    <footer className="flex flex-row justify-center p-4 bg-ij-container-bg border-ij-container-border border-t-2 text-gray text-sm sm:text-base">
      <p>
        Creado con <FooterLink href="https://www.infojobs.net/" target="_blank">InfoJobs</FooterLink> y <FooterLink href="https://openai.com/" target="_blank">OpenAi</FooterLink> por <FooterLink href="https://github.com/yosoypollito" target="_blank">Daif</FooterLink>
      </p>
    </footer>
  )
}