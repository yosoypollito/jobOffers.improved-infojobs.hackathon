import { type SkillsList } from "../services/getOffers";
import Badge from "./Badge";

export default function Skills({ skillsList }: { skillsList: Array<SkillsList> }) {

  return (
    <div className="flex flex-row flex-wrap gap-2 capitalize">
      {skillsList && skillsList.length > 0 &&
        skillsList.slice(0, 5).map(({ skill }) => (<Badge color="orange" key={skill}>{skill}</Badge>))}

      {skillsList && skillsList.length > 5 && (
        <div className="relative group flex items-center">
          <div className="group-hover:flex hidden flex-col gap-1 text-left md:whitespace-nowrap absolute bottom-[105%] left-1/2 -translate-x-1/2 bg-white shadow-focus rounded-sm text-xs px-2 py-1">
            {skillsList.slice(5).map(({ skill }) => skill).join(", ")}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="text-accent" width={22} height={22} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
            <path d="M12 9h.01"></path>
            <path d="M11 12h1v4h1"></path>
          </svg>
        </div>
      )}
    </div>
  )
}