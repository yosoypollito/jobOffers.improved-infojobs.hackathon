export default function LoadingSpin({ sizeClassNames }: { sizeClassNames?: string }) {
  return (
    <div className={`animate-spin border-2 border-primary border-t-accent rounded-full ${sizeClassNames || "w-10 h-10"}`}></div>
  )
}