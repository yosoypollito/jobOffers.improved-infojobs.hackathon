## Buscador de ofertas “mejorado” - Hackathon InfoJobs
* Hecho por [Daif](https://github.com/yosoypollito) para la Hackathon de [midudev](https://www.youtube.com/@midudev) junto [infojobs](https://infojobs.net)
* [Despliegue](https://infojobs.daif.one)

#### Razón
Como estoy en búsqueda laboral activa, estoy cansado de leer distintas descripciones enormes sobre ofertas laborales y justo quise solucionar esto intentando recopilar la mayor cantidad de información sobre la oferta 😀

#### Apariencia
Recreación de interfaz añadiendo más información y funcionalidad, Basándome lo más posible en el Figma (Gracias por el Figma)

#### Funcionalidad añadida || Solución a problema
Utilizando IA se muestra más información sacada desde la descripción y requisitos mínimos de la oferta, como utilizar IA suele dar tiempos largos de respuesta, decidí utilizar upstash (redis) para cachear información y mejorar el tiempo de respuesta de futuras peticiones (+94%), y optimizar el uso de la IA


#### Stack
* [Next.js 13](https://nextjs.org/) (App directory)
* [Tailwind CSS](https://tailwindcss.com/)
* [Zustand](https://github.com/pmndrs/zustand)
* [Chat-GPT (Open AI)](https://openai.com/)
* [InfoJobs Api](https://developer.infojobs.net/)
* [Upstash (redis)](https://upstash.com/)

#### Participantes
* [Yo, Daif](https://github.com/yosoypollito)

> #### Empecé 5 días tarde, tuve problemas de luz y net, quería perfeccionar más todo 🥲

## Inicializar Proyecto

Ejecutar servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador.
