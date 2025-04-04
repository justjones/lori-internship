import React from "react";
import "./SkeletonTopSeller.css";

const SkeletonTopSeller = () => {
  return (
    <li className="skeleton-seller">
      <div className="skeleton-avatar shimmer" />
      <div className="skeleton-info">
        <div className="skeleton-line shimmer" />
        <div className="skeleton-line shimmer small" />
      </div>
    </li>
  );
};

export default SkeletonTopSeller;
