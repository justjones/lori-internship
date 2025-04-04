import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getNewItems } from "services/newItemsServices";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import CountdownTimer from "components/common/CountdownTimer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/customSlider.css";
import NavButton from "components/common/NavButton";
import SkeletonCard from "components/common/SkeletonCard";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getNewItems();
        console.log("Fetched new items:", items);
        setNewItems(items);
      } catch (err) {
        setError("Something went wrong while fetching new items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>

            <div className="new-items-slider" style={{ position: "relative" }}>
              <NavButton
                direction="left"
                onClick={() => sliderRef.current?.slickPrev()}
                onHold={() => sliderRef.current?.slickPrev()}
                bgColor="bg-purple-600"
                shape="rounded-xl"
                offset="10px"
                iconSize={24}
              />
              <NavButton
                direction="right"
                onClick={() => sliderRef.current?.slickNext()}
                onHold={() => sliderRef.current?.slickNext()}
                bgColor="bg-purple-600"
                shape="rounded-xl"
                offset="10px"
                iconSize={24}
              />
              <Slider {...sliderSettings} ref={sliderRef}>
                {new Array(4).fill(0).map((_, index) => (
                  <div key={index}>
                    <SkeletonCard />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="new-items-slider" style={{ position: "relative" }}>
            <NavButton
              direction="left"
              onClick={() => sliderRef.current?.slickPrev()}
              onHold={() => sliderRef.current?.slickPrev()}
              bgColor="bg-purple-600"
              shape="rounded-xl"
              offset="10px"
              iconSize={24}
            />
            <NavButton
              direction="right"
              onClick={() => sliderRef.current?.slickNext()}
              onHold={() => sliderRef.current?.slickNext()}
              bgColor="bg-purple-600"
              shape="rounded-xl"
              offset="10px"
              iconSize={24}
            />

            <Slider {...sliderSettings} ref={sliderRef}>
              {newItems.map((item) => (
                <div key={item.id}>
                  <div className="nft_coll nft__item" style={{ position: "relative" }}>
                    <CountdownTimer expiryDate={item.expiryDate} />

                    {/* Author Info */}
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId || item.creatorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.creatorName || "Unknown"}`}
                      >
                        <img
                          className="lazy"
                          src={item.authorImage || item.creatorImage || AuthorImage}
                          alt={item.creatorName || "Author"}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {/* NFT Image + Buttons */}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="#">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item/${item.nftId}`}>
                        <img
                          src={item.nftImage || nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    {/* Info Section */}
                    <div className="nft__item_info">
                      <Link to={`/item/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price?.toFixed(2)} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
