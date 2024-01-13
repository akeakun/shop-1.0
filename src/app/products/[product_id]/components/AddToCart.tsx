import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CartContext } from "@/lib/Hooks/client/Cart";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useContext, useState } from "react";

type AddToCartTypes = {
  product: any;
  size: any;
};

const AddToCart = ({ product, size }: AddToCartTypes) => {
  const [qty, setQty] = useState(1);
  const { toast } = useToast();
  const { cartItems, addToCart } = useContext(CartContext);
  const [cartErrorMsg, setCartErrorMsg] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const setQtyFunc = (x: string) => {
    const recievedQty = parseInt(x);
    if (recievedQty < 1 || x === "") {
      setQty((prevState) => {
        return 1;
      });
    } else {
      setQty((prevState) => {
        return recievedQty;
      });
    }
  };
  const decrease = () => {
    if (qty === 0) {
      setQty((prevState) => {
        return 1;
      });
    } else {
      setQty((prevState) => {
        return prevState - 1;
      });
    }
  };
  const increase = () => {
    setQty((prevState) => {
      return prevState + 1;
    });
  };

  const AddToCart = () => {
    setIsWorking(true);
    if (qty >= size.stock) {
      setCartErrorMsg(
        `you can add a maximum of ${size.stock} ${product.title} to your cart`
      );
      setIsWorking(false);
      return;
    }
    const prodToAdd = {
      id: product.uid,
      name: product.title,
      size: size.name,
      price: product.price,
      quantity: qty,
      category: product.category,
      image: product.main_display_image,
    };
    try {
      addToCart(prodToAdd);
      setCartErrorMsg("");
      toast({
        title: "Item added successfully",
        description: "the item was added to your bag with the set quantity",
      });
      setIsWorking(false);
    } catch (error: any) {
      return;
    }
  };

  return (
    <div>
      <p className="py-1">Quantity</p>
      <div className="flex items-center h-10 w-fit">
        <button
          className="h-10 w-10 p-2 border border-r-0 border-gray-800 text-text hover:bg-gray-700 hover:text-buttonText"
          onClick={() => {
            decrease();
          }}
        >
          <Minus />
        </button>
        <input
          value={qty}
          typeof="number"
          onChange={(e) => {
            setQtyFunc((e.target as HTMLInputElement).value);
          }}
          type="text"
          className="h-10 w-16 text-center bg-transparent border-y border-gray-900"
        />
        <button
          className="h-10 w-10 p-2 border border-l-0 border-gray-800 text-text hover:bg-gray-700 hover:text-buttonText"
          onClick={() => {
            increase();
          }}
        >
          <Plus />
        </button>
      </div>
      <div>
        <p className="text-red-500 text-xs py-2 text-center">{cartErrorMsg}</p>
        <Button
          disabled={isWorking}
          className=" uppercase w-full space-x-2 rounded-sm my-2"
          onClick={() => {
            AddToCart();
          }}
        >
          <span>add to bag</span> <ShoppingBag />
        </Button>
      </div>
    </div>
  );
};
export default AddToCart;
