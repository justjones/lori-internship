import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import topSellersService from "services/topSellersServices";
import SkeletonTopSeller from "components/common/SkeletonTopSeller";



const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await topSellersService.getTopSellers();
        console.log("Top Sellers API Response:", response.data); 
        setSellers(response.data);
      } catch (error) {
        console.error("Failed to fetch top sellers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">             
                {loading
                  ? Array.from({ length: 12 }).map((_, index) => (
                      <SkeletonTopSeller key={index} />
                    ))
                  : sellers.map((item) => (
                      <li key={item.id}>
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={item.authorImage}
                              alt={item.authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>
                            {item.authorName}
                          </Link>
                          <span>{item.price.toFixed(2)} ETH</span>
                        </div>
                      </li>
                    ))}                
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
  

export default TopSellers;
