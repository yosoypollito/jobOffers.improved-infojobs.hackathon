"use client"
import Link, { LinkProps } from "next/link"
import Logo from "./components/Logo"
import useToggle from "./hook/useToggle";
import Button from "./components/Button";

interface NavBarItemProps extends LinkProps {
  children: React.ReactNode;
  target?: string;
}

const NavBarItem = (props: NavBarItemProps) => {


  const styles = "text-lg font-semibold md:text-base md:font-normal text-gray hover:text-primary";

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

  const { isToggled, toggle } = useToggle()
  return (
    <nav className="relative justify-between p-2 md:p-5 bg-ij-container-bg border-ij-container-border border-b-2">
      <div className="flex flex-row max-w-[1280px] gap-4 m-auto items-center p-2">

        <div className="grid grid-cols-3 md:flex md:flex-row gap-2 w-full md:w-fit">
          <button onClick={toggle} className="md:hidden text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 6l16 0"></path>
              <path d="M4 12l16 0"></path>
              <path d="M4 18l16 0"></path>
            </svg>
          </button>
          <div className=" justify-self-center">
            <NavBarItem href={'https://formacion.infojobs.net/'} target="_blank">
              <Logo height="24" />
            </NavBarItem>
          </div>
        </div>

        <div className={`absolute p-4 gap-4 md:relative md:translate-x-0 top-full left-0 transition-all duration-300 ${isToggled ? "translate-x-0" : "-translate-x-full"} flex flex-col md:flex-row md:p-0 bg-white w-full z-10`}>
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
      </div>
    </nav>
  )
}