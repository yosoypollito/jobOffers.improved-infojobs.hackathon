import Image from "next/image"
export default function NoOffersFound() {
  return (
    <div className="flex flex-row items-center p-6 bg-white gap-2">
      <Image className="max-w-full max-h-full" src="/lookingFor.svg" width={159} height={200} alt="Ofertas no encontradas" />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Ningún resultado a la vista</h1>
        <p>
          ¡No pasa nada! Comprueba que esté bien escrito, usa otras palabras o revisa los filtros.
        </p>
      </div>
    </div>
  )
}