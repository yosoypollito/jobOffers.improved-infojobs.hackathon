"use client"
import Image from "next/image";
import { ClientJobOffer, JobOffer } from "../services/getOffers";
import { formatDate } from "../utils";
import Link from "next/link";
import Skills from "./Skills";
import List from "./List";
import ListItem from "./ListItem";
import Badge from "./Badge";
import DetailedInformation from "./DetailedInformation";
import LoadingSpin from "./LoadingSpin";
import useToggle from "../hook/useToggle";
import useOffers from "../hook/useOffers";
export default function JobCard({ data: { title, profile, province, teleworking, link, skillsList, contractType, updateDate, salaryDescription, journey, experienceMin, ...offer }, detailedInformation, loading }: ClientJobOffer) {
  const { texts, times } = formatDate(new Date(updateDate))

  const { getDetailedInformation } = useOffers({})

  const { toggle, isToggled } = useToggle();

  const handleDetailedInformation = () => {
    if (detailedInformation) {
      toggle();
      return;
    }
    getDetailedInformation(offer.id)
    if (!isToggled) {
      toggle();
    }
  }

  return (
    <div className="relative flex flex-col gap-4 bg-white hover:bg-primary-l5 p-4 w-full rounded-md">
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-row justify-between md:gap-2">
          <List>
            <ListItem>
              <div className="group relative flex flex-row gap-0.5 items-end cursor-context-menu">
                <div className="group-hover:flex hidden absolute top-[110%] left-2 whitespace-nowrap flex-col bg-white p-1 shadow-focus rounded-sm">
                  <span>
                    {teleworking.value}
                  </span>
                </div>
                <svg className={`${teleworking.id === 3 ? "text-accent" : teleworking.id === 2 ? 'text-success' : 'text-primary'}`} xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                </svg>
                <span>
                  {province.value}
                </span>
              </div>
            </ListItem>
            <ListItem>
              <span>
                Contrato {contractType.value}
              </span>
            </ListItem>
            <ListItem>
              Jornada {journey.value}
            </ListItem>
            <ListItem>
              {salaryDescription}
            </ListItem>
            <ListItem>
              {experienceMin.value}
            </ListItem>
          </List>
          <List>
            <span className="self-start md:self-center cursor-pointer">
              <svg className="fill-gray" width="15" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.568 12.977a3.5 3.5 0 0 1 4.556 0l2.726 2.337a.3.3 0 0 0 .496-.228V2.25a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v12.836a.3.3 0 0 0 .495.228l2.727-2.337ZM2.846.25h10a2 2 0 0 1 2 2v14.576a1 1 0 0 1-1.651.759l-4.048-3.47a2 2 0 0 0-2.603 0l-4.048 3.47a1 1 0 0 1-1.65-.76V2.25a2 2 0 0 1 2-2Z" /></svg>
            </span>
          </List>
        </div>


        <div className="flex flex-col md:flex-row gap-2">
          <Image className="object-cover w-[70px] h-[70px] border-2 border-ij-container-border rounded-md max-w-full max-h-full" src={profile.logoUrl || "/noAvatar.png"} width="70" height="70" alt={profile.name} />
          <div className="flex flex-col gap-2">

            <h2 className="text-sm">{title}</h2>
            <div className="flex flex-row gap-2 items-center">
              <h3 className="text-xs font-medium text-primary inline">
                <Link href={profile.url || "#"}>{profile.name}</Link>
              </h3>
              <span className="text-success text-xs">Hace {texts && texts.main}</span>
              {([times.years, times.months, times.weeks, times.days].join("") === '0000') && <Badge color="green">Nuevo</Badge>}
            </div>
            <Skills skillsList={skillsList} />
          </div>
        </div>
      </div>


      {(detailedInformation && isToggled) &&
        <DetailedInformation {...{
          detailedInformation
        }} />}

      <div className="grid grid-cols-3 place-content-center place-items-center">
        <div className="hidden">
        </div>
        <button className="col-span-2 md:col-span-1 justify-self-start md:justify-center text-xs text-primary font-bold uppercase flex flex-row gap-2" onClick={handleDetailedInformation}>
          {loading
            ? (<>
              <LoadingSpin sizeClassNames="w-4 h-4" />
              Obteniendo información
            </>) :
            isToggled ? 'Ocultar detalles' : 'Ver Detalles'}
        </button>
        <div className="col-[3] text-right justify-self-end">
          <Link href={link} target="_blank" className="text-primary text-xs">Ver en InfoJobs</Link>
        </div>
      </div>

    </div>
  )
}