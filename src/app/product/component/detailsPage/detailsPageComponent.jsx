import React from "react";
import "./css/detailPageStyle.css";
import { Link } from "react-router-dom";

function DetailsPageComponent(props) {
  const { state } = props;

  // Check if state is valid and contains necessary data is there or not
  const hasData = state && Object.keys(state).length > 0;

  return (
    <div className="container">
      <h1 className="header">Details Page</h1>
      {hasData ? (
        <div className="details-content">
          <p>
            <b>{state.name}</b>
          </p>
          <div className="stages-container">
            <div className="stages">
              <div className="stage stage-1">
                <span>Country:</span> {state.country}
              </div>
              <div className="stage stage-2">
                <span>Alpha Code:</span> {state.alpha_two_code}
              </div>
              <div className="stage stage-3">
                <span>State Province:</span> {state["state-province"] || "NA"}
              </div>
              <div className="stage stage-4">
                <span>Website:</span>{" "}
                {state.web_pages && state.web_pages.length > 0 ? (
                  <Link to={state.web_pages[0]}>{state.web_pages[0]}</Link>
                ) : (
                  "NA"
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data-error">No Data Found</div>
      )}
    </div>
  );
}

export default DetailsPageComponent;
