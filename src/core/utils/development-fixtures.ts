export type DevelopmentFixture = "loading" | "error" | "empty" | "exhausted";

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function resolveDevelopmentFixture(value: string | string[] | undefined): DevelopmentFixture | null {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const fixture = firstValue(value);

  if (fixture === "loading" || fixture === "error" || fixture === "empty" || fixture === "exhausted") {
    return fixture;
  }

  return null;
}

export function resolveDevelopmentDate(value: string | string[] | undefined): Date | null {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const date = firstValue(value);

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return null;
  }

  const parsedDate = new Date(`${date}T12:00:00+08:00`);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

export function resolveDevelopmentReducedMotion(value: string | string[] | undefined): boolean {
  return process.env.NODE_ENV === "development" && firstValue(value) === "reduce";
}
