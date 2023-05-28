import { HTMLAttributes } from "react";

export default function Button(props: HTMLAttributes<HTMLButtonElement>) {

  return (
    <button {...{
      ...props,
      className: `text-xs flex flex-row gap-2 items-center justify-center bg-white text-primary w-fit p-2 rounded uppercase font-semibold shadow-focus ${props.className}`
    }}>
      {props.children}
    </button>
  )
}