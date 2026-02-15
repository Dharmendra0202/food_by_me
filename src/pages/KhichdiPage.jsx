import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function KhichdiPage() {
  return <PremiumFoodPage theme={getThemeBySlug("khichdi")} />;
}
