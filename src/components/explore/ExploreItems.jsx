import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import exploreService from "services/exploreService";
import CountdownTimer from "components/common/CountdownTimer";
import SkeletonExploreCard from "components/common/SkeletonExploreCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExploreItems = async () => {
      setLoading(true);
      try {
        const data = await exploreService.getExploreItems(filter);
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch explore items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisibleCount(8); // Reset on filter change
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div className="mb-4">
        <select id="filter-items" onChange={handleFilterChange} defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <SkeletonExploreCard key={index} />
        ))
      ) : (
        items.slice(0, visibleCount).map((item) => (
          <div
            key={item.nftId}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              <CountdownTimer expiryDate={item.expiryDate} />

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                      <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                      <a href="#"><i className="fa fa-envelope fa-lg"></i></a>
                    </div>
                  </div>
                </div>
                <Link to={`/item/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title}
                  />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to={`/item/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
