import { DetailedInformation } from "../services/getOffers";
import Badge from "./Badge";

const DetailedItem = ({ children, title }: { children: React.ReactNode; title: string; }) => {

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray">{title}</span>
      {children}
    </div>
  )
}

const DetailedListWithBadge = ({ arr, badgeColor }: { arr: Array<string>; badgeColor: string; }) => {

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {arr.map(item => <Badge key={item} color={badgeColor}>
        {item}
      </Badge>)}
    </div>
  )
}

export default function DetailedInformation({ detailedInformation }: { detailedInformation: DetailedInformation }) {
  const { responsabilities, benefits, requiredSkills, desirableSkills, contract, yearsOfExperience, culture, schedule, salary } = detailedInformation;

  return (
    <div className="flex flex-col gap-2">

      <div className="flex flex-row flex-wrap gap-2">
        {schedule && <DetailedItem title="Horario">
          <Badge color="blue">
            {schedule}
          </Badge>
        </DetailedItem>}
        {contract &&
          <DetailedItem title="Contrato">
            <Badge color="blue">
              {contract}
            </Badge>
          </DetailedItem>}

        {yearsOfExperience && <DetailedItem title="Experiencia">
          <Badge color="blue">
            {yearsOfExperience}
          </Badge>
        </DetailedItem>}

        {salary && <DetailedItem title="Salario">
          <Badge color="yellow">
            {salary}
          </Badge>
        </DetailedItem>}
      </div>

      {(responsabilities && responsabilities?.length > 0) && <DetailedItem title="Responsabilidades">
        <DetailedListWithBadge arr={responsabilities} badgeColor="green" />
      </DetailedItem>}

      {(benefits && benefits?.length > 0) && <DetailedItem title="Beneficios">
        <DetailedListWithBadge arr={benefits} badgeColor="green" />
      </DetailedItem>}

      {(requiredSkills && requiredSkills?.length > 0) &&
        <DetailedItem title="Habilidades Requeridas">
          <DetailedListWithBadge arr={requiredSkills} badgeColor="orange" />
        </DetailedItem>}

      {(desirableSkills && desirableSkills?.length > 0) &&
        <DetailedItem title="Habilidades Deseadas">
          <DetailedListWithBadge arr={desirableSkills} badgeColor="orange" />
        </DetailedItem>}

      {culture &&
        <DetailedItem title="Cultura">
          <Badge color="blue">
            {culture}
          </Badge>
        </DetailedItem>}

      <h3 className="text-xs text-gray">Informacion encontrada en la descripcion</h3>
    </div >
  )
}