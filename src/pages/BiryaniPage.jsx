import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function BiryaniPage() {
  return <PremiumFoodPage theme={getThemeBySlug("biryani")} />;
}
