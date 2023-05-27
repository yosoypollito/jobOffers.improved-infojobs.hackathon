import { HTMLProps } from "react";

export default function Radio(props: HTMLProps<HTMLInputElement>) {
  return (
    <label className="flex flex-row items-center gap-1 pointer text-sm text-left cursor-pointer">
      <div className="min-w-[16px] min-h-[16px] w-4 h-4 border-2 border-gray rounded-sm">
      </div>
      <input className="hidden" type="checkbox" {...props} />
      {props.label}
    </label>
  )
}