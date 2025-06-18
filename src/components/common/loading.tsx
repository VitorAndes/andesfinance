export function Loading() {
  return (
    <div className="flex flex-row gap-2 justify-center">
      <div className="w-4 h-4 rounded-full bg-accent animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-accent animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-accent animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
}
