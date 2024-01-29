import axios from "axios";

type PageTypes = {
  params: { order_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const page = ({params}: PageTypes) => {
  const orderID = params.order_id
  return (
    <div>Success page</div>
  )
}

export default page