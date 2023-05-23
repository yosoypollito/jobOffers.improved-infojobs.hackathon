export default function ListItem({ children, ...props }: { children: React.ReactNode }) {

  return (
    <li {...props} className="flex text-gray">
      {children}
    </li>
  )

}