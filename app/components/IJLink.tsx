import Link, { LinkProps } from "next/link"

interface PROPS extends LinkProps {
  children: React.ReactNode
}
export default function IJLink({ children, ...props }: PROPS) {
  return (
    <Link {...props} className="underline">
      {children}
    </Link>
  )
}
// A component that receive all needed props