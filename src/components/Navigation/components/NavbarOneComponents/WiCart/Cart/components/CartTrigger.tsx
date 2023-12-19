import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
const CartTrigger = () => {
  return (
    <Sheet>
      <SheetTrigger className="relative hover:bg-gray-800 rounded-full p-2">
        <div className="absolute top-0 right-0 p-1 badge badge-secondary">2</div>
        <ShoppingBag />
      </SheetTrigger>
      <SheetContent className=" bg-mainBg">
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
export default CartTrigger;
