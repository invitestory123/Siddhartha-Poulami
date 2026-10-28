import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

type VenueInfo = {
  id: "wedding" | "reception";
  badge: string;
  name: string;
  date: string;
  time: string;
  address: string;
  embedUrl: string;
  mapsUrl: string;
};

const VENUES: VenueInfo[] = [
  {
    id: "wedding",
    badge: "Wedding Venue",
    name: "The Dreamland Resort",
    date: "Saturday, 05 December 2026",
    time: "6:30 PM onwards",
    address: "Shibachal, Birati, Kolkata, West Bengal 700049",
    embedUrl: "https://www.google.com/maps?q=The+Dreamland+Resort+Birati+Kolkata&output=embed",
    mapsUrl: "https://maps.google.com/?q=The+Dreamland+Resort+Birati+Kolkata",
  },
  {
    id: "reception",
    badge: "Reception Venue",
    name: "The Prarthana Banquet",
    date: "Monday, 07 December 2026",
    time: "7:00 PM onwards",
    address: "Shiksha Tower, 94/58 S.N. Banerjee Road, Chiriamore, Barrackpore, Kolkata 700120",
    embedUrl: "https://www.google.com/maps?q=The+Prarthana+Hotel+and+Banquet+Barrackpore&output=embed",
    mapsUrl: "https://maps.google.com/?q=The+Prarthana+Hotel+and+Banquet+Barrackpore",
  },
];

export function VenueMap() {
  const [activeVenue, setActiveVenue] = useState<"wedding" | "reception">("wedding");
  const venue = VENUES.find((v) => v.id === activeVenue) ?? VENUES[0];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-gold/25 bg-deep/60 p-2 shadow-[0_30px_80px_-35px_oklch(0.2_0.1_30/0.9)] backdrop-blur-sm">
      {/* Venue Switcher Tabs */}
      <div className="flex border-b border-gold/15 p-2">
        {VENUES.map((v) => {
          const isActive = v.id === activeVenue;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveVenue(v.id)}
              className={cn(
                "flex-1 rounded-xl py-3 px-4 text-center transition-all duration-300",
                isActive
                  ? "bg-gold/15 text-gold-soft border border-gold/30 shadow-inner"
                  : "text-foreground/60 hover:text-gold-soft/80"
              )}
            >
              <span className="block text-[0.62rem] uppercase tracking-[0.3em] font-medium text-gold/75">
                {v.badge}
              </span>
              <span className="mt-1 block font-display text-base sm:text-lg">
                {v.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Map Embed */}
      <div className="relative mt-2 overflow-hidden rounded-[1.2rem]">
        <iframe
          title={`${venue.name} on Google Maps`}
          src={venue.embedUrl}
          className="h-[26rem] w-full border-0 grayscale-[0.15]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* Venue Information Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 text-left">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold-soft shrink-0" />
            <p className="font-display text-xl text-gold-soft">{venue.name}</p>
          </div>
          <p className="text-xs text-foreground/75 pl-6">{venue.address}</p>
          <p className="text-[0.65rem] tracking-wider text-gold/80 uppercase pl-6 font-medium">
            {venue.date} · {venue.time}
          </p>
        </div>

        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-[0.62rem] uppercase tracking-[0.25em] text-gold-soft transition-all duration-300 hover:bg-gold/20 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <Navigation className="h-3.5 w-3.5" />
          Get Directions ↗
        </a>
      </div>
    </div>
  );
}
