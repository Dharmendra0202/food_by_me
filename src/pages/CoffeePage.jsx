import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function CoffeePage() {
  return <PremiumFoodPage theme={getThemeBySlug("coffee")} />;
}
