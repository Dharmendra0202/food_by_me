import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function CakesPage() {
  return <PremiumFoodPage theme={getThemeBySlug("cakes")} />;
}
