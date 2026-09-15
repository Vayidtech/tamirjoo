import { cn } from "@/lib/utils";

export function Avatar({
  initials,
  hue,
  photo,
  size = 44,
  online,
  className,
}: {
  initials: string;
  hue: number;
  photo?: string;
  size?: number;
  online?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      {photo ? (
        <img
          src={photo}
          alt=""
          className="size-full rounded-full object-cover"
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="grid size-full place-items-center rounded-full font-bold text-white"
          style={{
            fontSize: size * 0.32,
            background: `hsl(${hue} 42% 38%)`,
          }}
        >
          {initials}
        </div>
      )}
      {online !== undefined ? (
        <span
          className={cn(
            "absolute -end-0.5 -bottom-0.5 size-3 rounded-full ring-2 ring-elevated",
            online ? "bg-online" : "bg-danger",
          )}
        />
      ) : null}
    </div>
  );
}
