import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function ShakePage() {
  return <PremiumFoodPage theme={getThemeBySlug("shake")} />;
}
