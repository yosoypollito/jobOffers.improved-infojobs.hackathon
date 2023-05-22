import IJLink from "./components/IJLink";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-center p-4 bg-ij-container-bg border-ij-container-border border-t-2">
      <p>
        Creado con <IJLink href="https://www.infojobs.net/">InfoJobs</IJLink> y <IJLink href="https://openai.com/">OpenAi</IJLink> por <IJLink href="https://github.com/yosoypollito">Daif</IJLink>
      </p>
    </footer>
  )
}