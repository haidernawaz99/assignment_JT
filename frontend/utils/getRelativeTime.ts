const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

export function getRelativeTime(timestamp: number): string {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / DAY_MILLISECONDS
  );

  return rtf.format(daysDifference, "day");
}
