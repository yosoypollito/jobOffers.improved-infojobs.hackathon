import getOfferById from "@/app/services/getOfferById";
import { NextResponse } from "next/server";

const INITIAL_MESSAGES = [
  {
    role: "system",
    content: `Voy a enviarte descripciones de ofertas laborales, quiero que me extraigas datos de ella utilizando este formato json:
    {
    yearsOfExperience: [yearsOfExperience],
    schedule:[schedule],
    skills:{
    required:[required_skills],
    desirable:[desirable_skills]
    },
    contract:[contract],
    responsabilites:[responsabilities],
    benefits:[benefits],
    culture:[culture]
    }
    donde cada key es:
    yearsOfExperiences: Años de experiencia requeridos debe ser un string ejemplo: " 3+ años" o " 1 año"
    schedule: Horario y/o jornada laboral en caso de ambos ejemplo:  " Horario - Jornada "
    required_skills: Habilidades requeridas por el puesto 
    desirable_skills: Habilidades deseadas aparte de las requeridas por el puesto
    las habilidades Habilidades debe ser un array de string con cada habilidad
    contract: Tipo y/o duracion del contrato debe ser un string ejemplo:  "Indefinido" o "[duracion]"
    responsabilities: Responsabilidades a ejercer trabajando
    benefits: Beneficios
    culture: explicacion cultura de la empresa
    
    Si no logras encontrar algun dato quiero que lo reemplaces con null.`
  }
]

const pkKey = process.env.PK_KEY ?? '';
const pkURL = process.env.PK_URL ?? '';

export async function getOfferInformation({ description, minRequirements }: { description: string; minRequirements: string; }) {
  const res = await fetch(pkURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${pkKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        ...INITIAL_MESSAGES,
        {
          role: "user",
          content: `${minRequirements} ${description}`
        }
      ]
    })
  })

  const data = await res.json();
  console.log({ data });

  const offerInformation = data.choices[0].message?.content ?? '';
  console.log({ offerInformation })


  try {
    const json = JSON.parse(offerInformation)
    console.log({ objeto: json })
    return json;
  } catch (e: any) {
    throw new Error("Cant convert to json")
  }

}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id == null) return new Response("No id provided", { status: 400 })

  try {

    const offer = await getOfferById(id);

    const offerInformation = await getOfferInformation({ description: offer.description, minRequirements: offer.minRequirements });
    console.log({ offerInformation });
    //TODO Add some functionality to save this information to database to make fast access after first time.
    // also handle if description is updated.

    return NextResponse.json({ offerInformation });
  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 400 });
  }
}