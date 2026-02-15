import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function ChinesePage() {
  return <PremiumFoodPage theme={getThemeBySlug("chinese")} />;
}
