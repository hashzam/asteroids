"use client";

import * as React from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getLocation } from "@/lib/locations";

const banjara = getLocation("banjara-hills")!;

export function EventInquiryForm() {
  const [waLink, setWaLink] = React.useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => (data.get(name) as string)?.trim() ?? "";

    const lines = [
      "Hi Gamers Guild Banjara Hills, I would like to plan a private event.",
      "",
      `Name: ${field("name")}`,
      `Phone: ${field("phone")}`,
      field("email") ? `Email: ${field("email")}` : null,
      `Event date: ${field("date")}`,
      `Group size: ${field("group")}`,
      field("occasion") ? `Occasion: ${field("occasion")}` : null,
      field("message") ? `Details: ${field("message")}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    setWaLink(`https://wa.me/${banjara.whatsapp}?text=${text}`);
  }

  if (waLink) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent/10 text-accent-text">
          <CheckCircle2 className="size-6" />
        </span>
        <h3 className="mt-4 font-display text-xl font-extrabold uppercase tracking-tight">
          Inquiry Ready
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Send your event details to the Banjara Hills team on WhatsApp and we
          will call you back with a custom quote.
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
          <Label htmlFor="occasion">Occasion (optional)</Label>
          <Input
            id="occasion"
            name="occasion"
            placeholder="Birthday, squad night, team event"
          />
        </div>
        <div>
          <Label htmlFor="date">Event date</Label>
          <Input id="date" name="date" type="date" required />
        </div>
        <div>
          <Label htmlFor="group">Group size</Label>
          <Input
            id="group"
            name="group"
            type="number"
            min={2}
            max={100}
            required
            placeholder="How many in your crew?"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Tell us about your event (optional)</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Timing, games, food, anything you want us to plan for."
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full">
        Send Event Inquiry
      </Button>
      <p className="mt-3 text-center text-xs text-muted">
        This sends your details to Banjara Hills on WhatsApp. We reply with a
        custom quote, no fixed packages.
      </p>
    </form>
  );
}
