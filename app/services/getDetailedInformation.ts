const INITIAL_MESSAGES = [
  {
    role: "system",
    content: `Voy a enviarte descripciones de ofertas laborales, quiero que me extraigas datos de ella utilizando este formato json:
    {
    "yearsOfExperience": [yearsOfExperience],
    "salary":[salary],
    "schedule":[schedule],
    "requiredSkills":[required_skills],
    "desirableSkills":[desirable_skills],
    "contract":[contract],
    "responsabilities":[responsabilities],
    "benefits":[benefits],
    "culture":[culture]
    }
    
    Valor por defecto: ""
    Evitar valores como: No definido, No encontrado, no especificado etc..
    El nombre de cada Key debe ser un string con comillas dobles.
    
    Donde cada key del json es:
    yearsOfExperience: Años de experiencia requeridos debe ser un string ejemplo: "3+ años" o " 1 año"
    salary: Rango salarial de la oferta debe ser un string ejemplo: "36.000€ - 40.000€ Bruto/año"
    schedule: Horario y/o jornada laboral en caso de ambos ejemplo:  " Horario - Jornada "
    requiredSkills: Habilidades requeridas por el puesto 
    desirableSkills: Habilidades deseadas aparte de las requeridas por el puesto
    las habilidades Habilidades debe ser un array de string con cada habilidad
    contract: Tipo y/o duracion del contrato debe ser un string ejemplo:  "Indefinido" o "duracion"
    responsabilities: Responsabilidades a ejercer trabajando [ "crear interfaces", "implementar apis" ]
    benefits: Beneficios por ejemplo [ "salario competitivo" ]
    culture: explicacion cultura de la empresa
    `
  }
]

const pkKey = process.env.PK_KEY ?? '';
const pkURL = process.env.PK_URL ?? '';
const pkInfoURL = process.env.PK_INFO_URL ?? '';

export default async function getDetailedInformation(text: string) {
  const fetchJsonFromAI = async () => {

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
            content: `${text}`
          }
        ]
      })
    })
    return await res.json();
  }

  let data = await fetchJsonFromAI();
  console.log(data)

  if (data.error && data.error.message.includes(`Your API key is not allowed to be used from this IP address`)) {

    console.log('No ip allowed')
    // This handle reset of ip connection cause proxy we are using for chat-gpt doesnt allow use more than 1 ip
    // but using vercel makes this not possible to use in production
    const verifyInfo = await fetch(`${pkInfoURL}/resetip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${pkKey}`
      }
    });
    const info = await verifyInfo.json();
    console.log('Ip reseted')

    data = await fetchJsonFromAI();
  }
  console.log({ data });

  const offerInformation = data.choices[0].message?.content.toString() ?? '';
  console.log({ offerInformation })


  try {
    const json = JSON.parse(offerInformation.replaceAll("\n' +", '').replaceAll("'", ""))
    console.log({ objeto: json })
    return json;
  } catch (e) {
    //TODO handle error
    console.log('Error parsing json');
    return {};
  }
}