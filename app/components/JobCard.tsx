interface PROPS {
  children: React.ReactNode;
}
export default function JobCard({ children }: PROPS) {

  return (
    <div className="flex bg-ig-container-bg hover:bg-ig-card-bg-hover">
      {children}
    </div>
  )
}