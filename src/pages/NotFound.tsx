
export default function PageNotFound() {
  return (
    <div className="relative w-full h-full min-h-dvh py-18 px-14 flex flex-col items-start justify-center">
      <div className="text-4xl font-bold text-thread-red">
        Page Not Found :(
      </div>
      <div className="text-2xl">
        The page you are looking for does not exist.
      </div>
      <div className="text-2xl">
        Please try again.
      </div>
    </div>
  )
}
