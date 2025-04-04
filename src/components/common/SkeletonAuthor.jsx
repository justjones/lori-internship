import React from "react";
import "./SkeletonAuthor.css"; 

const SkeletonCard = () => {
    return (
        <div className="col-lg-3 col-md-6">
            <div className="nft__item skeleton">
                <div className="nft__item_wrap">
                    <div className="nft__item_preview skeleton-box skeleton" />
                </div>
                <div className="nft__item_info">
                    <div className="skeleton-text skeleton-title skeleton" />
                    <div className="skeleton-text skeleton-price skeleton" />
                    <div className="skeleton-text skeleton-likes skeleton" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
