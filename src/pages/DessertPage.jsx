import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function DessertPage() {
  return <PremiumFoodPage theme={getThemeBySlug("desserts")} />;
}
