const heights = [
  "h-72",
  "h-52",
  "h-64",
  "h-44",
  "h-80",
  "h-56",
  "h-48",
  "h-72",
];

export default function PortfolioSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            className="h-11 w-20 shrink-0 animate-pulse bg-surface"
            key={index}
          />
        ))}
      </div>

      <div className="mt-10 columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4 2xl:columns-5">
        {heights.map((height, index) => (
          <div
            className={`mb-3 w-full break-inside-avoid animate-pulse bg-surface sm:mb-4 ${height}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
