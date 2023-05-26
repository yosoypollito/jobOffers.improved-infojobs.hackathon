export default function FiltersGroup({ children, title }: { children: React.ReactNode; title: string; }) {

  return (
    <div className="flex flex-col">
      <h3>{title}</h3>
      {children}
    </div>
  )

}