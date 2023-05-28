import Link, { LinkProps } from "next/link"
import Logo from "./components/Logo"

interface NavBarItemProps extends LinkProps {
  children: React.ReactNode;
  target?: string;
}

const NavBarItem = (props: NavBarItemProps) => {


  const styles = "text-gray hover:text-primary";

  return (
    <>
      {props.target ? (
        <a {...{
          ...props,
          href: props.href.toString()
        }} className={styles}>
          {props.children}
        </a>
      ) : (
        <Link {...props} className={styles} >
          {props.children}
        </Link >
      )}
    </>
  )
}

export default function NavBar() {
  return (
    <nav className="justify-between p-5 bg-ij-container-bg border-ij-container-border border-b-2">
      <div className="flex flex-row max-w-[1280px] gap-4 m-auto items-center p-2">
        <NavBarItem href={'https://formacion.infojobs.net/'} target="_blank">
          <Logo height="24" />
        </NavBarItem>

        <NavBarItem href={'/'}>
          Buscar empleo
        </NavBarItem>

        <NavBarItem href={'https://www.infojobs.net/buscador-empresas'} target="_blank">
          Buscar empresas
        </NavBarItem>

        <NavBarItem href={'https://salarios.infojobs.net/'} target="_blank">
          Salarios
        </NavBarItem>

        <NavBarItem href={'https://formacion.infojobs.net/'} target="_blank">
          Formación
        </NavBarItem>
      </div>
    </nav>
  )
}