import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Redux/Products/Action";
import load from "./loading.gif";
import SingleProductCard from "./SingleProductCard";

const ProductPage = () => {
  const dispatch = useDispatch();

  const productData = useSelector((store) => store.dataReducer.productData);
  const loading = useSelector((store) => store.dataReducer.loading);
  const [category, setCategory] = useState("sofas");

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const categoryData = productData.filter((product) => {
    return product.category.toLowerCase() === category.toLowerCase();
  });

  const redirectToDetail = (id) => {
    console.log(id);
  };

  if (loading) {
    return (
      <div className="py-20 lg:h-65vh flex items-center justify-center">
        <div>
          <img src={load} alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="font-semibold lg:px-20 py-3 md:py-10 px-5">
      <h1 className="text-3xl py-5">{category.toUpperCase()}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5">
        {categoryData.map((product) => (
          <SingleProductCard
            key={product.id}
            product={product}
            redirectToDetail={redirectToDetail}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
