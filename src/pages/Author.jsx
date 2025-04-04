import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import { getAuthorDetails } from "../services/authorDetails";
import AuthorItems from "../components/author/AuthorItems";
import SkeletonAuthorProfile from "../components/common/SkeletonAuthorProfile";
import "../css/styles/style.css";

const Author = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const data = await getAuthorDetails(id);
        setAuthorData(data);
        setFollowers(data.followers);
      } catch (err) {
        console.error("Failed to fetch author details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
    setFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <SkeletonAuthorProfile />
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData?.authorImage} alt="author" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            Author {authorData?.authorId}
                            <span className="profile_username">
                              @{authorData?.tag}
                            </span>
                            <span className="profile_wallet" id="wallet">
                              {authorData.address.slice(0, 18)}...
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} follower{followers !== 1 ? "s" : ""}
                        </div>
                        <button className="btn-main" onClick={handleFollowToggle}>
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={authorData?.nftCollection}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
