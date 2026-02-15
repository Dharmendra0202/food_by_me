import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function RasgulaPage() {
  return <PremiumFoodPage theme={getThemeBySlug("rasgulla")} />;
}
