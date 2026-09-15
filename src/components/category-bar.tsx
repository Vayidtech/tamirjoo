import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CATEGORY_TREE, SERVICE_LABEL } from "@/lib/catalog";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { ServiceId } from "@/lib/types";

export function CategoryBar() {
  const filter = useApp((s) => s.serviceFilter);
  const setFilter = useApp((s) => s.setServiceFilter);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="relative z-20 flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border bg-surface px-2 py-2">
      <button
        type="button"
        onClick={() => {
          setFilter("all");
          setOpenId(null);
        }}
        className={cn(
          "h-10 shrink-0 rounded-md px-3 text-sm font-medium",
          filter === "all" ? "bg-primary text-primary-fg" : "text-muted hover:bg-primary-soft",
        )}
      >
        همه خدمات
      </button>
      {CATEGORY_TREE.map((group) => {
        const active = group.children.includes(filter as ServiceId);
        const open = openId === group.id;
        return (
          <div key={group.id} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : group.id)}
              className={cn(
                "inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium",
                active ? "bg-primary-soft text-primary" : "text-fg hover:bg-bg",
              )}
            >
              {group.label}
              <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
            </button>
            {open ? (
              <div className="absolute top-full end-0 z-30 mt-1 min-w-44 rounded-lg border border-border bg-elevated py-1 shadow-lg">
                {group.children.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFilter(id);
                      setOpenId(null);
                    }}
                    className={cn(
                      "flex h-10 w-full items-center px-3 text-right text-sm",
                      filter === id ? "bg-primary-soft text-primary" : "hover:bg-bg",
                    )}
                  >
                    {SERVICE_LABEL[id]}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
