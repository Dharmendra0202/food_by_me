import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function ParathaPage() {
  return <PremiumFoodPage theme={getThemeBySlug("paratha")} />;
}
