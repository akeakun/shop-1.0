import { useContext, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import isMobilePhone from "validator/lib/isMobilePhone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/Header/Header";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { myImageLoader } from "@/lib/Hooks/client/ImageLoader";
import { CheckOutHandler } from "@/lib/Hooks/server/CHeckOutHandler";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { CartContext } from "@/lib/Hooks/client/Cart";
type Product = {
  name: string;
  price: number;
  dp: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
  size: string;
  quantity: number;
};
interface CheckoutInputProps {
  cart: { products: Product[]; total: number };
  checkout_id: string;
}

const divisions = [
  {
    _id: "dhaka",
    division: "Dhaka",
  },
  {
    _id: "sub-dhaka",
    division: "Sub Dhaka",
  },
  {
    _id: "outside-dhaka",
    division: "Outside Dhaka",
  },
];
const districts = [
  { district: "Faridpur", _id: "faridpur" },
  { district: "Gazipur", _id: "gazipur" },
  { district: "Gopalganj", _id: "gopalganj" },
  { district: "Kishoreganj", _id: "kishoreganj" },
  { district: "Madaripur", _id: "madaripur" },
  { district: "Manikganj", _id: "manikganj" },
  { district: "Munshiganj", _id: "munshiganj" },
  { district: "Narayanganj", _id: "narayanganj" },
  { district: "Narsingdi", _id: "narsingdi" },
  { district: "Rajbari", _id: "rajbari" },
  { district: "Shariatpur", _id: "shariatpur" },
  { district: "Tangail", _id: "tangail" },
];
const divisionIds = divisions.map((item) => item._id);
const districtIds = districts.map((item) => item._id);

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "Enter First name" }),
    lastName: z.string().min(1, { message: "Enter Last name" }),
    emailAddress: z.string().email(),
    phoneNumber: z.string().refine((value) => isMobilePhone(value, ["bn-BD"]), {
      message: "Enter a valid phone number",
    }),
    division: z.enum(divisionIds as unknown as readonly [string, ...string[]]),
    district: z
      .enum(districtIds as unknown as readonly [string, ...string[]])
      .optional(),
    address: z.string().min(3, { message: "Shipping address required" }),
    paymentMethod: z.enum(["cod", "online"], {
      required_error: "You need to select a notification type.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.division === "sub-dhaka" && !data.district) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "District is required",
        path: ["district"],
      });
    }
    return true;
  });

