import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function TeaPage() {
  return <PremiumFoodPage theme={getThemeBySlug("tea")} />;
}
