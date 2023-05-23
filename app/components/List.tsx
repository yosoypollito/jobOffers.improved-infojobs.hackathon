export default function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-row gap-3 text-xs items-end">
      {children}
    </ul>
  )
}