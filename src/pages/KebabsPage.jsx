import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function KebabsPage() {
  return <PremiumFoodPage theme={getThemeBySlug("kebabs")} />;
}
