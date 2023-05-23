export default function Badge({ children, color = "blue" }: { children: React.ReactNode, color?: string }) {

  const colors: { [key: string]: string } = {
    "green": "bg-success-l4 text-success",
    "blue": "bg-blue-l4 text-blue",
    "orange": "bg-accent-l4 text-accent"
  }
  return (
    <span className={`flex flex-row items-center gap-1 p-1 ${colors[color]} rounded-sm text-xs`}>{children}</span>
  )
}