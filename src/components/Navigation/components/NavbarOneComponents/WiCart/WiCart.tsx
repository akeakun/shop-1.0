import { Badge } from "@nextui-org/badge";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Button } from "@nextui-org/button";
import CartTrigger from "@/components/Navigation/components/NavbarOneComponents/WiCart/Cart/components/CartTrigger";
const WiCart = () => {
  return (
    <>
      <section>{/* Favorite */}</section>
      <section>
        <CartTrigger/>
      </section>
    </>
  );
};
export default WiCart;

// <Badge content="5" color="danger">
// </Badge>
