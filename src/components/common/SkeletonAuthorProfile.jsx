import React from "react";
import "./SkeletonAuthor.css"; 

const SkeletonAuthorProfile = () => {
    return (
        <div className="d_profile de-flex skeleton">
            <div className="de-flex-col">
                <div className="profile_avatar skeleton">
                    <div className="skeleton-avatar skeleton" />
                    <div className="profile_name">
                        <div className="skeleton-text skeleton-title skeleton" />
                        <div className="skeleton-text skeleton-price skeleton" />
                        <div className="skeleton-text skeleton-wallet skeleton" />
                    </div>
                </div>
            </div>
            <div className="profile_follow de-flex">
                <div className="de-flex-col">
                    <div className="skeleton-text skeleton-followers skeleton" />
                    <div className="skeleton-button skeleton" />
                </div>
            </div>
        </div>

    );
};

export default SkeletonAuthorProfile;
