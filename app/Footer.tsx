import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-center p-4 bg-ij-container-bg border-ij-container-border border-t-2">
      <p>
        Creado con <Link href="https://www.infojobs.net/">InfoJobs</Link> y <Link href="https://openai.com/">OpenAi</Link> por <Link href="https://github.com/yosoypollito">Daif</Link>
      </p>
    </footer>
  )
}