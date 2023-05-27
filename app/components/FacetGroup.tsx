export default function FiltersGroup({ children, title, id }: { children: React.ReactNode; title: string; id: string }) {

  return (
    <fieldset className="flex flex-col gap-2 items-start" id={id}>
      <h3 className="text-base">{title}</h3>
      {children}
    </fieldset>
  )

}