import { HTMLProps } from "react";

export default function Radio(props: HTMLProps<HTMLInputElement>) {
  return (
    <label className="flex flex-row items-center gap-1 pointer text-sm text-left cursor-pointer">
      <div className={`relative min-w-[16px] min-h-[16px] w-4 h-4 border-2 ${props.checked ? "bg-primary border-primary" : "bg-transparent border-gray"} rounded-full`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${props.checked ? "bg-white" : "bg-gray"}`} />
      </div>
      <input className="hidden" type="checkbox" {...props} />
      {props.label}
    </label>
  )
}