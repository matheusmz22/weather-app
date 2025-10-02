/**
 * Received hours from API:
 * 00:00:00
 * 03:00:00
 * 06:00:00
 * 09:00:00
 * 12:00:00
 * 15:00:00
 * 18:00:00
 * 21:00:00
 * 12:00:00 (next day)
 */

export function formatHour(fullDate, isMetric) {
  const date = new Date(fullDate.replace(" ", "T"));
  return Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !isMetric,
  }).format(date);
}
