import { HTMLProps } from "react";

export default function CheckBox(props: HTMLProps<HTMLInputElement>) {
  return (
    <label className="flex flex-row items-center gap-2 pointer text-sm text-left cursor-pointer">
      <div className={`relative flex items-center p-[3px] justify-center min-w-[16px] min-h-[16px] w-4 h-4 border-2 ${props.checked ? "border-primary bg-primary" : "border-gray"} rounded-sm`}>
        <svg xmlns="http://www.w3.org/2000/svg"
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${props.checked ? "text-white" : "text-gray"}`} width={10} height={10} viewBox="0 0 24 24" stroke-width={4} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12l5 5l10 -10"></path>
        </svg>
      </div>
      <input className="hidden" type="checkbox" {...props} />
      {props.label}
    </label>
  )
}