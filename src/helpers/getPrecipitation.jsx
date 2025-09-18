export function getPrecipitation(data, unit = "mm") {
  if (!data) return `0 ${unit}`;

  const rain = data.rain?.["1h"] ?? data.rain?.["3h"];
  const snow = data.snow?.["1h"] ?? data.snow?.["3h"];

  const value = rain ?? snow ?? 0;

  return `${value} ${unit}`;
}
