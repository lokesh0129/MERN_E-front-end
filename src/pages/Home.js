import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import FilterProduct from "../components/FilterProduct";
import { Link } from "react-router-dom";
import Slideshow from "../components/SlideShow";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  //console.log(productData)
  const homeProductList = productData.slice(0, 4);
  //let length=productData.length
  //const homeProductList = [productData[Math.floor(Math.random()*length)],productData[Math.floor(Math.random()*length)],productData[Math.floor(Math.random()*length)],productData[Math.floor(Math.random()*length)]]

  const vegetableProductList = productData.filter((e) => {
    return e.category === "Vegetables";
  });
  //console.log(vegetableProductList)

  const slideProductRef = useRef();
  const nextProduct = () => {
    //document.getElementById("vegscroll").scrollLeft += 120
    slideProductRef.current.scrollLeft += 120;
  };

  const prevProduct = () => {
    //document.getElementById("vegscroll").scrollLeft+= -120
    slideProductRef.current.scrollLeft += -120;
  };

  const loadingArray = [null, null, null, null, null, null];

  const categoryList = [
    ...new Set(
      productData.map((e) => {
        return e.category;
      })
    ),
  ];
  //console.log(categoryList)

  // filter data
  const [filterBy, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    const filter = productData.filter((e) => {
      return e.category.toLowerCase() === category.toLowerCase();
    });
    setDataFilter(() => {
      return [...filter];
    });
  };
  

  return (
    <div className="px-3">
      <div className="md:flex gap-4 py-1 ">
        <div className="md:w-1/2 py-4">
          <div className="flex   gap-3 bg-red-400 w-36   items-center rounded-full">
            <p className="text-sm font-medium px-2">Bike Delivery</p>
            <img
              src="https://www.pngitem.com/pimgs/m/485-4853792_white-motorbike-icon-delivery-png-transparent-png.png"
              alt=""
              className=" w-8  rounded-full h-7"
            />
          </div>
          {/* <h2 className='text-4xl font-serif font-bold md:text-7xl py-3'>The Fastest delivery to <span className='text-red-500 '>Your Home</span></h2>
            <p className='py-3 max-w-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis saepe laudantium pariatur, perferendis aliquid excepturi! Qui praesentium sapiente porro ut, sint ea unde perspiciatis tenetur aliquam dolorem, magnam molestias animi.
            Possimus, Nulla voluptatem tempora error recusandae, hic doloremque distinctio voluptas ipsam reiciendis ipsum.  
            </p> */}
            <Slideshow />
           
          <Link to={"/cart"}>
            <button className="bg-green-800 text-white px-5 py-1 rounded-lg w-40">
              Order
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-4 justify-center">
          {homeProductList[0]
            ? homeProductList.map((e) => {
                return (
                  <HomeCard
                    key={e._id}
                    id={e._id}
                    image={e.image}
                    name={e.name}
                    price={e.price}
                    category={e.category}
                  />
                );
              })
            : loadingArray.slice(0, 4).map((e) => {
                return <HomeCard />;
              })}
        </div>
      </div>
      <div className="">
        <h2 className="font-bold text-2xl text-slate-800 mb-3 ">
          Fresh vegetable
        </h2>
        <div
          id="vegscroll"
          ref={slideProductRef}
          className="flex gap-3 overflow-x-scroll scrollbar-hide relative"
        >
          <button
            className="bg-gray-200 mr-1 sticky left-0 flex items-center justify-center hover:bg-gray-500"
            onClick={prevProduct}
          >
            <AiOutlineDoubleLeft />
          </button>
          {vegetableProductList[0]
            ? vegetableProductList.map((e) => {
                return (
                  <CardFeature
                    key={e._id}
                    id={e._id}
                    name={e.name}
                    category={e.category}
                    price={e.price}
                    image={e.image}
                  />
                );
              })
            : loadingArray.map((e) => {
                return <CardFeature />;
              })}
          <button
            className="bg-gray-200 hover:bg-gray-500 flex items-center justify-center  sticky right-0  ml-3"
            onClick={nextProduct}
          >
            <AiOutlineDoubleRight />
          </button>
        </div>
      </div>

      <div className="my-5">
        <div className="flex gap-4 justify-center overflow-x-scroll scrollbar-hide">
          {categoryList[0] &&
            categoryList.map((e) => {
              return (
                <FilterProduct
                  category={e}
                  onClick={() => {
                    handleFilterProduct(e);
                  }}
                />
              );
            })}
        </div>
        <h2 className="font-bold text-2xl text-slate-800 mb-3 ">
          Your product
        </h2>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {dataFilter.map((e) => {
            return (
              <CardFeature
                key={e._id}
                id={e._id}
                image={e.image}
                name={e.name}
                price={e.price}
                category={e.category}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
