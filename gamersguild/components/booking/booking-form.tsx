"use client";

import * as React from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { BOOKING_DURATIONS } from "@/lib/games";
import type { Location } from "@/lib/locations";

export function BookingForm({ location }: { location: Location }) {
  const [waLink, setWaLink] = React.useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => (data.get(name) as string)?.trim() ?? "";

    const lines = [
      `Hi Gamers Guild ${location.shortName}, I would like to request a booking.`,
      "",
      `Name: ${field("name")}`,
      `Phone: ${field("phone")}`,
      field("email") ? `Email: ${field("email")}` : null,
      `Players: ${field("players")}`,
      `Device: ${field("device")}`,
      `Duration: ${field("duration")}`,
      field("game") ? `Game: ${field("game")}` : null,
      `Date: ${field("date")}`,
      field("time") ? `Time: ${field("time")}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    setWaLink(`https://wa.me/${location.whatsapp}?text=${text}`);
  }

  if (waLink) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent/10 text-accent-text">
          <CheckCircle2 className="size-6" />
        </span>
        <h3 className="mt-4 font-display text-xl font-extrabold uppercase tracking-tight">
          Request Ready
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Send your details to the {location.shortName} team on WhatsApp and our
          crew will call back to confirm your slot.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Button asChild size="lg">
            <a href={waLink} target="_blank" rel="noreferrer">
              <MessageCircle className="size-5" />
              Continue on WhatsApp
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setWaLink(null)}
            className="font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground"
          >
            Edit details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="10 digit mobile number"
          />
        </div>
        <div>
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="players">Players</Label>
          <Input
            id="players"
            name="players"
            type="number"
            min={1}
            max={50}
            defaultValue={1}
            required
          />
        </div>
        <div>
          <Label htmlFor="device">Device</Label>
          <Select id="device" name="device" required defaultValue="">
            <option value="" disabled>
              Select a device
            </option>
            {location.devices.map((device) => (
              <option key={device} value={device}>
                {device}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Select id="duration" name="duration" required defaultValue="">
            <option value="" disabled>
              Select a duration
            </option>
            {BOOKING_DURATIONS.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" required />
        </div>
        <div>
          <Label htmlFor="time">Time (optional)</Label>
          <Input id="time" name="time" type="time" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="game">Game (optional)</Label>
          <Input
            id="game"
            name="game"
            placeholder="What do you want to play?"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full">
        Request Booking
      </Button>
      <p className="mt-3 text-center text-xs text-muted">
        This sends your details to {location.shortName} on WhatsApp. No payment
        is taken online, our crew confirms your slot by call.
      </p>
    </form>
  );
}
