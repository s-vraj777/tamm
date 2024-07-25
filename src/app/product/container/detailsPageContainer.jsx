import React from "react";
import { useLocation } from "react-router-dom";
import DetailsPageComponent from "../component/detailsPage/detailsPageComponent";

export default function DetailsPageContainer() {
  const location = useLocation();
  const state = location.state || {};
  return <DetailsPageComponent state={state.item} />;
}
