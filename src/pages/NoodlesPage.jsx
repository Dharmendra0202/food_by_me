import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function NoodlesPage() {
  return <PremiumFoodPage theme={getThemeBySlug("noodles")} />;
}
