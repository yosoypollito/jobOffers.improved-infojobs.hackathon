import { HTMLProps } from "react";

export default function TextField(props: HTMLProps<HTMLInputElement>) {
  return (
    <label className="flex flex-row items-center gap-2 pointer text-sm text-left cursor-pointer">
      <input className="w-full border-2 border-gray p-2 outline-primary rounded" type="text" {...props} />
    </label>
  )
}