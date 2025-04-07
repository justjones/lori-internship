import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <Landing /> {/* Already uses fade-up/fade-in internally */}

        {/* Intro (fade-up) */}
        <div data-aos="fade-up">
          <LandingIntro />
        </div>

        {/* Hot Collections (fade-up) */}
        <div data-aos="fade-up" data-aos-delay="100">
          <HotCollections />
        </div>

        {/* New Items (fade-up) */}
        <div data-aos="fade-up" data-aos-delay="200">
          <NewItems />
        </div>

        {/* Top Sellers (fade-up) */}
        <div data-aos="fade-up" data-aos-delay="300">
          <TopSellers />
        </div>

        {/* Browse by Category (fade-left) */}
        <div data-aos="fade-left" data-aos-delay="400">
          <BrowseByCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;
