"use client";
import { useState } from "react";
import InputElement from "./components/InputElement";

const MobileSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const HandleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  return (
    <div className="w-full h-full relative lg:hidden">
      <button className=" bg-transparent p-2" onClick={() => HandleClick()}>
        {/* <IoSearch size={28} /> */}
      </button>
      {isOpen && <InputElement setIsOpen={setIsOpen} />}
    </div>
  );
};
export default MobileSearch;
