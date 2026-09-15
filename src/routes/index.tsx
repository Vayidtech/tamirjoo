import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layers, Search, Star } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Avatar } from "@/components/avatar";
import { CategoryBar } from "@/components/category-bar";
import { JobCard } from "@/components/job-card";
import { RequestSheet } from "@/components/request-sheet";
import { ServiceMap } from "@/components/service-map";
import { TILES } from "@/lib/catalog";
import { useApp } from "@/lib/store";
import { cn, toman } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: CustomerHome });

function CustomerHome() {
  const technicians = useApp((s) => s.technicians);
  const jobs = useApp((s) => s.jobs);
  const filter = useApp((s) => s.serviceFilter);
  const selectedId = useApp((s) => s.selectedTechId);
  const setSelected = useApp((s) => s.setSelectedTechId);
  const tileId = useApp((s) => s.tileId);
  const setTileId = useApp((s) => s.setTileId);
  const [query, setQuery] = useState("");
  const [listOpen, setListOpen] = useState(true);

  const visible = useMemo(() => {
    return technicians.filter((t) => {
      if (filter !== "all" && !t.services.includes(filter)) return false;
      if (query && !t.name.includes(query)) return false;
      return true;
    });
  }, [technicians, filter, query]);

  const selected = technicians.find((t) => t.id === selectedId) ?? null;

  return (
    <div className="flex h-dvh flex-col bg-bg">
      <AppHeader />
      <CategoryBar />
      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            "absolute inset-x-0 bottom-0 z-20 flex max-h-[48vh] flex-col border-t border-border bg-surface md:static md:max-h-none md:w-80 md:border-l md:border-t-0 lg:w-96",
            listOpen ? "translate-y-0" : "translate-y-[calc(100%-3rem)] md:translate-y-0",
          )}
        >
          <button
            type="button"
            className="flex h-12 items-center justify-center border-b border-border text-sm text-muted md:hidden"
            onClick={() => setListOpen((v) => !v)}
          >
            {listOpen ? "بستن فهرست" : "فهرست تعمیرکارها"}
          </button>
          <div className="space-y-3 overflow-y-auto p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجوی نام تعمیرکار"
                className="h-11 w-full rounded-md border border-border bg-elevated pe-9 ps-3 text-sm"
              />
            </div>
            <p className="text-xs text-muted">
              {visible.length.toLocaleString("fa-IR")} تعمیرکار روی نقشه
            </p>
            {visible.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(t.id)}
                className={cn(
                  "flex w-full gap-3 rounded-lg border p-3 text-right transition-colors",
                  selectedId === t.id
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-elevated hover:border-primary/40",
                )}
              >
                <Avatar initials={t.initials} hue={t.hue} photo={t.photo} online={t.online} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-semibold">{t.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <Star className="size-3 fill-warn text-warn" />
                    {t.rating.toLocaleString("fa-IR")} ·{" "}
                    {t.reviews.toLocaleString("fa-IR")} نظر
                  </div>
                  <p className="mt-1 text-xs font-medium text-primary">
                    از {toman(t.visitFee)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="relative min-w-0 flex-1">
          <ServiceMap technicians={visible} />
          <div className="absolute start-3 top-3 z-10 flex items-center gap-1 rounded-md border border-border bg-elevated p-1 shadow-sm">
            <Layers className="ms-1 size-4 text-muted" />
            {TILES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTileId(t.id)}
                className={cn(
                  "h-8 rounded-sm px-2 text-xs font-medium",
                  tileId === t.id ? "bg-primary text-primary-fg" : "text-muted",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {selected ? (
        <RequestSheet tech={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}
