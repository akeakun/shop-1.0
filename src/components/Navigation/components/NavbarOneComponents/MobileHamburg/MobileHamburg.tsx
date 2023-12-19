import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const MobileHamburg = () => {
  return (
    <Sheet>
      <SheetTrigger className=" rounded-full hover:bg-gray-800 p-2"><Menu /></SheetTrigger>
      <SheetContent className=" bg-mainBg" side={"left"}>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default MobileHamburg;
