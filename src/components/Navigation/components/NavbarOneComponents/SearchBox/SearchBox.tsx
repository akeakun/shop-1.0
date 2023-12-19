

// import {Button} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import SearchInput from "./Mobile/components/components/SearchInput";
import MobileSearch from "./Mobile/MobileSearch";
import DesktopSearch from "./Desktop/DesktopSearch";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const SearchBox = () => {

  return (
    <>
    <MobileSearch/>
    <DesktopSearch/>
    
    </>
  );
};
export default SearchBox;
