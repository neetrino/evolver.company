export type ParsedAboutStatValue = {
  number: number;
  suffix: string;
};

/** Parses homepage About stat strings such as `100+` or `600000+`. */
export function parseAboutStatValue(value: string): ParsedAboutStatValue {
  const match = value.match(/^([\d,.\s]+)(.*)$/);
  if (!match) {
    return { number: 0, suffix: value };
  }

  const digits = match[1].replace(/[^\d]/g, "");
  const number = Number.parseInt(digits, 10);

  return {
    number: Number.isFinite(number) ? number : 0,
    suffix: match[2] ?? "",
  };
}
