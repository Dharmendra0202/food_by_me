import React from "react";
import PremiumFoodPage from "./PremiumFoodPage";
import { getThemeBySlug } from "./catalogThemes";

export default function PureVegPage() {
  return <PremiumFoodPage theme={getThemeBySlug("pureveg")} />;
}
