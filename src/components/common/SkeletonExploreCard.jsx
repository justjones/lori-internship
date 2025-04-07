import React from "react";
import "../../index.css"; // pulls from global styles

const SkeletonExploreCard = () => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item explore-skeleton-card">
        <div className="explore-skeleton-avatar explore-shimmer" />
        <div className="explore-skeleton-timer explore-shimmer" />
        <div className="explore-skeleton-image explore-shimmer" />
        <div className="explore-skeleton-line explore-shimmer" />
        <div className="explore-skeleton-line short explore-shimmer" />
      </div>
    </div>
  );
};

export default SkeletonExploreCard;
