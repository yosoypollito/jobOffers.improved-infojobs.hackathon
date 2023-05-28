## Buscador de ofertas “mejorado” - Hackathon InfoJobs
* Hecho por Daif para la Hackathon de MiduDev junto infojobs
* [Despliegue](https://infojobs.daif.one/)

#### Razon
Como estoy en busqueda laboral activa, estoy cansado de leer distintas descripciones enormes sobre ofertas laborales y justo quise solucionar esto intentando recopilar la mayor cantidad de informacion sobre la oferta 😀

#### Apariencia
Re-creacion de interfaz añadiendo mas informacion y funcionalidad, Basandome lo mas posible en el figma (Gracias por el figma)

#### Funcionalidad añadida || Solución a problema
Utilizando IA se muestra mas informacion sacada desde la descripcion y requisitos minimos de la oferta, como utilizar IA suele dar tiempos largos de respuesta decidi utilizar upstash (redis) para cachear informacion y mejorar el tiempo de respuesta de futuras peticiones (+94%), como tambien optimizar el uso de la IA


#### Stack
* Next.js 13 (App directory)
* Chat-GPT 3
* [InfoJobs Api](https://developer.infojobs.net/)
* [Upstash (redis)](https://upstash.com/)

#### Participantes
* Yo, Daif

> #### Empece 5 dias tarde tuve problemas de luz y net, queria perfeccionar mas todo 🥲

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
