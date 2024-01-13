"use client";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { ArrowProps } from "react-multi-carousel";
import Carousel from "react-multi-carousel";
export const CustomRightArrow = ({ onClick, ...rest }: ArrowProps) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className="absolute top-1/2 transform -translate-y-1/2 right-1 p-2 bg-gray-900 bg-opacity-50 rounded-full z-10"
    >
      <ChevronsRight size={28} color="white" />
    </button>
  );
};
export const CustomLeftArrow = ({ onClick, ...rest }: ArrowProps) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className="absolute top-1/2 transform -translate-y-1/2 left-1 p-2 bg-gray-900 bg-opacity-50 rounded-full z-10"
    >
      <ChevronsLeft size={28} color="white" />
    </button>
  );
};
export const CarouselComp = Carousel;
