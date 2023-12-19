import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../components/useOnClickOutside";
import ProductsPreview from "./components/SearchedProducts/ProductsPreview";
import { Input } from "@nextui-org/input";
import { IoSearch } from "react-icons/io5";
import DOMPurify, { DOMPurifyI } from "dompurify";

const InputElement = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const fetchData = async () => {
    const sanitizedId = value.replace(/[^a-zA-Z0-9_-]/g, "");

    const response = await fetch(
      `https://shikimori.one/api/animes?search=${
        sanitizedId !== "" ? sanitizedId : "Haikyuu"
      }&limit=6`
    );
    console.log(response.json());
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      fetchData();
      setTimer(null);
    }, 2000);
    setTimer(newTimer);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [value]);

  useOnClickOutside(searchRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      ref={searchRef}
      className={`fixed w-[100vw] left-0 lg:w-auto lg:top-0 lg:relative lg:flex-1 lg:pr-10 transition-all duration-300 $`}
    >
      <section className="w-full">
        <Input
          isClearable
          radius="lg"
          className=" rounded-sm"
          classNames={{
            input: "rounded-sm",
            inputWrapper: "rounded-sm h-full",
          }}
          placeholder="Type to search..."
          endContent={<IoSearch size={28} />}
          value={value}
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
        />
      </section>
      <section className="w-full">
        <ProductsPreview />
      </section>
    </div>
  );
};

export default InputElement;
