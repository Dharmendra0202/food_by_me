import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function FruitsPage() {
  return <PremiumFoodPage theme={getThemeBySlug("fruits")} />;
}
