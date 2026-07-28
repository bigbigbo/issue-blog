import type { SolarTermSeason } from "./solar-terms";

export const SEASONAL_THEME_EVENT = "bigbigbo:seasonal-theme";

export interface SeasonalThemeDetail {
  season: SolarTermSeason;
  themeColor: string;
}