const CheckoutInput = ({ cart, checkout_id }: CheckoutInputProps) => {
  // const [variant, setVariant] = useState("shipping");
  // const changeVariant = (x: string) => {
  //   setVariant((prevState) => {
  //     return x;
  //   });
  // };
  const { clearCart } = useContext(CartContext);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      division: "dhaka",
      address: "",
      paymentMethod: "cod",
    },
  });

  const divisionValue = form.watch("division");
  const paymentMethodValue = form.watch("paymentMethod");

  const shippingCharge = () => {
    if (divisionValue === "dhaka") {
      return 60;
    }
    if (divisionValue === "sub-dhaka") {
      return 120;
    }
    if (divisionValue === "outside-dhaka") {
      return 150;
    }
  };

  useEffect(() => {
    if (divisionValue !== "sub-dhaka") {
      form.setValue("district", undefined);
    }
  }, [divisionValue]);

  const handleCustomerDetailsSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    data.district = data.district || "N/A";

    if (paymentMethodValue === "cod") {
      try {
        CheckOutHandler(data, checkout_id).then((res) => {
          clearCart();
          toast({
            title: "Order placed successfully",
            description: `Your order was placed with the Order ID: ${res}. We will soon reach out for order confirmation`,
          });
          router.replace(`/`);
          // router.push(`/checkout/success/${res}`);
        });
      } catch (error: any) {}
    }

    if (paymentMethodValue === "online") {
    }
  };

  return (
    <>
      <section>
        {/* <ul className="timeline">
          <li>
            <div className="timeline-start timeline-box">Customer Details</div>
            <div className="timeline-middle">
              {variant === "customer" ? (
                <Check
                  strokeWidth={2.5}
                  className="rounded-full bg-gray-300 p-1"
                />
              ) : (
                <CheckCircle2
                  className="rounded-full bg-teal-500"
                  color="white"
                />
              )}
            </div>
            <hr
              className={`${
                variant !== "customer" ? "bg-primary" : "bg-gray-300"
              }`}
            />
          </li>
          <li>
            <hr
              className={`${
                variant !== "customer" ? "bg-primary" : "bg-gray-300"
              }`}
            />
            <div className="timeline-middle">
              {variant !== "customer" && variant !== "shipping" ? (
                <CheckCircle2
                  className="rounded-full bg-teal-500"
                  color="white"
                />
              ) : (
                <Check
                  strokeWidth={2.5}
                  className="rounded-full bg-gray-300 p-1"
                />
              )}
            </div>
            <div className="timeline-start timeline-box">Shipping Details</div>
            <hr
              className={`${
                variant !== "customer" && variant !== "shipping"
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
            />
          </li>
          <li>
            <hr
              className={`${
                variant !== "customer" && variant !== "shipping"
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
            />
            <div className="timeline-middle">
              <Check
                strokeWidth={2.5}
                className="rounded-full bg-gray-300 p-1"
              />
            </div>
            <div className="timeline-start timeline-box">Payment Method</div>
          </li>
        </ul> */}
        {/* {variant === "customer" && ( */}
        {/* <CustomerDetails /> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCustomerDetailsSubmit)}>
            <section className="md:flex">
              <div>
                <Card className="rounded-sm m-1 bg-gray-100">
                  <Header
                    classes={"mt-0 rounded-tl-sm rounded-tr-sm"}
                    head="Customer Details"
                    paragraph="Fill out the form below with customer details"
                  />
                  <CardContent className="space-y-2">
                    <div className="space-y-2">
                      <div className="flex space-x-4">
                        <div className="flex flex-col space-y-1.5">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <Label>*First name</Label>
                                  <FormControl>
                                    <Input
                                      placeholder="First name"
                                      type="text"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <Label>*Last name</Label>
                                  <FormControl>
                                    <Input
                                      placeholder="Last name"
                                      type="text"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="emailAddress"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <Label>*Email Address</Label>
                                <FormControl>
                                  <Input
                                    placeholder="Email address"
                                    type="email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <Label>*Phone number</Label>
                                <FormControl>
                                  <Input
                                    placeholder="Phone number"
                                    type="text"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <FormField
                        control={form.control}
                        name="division"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-full">
                              <Label>*Division</Label>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Dhaka" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {divisions.map((item, index) => (
                                    <SelectItem key={index} value={item._id}>
                                      {item.division}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        }}
                      />
                      {divisionValue === "sub-dhaka" && (
                        <FormField
                          control={form.control}
                          name="district"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-full">
                                <Label>*District</Label>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {districts.map((item, index) => (
                                      <SelectItem key={index} value={item._id}>
                                        {item.district}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            );
                          }}
                        />
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <Label>*Shipping address</Label>
                            <FormControl>
                              <Input
                                placeholder="Shipping address"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        );
                      }}
                    />
                    <Table>
                      <TableBody>
                        <TableRow className="px-0">
                          <TableCell>Shipping charge :</TableCell>
                          <TableCell>
                            ({divisionValue === "dhaka" && "Inside Dhaka"}
                            {divisionValue === "sub-dhaka" && "Sub Dhaka"}
                            {divisionValue === "outside-dhaka" &&
                              "Outside Dhaka"}
                            )
                          </TableCell>
                          <TableCell className="text-right">
                            {shippingCharge()}৳
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="rounded-sm m-1 bg-gray-100">
                  <Header
                    classes={"mt-0 rounded-tl-sm rounded-tr-sm"}
                    head="Payment method"
                    paragraph="Select the payment method"
                  />
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col my-2"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cod" />
                                </FormControl>
                                <FormLabel className="font-normal py-3">
                                  Cash on delivery
                                </FormLabel>
                              </FormItem>
                              {/* <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="online" />
                                </FormControl>
                                <FormLabel className="font-normal py-3">
                                  Online payment
                                </FormLabel>
                              </FormItem> */}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* {paymentMethodValue === "online" && (
                      <>
                        <Label>We accept the following methods:</Label>
                        <div className="p-4 pb-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="40"
                            width="80"
                            viewBox="0 0 120 60"
                          >
                            <g fill="none">
                              <path
                                fill="#DF146E"
                                d="M0 12.296c.297.027.597.08.917.08.301 0 .575-.053.917-.08v9.816c.964-1.647 2.18-2.733 3.967-2.733 3.23 0 4.63 3.206 4.63 6.149 0 3.527-1.882 6.898-5.181 6.898-1.879 0-2.842-1.163-3.257-1.885-.549.477-1.032 1.062-1.559 1.59H0zm1.786 14.426c0 2.863 1.217 4.855 3.208 4.855 2.595 0 3.419-3.472 3.419-5.942 0-2.862-.94-5.118-3.185-5.145-2.613-.025-3.442 3.078-3.442 6.232z"
                              />
                              <path
                                fill="#221F1F"
                                d="M18.866 18.645l-1.949 2.504c1.832 2.681 3.733 5.299 5.572 8.008l1.852 2.909v.147c-.456-.028-.871-.086-1.262-.086-.433 0-.867.058-1.28.086-.505-.932-1.012-1.803-1.584-2.65l-5.001-7.422c-.112-.118-.387-.204-.387-.089v10.16c-.366-.028-.685-.086-1.007-.086-.344 0-.688.058-1.009.086V12.296c.32.029.665.09 1.009.09.321 0 .641-.061 1.007-.09v8.998c.025.172.344.058.573-.173.417-.408.895-1.022 1.215-1.426l5.641-7.4c.296.029.592.09.919.09.273 0 .569-.061.891-.09zm15.175 11.338c0 1.035-.07 1.569 1.284 1.223v.582c-.163.081-.437.211-.687.265-1.193.24-2.182.029-2.364-1.537l-.204.239c-.962 1.114-2.015 1.671-3.397 1.671-1.622 0-3.043-1.273-3.043-3.239 0-3.021 2.08-3.421 4.239-3.818 1.813-.347 2.427-.501 2.427-1.775 0-1.96-.961-3.104-2.681-3.104-1.671 0-2.564 1.248-2.729 1.832h-.251v-1.487c1.1-.871 2.341-1.456 3.69-1.456 2.41 0 3.716 1.456 3.716 4.455zm-1.836-4.375l-.804.187c-1.555.342-3.898.61-3.898 3.023 0 1.668.855 2.493 2.249 2.493.618 0 1.398-.502 1.83-1.007.167-.186.624-.64.624-.824v-3.872zm5.918 4.03c.547 1.039 1.558 1.965 2.63 1.965 1.126 0 2.251-1.011 2.251-2.416 0-3.579-5.412-1.244-5.412-5.885 0-2.546 1.675-3.923 3.739-3.923 1.191 0 2.177.395 2.589.687-.227.61-.411 1.246-.548 1.885h-.207c-.298-.875-1.1-1.755-1.951-1.755-1.143 0-2.084.775-2.084 2.205 0 3.394 5.411 1.589 5.411 5.834 0 2.837-2.199 4.191-4.22 4.191-.937 0-2.065-.295-2.867-.849.186-.636.392-1.272.485-1.939zm9.512-17.342c.298.027.593.08.915.08.302 0 .575-.053.917-.08v9.655c.801-1.621 2.065-2.572 3.693-2.572 2.656 0 3.689 1.829 3.689 5.169v7.666c-.347-.028-.62-.083-.916-.083-.323 0-.621.056-.92.083v-7.057c0-2.943-.595-4.402-2.542-4.402-2.064 0-3.003 1.488-3.003 4.24v7.219c-.341-.028-.614-.083-.917-.083-.321 0-.617.056-.915.083V12.296z"
                              />
                              <path
                                fill="#DF146E"
                                d="M105.814 44.291H65.686c-1.201 0-2.182-.983-2.182-2.184V2.186C63.504.982 64.485 0 65.686 0h40.128c1.203 0 2.184.982 2.184 2.186v39.921c0 1.201-.981 2.184-2.184 2.184"
                              />
                              <path
                                fill="#FFF"
                                d="M95.398 24.251l-14.107-2.246 1.909 8.329zm.572-.682L84.878 8.16l-3.623 13.106zm-15.402-2.482L68.945 6.239l15.221 1.819zm-5.639-6.154l-6.449-6.08h1.695zm24.504 1.15l-2.729 7.403-4.426-6.118zM84.921 30.232l10.71-4.3.454-1.365zm-8.933 7.821l4.589-16.102 2.326 10.479zm24.099-21.914l-1.128 3.056 4.059-.07z"
                              />
                            </g>
                          </svg>
                        </div>
                      </>
                    )} */}
                  </CardContent>
                </Card>
              </div>
              <Card className="rounded-sm m-1 bg-gray-100">
                <Header
                  classes={"mt-0 rounded-tl-sm rounded-tr-sm"}
                  head="Order Details"
                  paragraph=""
                />
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.products.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <Image
                              loader={myImageLoader}
                              src={item.dp.data.attributes.url}
                              alt={""}
                              width={40}
                              height={40}
                            />
                          </TableCell>
                          <TableCell className="text-xs lg:text-sm line-clamp-1 whitespace-nowrap">
                            <p>{item.name}</p>
                            <p>{item.size}</p>
                          </TableCell>
                          <TableCell className=" text-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.price * item.quantity} ৳
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>Sub Total:</TableCell>
                        <TableCell className="text-right font-semibold">
                          {cart.total} ৳
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}>Shipping Charge:</TableCell>
                        <TableCell className="text-right font-semibold">
                          {shippingCharge()} ৳
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}>Total:</TableCell>
                        <TableCell className="text-right font-bold">
                          {cart.total + (shippingCharge() || 0)} ৳
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </CardContent>
              </Card>
            </section>
            <div className="flex justify-end p-4 pb-0">
              <Button>
                <span>Confirm order</span>
                {/* <ArrowRight /> */}
              </Button>
            </div>
          </form>
        </Form>

        {/* )} */}
        {/* {variant === "shipping" && ( */}
        {/* <Shipping /> */}

        {/* )} */}
      </section>
    </>
  );
};

export default CheckoutInput;
