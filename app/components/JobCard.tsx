import Image from "next/image";
import { JobOffer } from "../services/getOffers";
import { formatDate } from "../utils";
import Link from "next/link";
import Skills from "./Skills";
import List from "./List";
import ListItem from "./ListItem";
import { Slabo_13px } from "next/font/google";
export default function JobCard({ title, profile, province, teleworking, link, skillsList, contractType, updateDate, salaryDescription, journey, experienceMin, ...offer }: JobOffer) {
  console.log({ offer })

  console.log(experienceMin)


  const { texts } = formatDate(new Date(updateDate))

  return (
    <div className="flex flex-col gap-2 bg-ij-container-bg hover:bg-ig-card-bg-hover p-4 w-full rounded-md">
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-row justify-between">
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
          </List>
          <List>
            <ListItem>
              <Link href={link} target="_blank" className="text-primary">Ver en InfoJobs</Link>
            </ListItem>
            <ListItem>
              <span className="cursor-pointer">
                <svg className="fill-gray" width="15" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.568 12.977a3.5 3.5 0 0 1 4.556 0l2.726 2.337a.3.3 0 0 0 .496-.228V2.25a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v12.836a.3.3 0 0 0 .495.228l2.727-2.337ZM2.846.25h10a2 2 0 0 1 2 2v14.576a1 1 0 0 1-1.651.759l-4.048-3.47a2 2 0 0 0-2.603 0l-4.048 3.47a1 1 0 0 1-1.65-.76V2.25a2 2 0 0 1 2-2Z" /></svg>
              </span>
            </ListItem>
          </List>
        </div>


        <div className="flex flex-row gap-2">
          <div className=" w-[70px] h-[70px]">
            <Image className=" object-fit w-[70px] h-[70px] border-2 border-ij-container-border rounded-md" src={profile.logoUrl || "/noAvatar.svg"} width="70" height="70" alt={`${profile.name}`} />
          </div>
          <div className="flex flex-col gap-2">

            <h2 className="text-sm">{title}</h2>
            <h3 className="text-xs font-medium text-primary">
              <Link href={profile.url || "#"}>{profile.name}</Link> <span className="text-success">Hace {texts && texts.main}</span>
            </h3>
            <Skills skillsList={skillsList} />
          </div>
        </div>
      </div>



      <div className="flex w-full justify-center">
        <button className="text-sm">Detalles</button>
      </div>

    </div>
  )
}