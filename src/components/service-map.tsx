import { useEffect, useRef } from "react";
import type { Map as LeafletMap, TileLayer, LayerGroup } from "leaflet";
import { MASHHAD_CENTER, TILES } from "@/lib/catalog";
import { useApp } from "@/lib/store";
import type { Technician, TileId } from "@/lib/types";

export function ServiceMap({ technicians }: { technicians: Technician[] }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const tilesRef = useRef<TileLayer | null>(null);
  const markersRef = useRef<LayerGroup | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const tileId = useApp((s) => s.tileId);
  const selectedTechId = useApp((s) => s.selectedTechId);
  const setSelectedTechId = useApp((s) => s.setSelectedTechId);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;
    let resizeTimer: ReturnType<typeof setInterval> | undefined;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !hostRef.current) return;
      leafletRef.current = L;
      map = L.map(hostRef.current, {
        zoomControl: false,
        attributionControl: true,
      }).setView(MASHHAD_CENTER, 13);
      L.control.zoom({ position: "bottomleft" }).addTo(map);
      mapRef.current = map;
      markersRef.current = L.layerGroup().addTo(map);
      applyTile(L, map, tilesRef, tileId);
      paint(L, markersRef.current, technicians, setSelectedTechId);
      map.invalidateSize();
      resizeTimer = setInterval(() => map?.invalidateSize(), 400);
      setTimeout(() => {
        if (resizeTimer) clearInterval(resizeTimer);
      }, 2500);
    })();

    return () => {
      cancelled = true;
      if (resizeTimer) clearInterval(resizeTimer);
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    applyTile(L, map, tilesRef, tileId);
  }, [tileId]);

  useEffect(() => {
    const L = leafletRef.current;
    const group = markersRef.current;
    if (!L || !group) return;
    paint(L, group, technicians, setSelectedTechId);
  }, [technicians, setSelectedTechId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedTechId) return;
    const tech = technicians.find((t) => t.id === selectedTechId);
    if (tech) map.panTo([tech.lat, tech.lng]);
  }, [selectedTechId, technicians]);

  return <div ref={hostRef} className="h-full min-h-[240px] w-full bg-border" />;
}

function applyTile(
  L: typeof import("leaflet"),
  map: LeafletMap,
  tilesRef: { current: TileLayer | null },
  tileId: TileId,
) {
  const spec = TILES.find((t) => t.id === tileId) ?? TILES[0];
  if (tilesRef.current) map.removeLayer(tilesRef.current);

  const layer = L.tileLayer(spec.url, {
    subdomains: spec.subdomains ?? [],
    attribution: spec.attribution,
    maxZoom: spec.maxZoom,
  });
  const proto = L.TileLayer.prototype as unknown as {
    createTile: (coords: unknown, done: (err?: Error, t?: HTMLImageElement) => void) => HTMLElement;
  };
  proto.createTile = function (this: TileLayer, coords, done) {
    const tile = document.createElement("img");
    tile.referrerPolicy = "no-referrer";
    tile.alt = "";
    tile.onload = () => done(undefined, tile);
    tile.onerror = () => done(new Error("tile"), tile);
    tile.src = this.getTileUrl(coords as never);
    return tile;
  };
  layer.addTo(map);
  tilesRef.current = layer;
  map.invalidateSize();
}

function paint(
  L: typeof import("leaflet"),
  group: LayerGroup,
  technicians: Technician[],
  onSelect: (id: string) => void,
) {
  group.clearLayers();
  technicians.forEach((tech) => {
    const html = `<div class="tech-pin"><img src="${tech.photo}" alt=""/><span class="dot ${tech.online ? "on" : "off"}"></span></div>`;
    const icon = L.divIcon({
      className: "",
      html,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });
    const marker = L.marker([tech.lat, tech.lng], { icon });
    marker.on("click", () => onSelect(tech.id));
    marker.addTo(group);
  });
}
