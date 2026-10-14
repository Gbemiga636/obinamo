export type CalendarEvent = {
  title: string;
  startIso: string;
  endIso: string;
  details: string;
  location: string;
};

const toUtcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function googleCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toUtcStamp(event.startIso)}/${toUtcStamp(event.endIso)}`,
    details: event.details,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeIcs = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");

export function downloadIcs(events: CalendarEvent[], filename: string) {
  const stamp = toUtcStamp(new Date().toISOString());
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Obinasom//Wedding//EN",
    "CALSCALE:GREGORIAN",
    ...events.flatMap((e, i) => [
      "BEGIN:VEVENT",
      `UID:obinasom-${i}-${toUtcStamp(e.startIso)}@obinasom`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toUtcStamp(e.startIso)}`,
      `DTEND:${toUtcStamp(e.endIso)}`,
      `SUMMARY:${escapeIcs(e.title)}`,
      `DESCRIPTION:${escapeIcs(e.details)}`,
      `LOCATION:${escapeIcs(e.location)}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(
    new Blob([body], { type: "text/calendar;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
