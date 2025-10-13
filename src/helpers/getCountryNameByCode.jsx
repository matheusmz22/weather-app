const regionNames = new Intl.DisplayNames(["en"], {type: "region"});

export function getCountryName(countryCode) {
  return regionNames.of(countryCode);
}
