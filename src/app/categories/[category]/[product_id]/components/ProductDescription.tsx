"use client";
import { useState } from "react";
import AddToCart from "./AddToCart";

type ProductDescriptionTypes = {
  product: any
}

const ProductDescription = ({product}: ProductDescriptionTypes) => {
  const [currentSize, setCurrentSize] = useState(product.stock[0]);
  const setSize = (x: { name: string; stock: number }) => {
    setCurrentSize((prevState) => {
      return x;
    });
  };
  return (
    <section className="p-4">
      {/* product details */}
      <div>
        <h3>Awesome T-shirt for men above the age of 18</h3>
        <p>1700৳</p>
      </div>
      <div className="flex gap-2 my-2">
        <div className="badge badge-neutral">Stock status:</div>
        {/* <div className="badge badge-secondary badge-outline">
                out of stock
            </div> */}
        <div className="badge  badge-outline">in stock</div>
      </div>
      <div className="flex items-center py-2 my-2">
        <p>Size:</p>
        {product.stock.map((item, index) => (
          <div
            key={index}
            className={`mx-2 px-2 rounded-sm border border-gray-800 cursor-pointer ${
              item.name === currentSize.name && "bg-secNav text-buttonText"
            }`}
            onClick={() => {
              setSize(item);
            }}
          >
            <p className="text-lg">{item.name}</p>
          </div>
        ))}
      </div>
      <AddToCart product={product} size={currentSize} />
    </section>
  );
};
export default ProductDescription;
