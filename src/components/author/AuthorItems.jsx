import React from "react";
import SkeletonCard from "components/common/SkeletonAuthor"; 
import "../../css/styles/style.css";
import { Link } from "react-router-dom";

const AuthorItems = ({ items, loading }) => {
  if (loading) {
    return (
      <div className="row">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <p>This author has no items.</p>;
  }

  return (
    <div className="row">
      {items.map((item) => (
        <div className="col-lg-3 col-md-6" key={item.nftId}>
          <div className="nft__item">
            <div className="nft__item_wrap">
              <Link to={`/item/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>            
            <div className="nft__item_info">
              <h4>{item.title}</h4>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i> <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorItems;
