export default function FiltersGroup({ children, title }: { children: React.ReactNode; title: string; }) {

  return (
    <div className="flex flex-col gap-2 items-start">
      <h3 className="text-base">{title}</h3>
      {children}
    </div>
  )

}