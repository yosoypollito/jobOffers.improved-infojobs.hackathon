import { NextResponse } from "next/server";
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';
const infojobsToken = process.env.INFOJOBS_TOKEN ?? '';

const config = new Configuration({
  apiKey: OPENAI_API_KEY
})

const openai = new OpenAIApi(config)
const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
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

export async function getOfferInformation({ description, minRequirements }: { description: string; minRequirements: string; }) {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...INITIAL_MESSAGES,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${minRequirements} ${description}`
      }
    ]
  })

  const data = completion.data.choices[0].message?.content ?? '';

  try {
    const json = JSON.parse(data)
    return NextResponse.json(json);
  } catch (e: any) {
    return new Response("Cant convert to json", { status: 500 })
  }

}

async function getOfferById(id: string) {
  const res = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
    headers: {
      Authorization: `Basic ${infojobsToken}`
    }
  });

  const offer = await res.json();

  return offer
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams)
  const id = searchParams.get('id');

  if (id == null) return new Response("No id provided", { status: 400 })

  const offer = await getOfferById(id);

  const detailedInformation = await getOfferInformation({ description: offer.description, minRequirements: offer.minRequirements });
  console.log({ detailedInformation });

  //  console.log({ offer })

  return NextResponse.json({ offer });
}