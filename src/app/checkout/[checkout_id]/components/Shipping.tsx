import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowRight } from "lucide-react";

interface ShippingProps {
  chnageVariantFunc: (x: string) => void;
}

const Shipping = ({ chnageVariantFunc }: ShippingProps) => {
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
      division: z.enum(
        divisionIds as unknown as readonly [string, ...string[]]
      ),
      district: z
        .enum(districtIds as unknown as readonly [string, ...string[]])
        .optional(),
      address: z.string().min(3, { message: "Shipping address required" }),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      division: "dhaka",
      address: "",
    },
  });

  const divisionValue = form.watch("division");

  useEffect(() => {
    if (divisionValue !== "sub-dhaka") {
      form.setValue("district", undefined);
    }
  }, [divisionValue]);

  const handleShippingDetailsSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    chnageVariantFunc("payment");
  };
  return (
    <Card className="max-w-full">
      <CardHeader>
        <CardTitle>Shipping Details</CardTitle>
        <CardDescription>Fill out the form with shipping info</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleShippingDetailsSubmit)}
            className=" space-y-6"
          >
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
                    {divisionValue === "outside-dhaka" && "Outside Dhaka"})
                  </TableCell>
                  <TableCell className="text-right">
                    {divisionValue === "dhaka" && "60৳"}
                    {divisionValue === "sub-dhaka" && "120৳"}
                    {divisionValue === "outside-dhaka" && "150৳"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <Button>
                <span>Proceed to pay</span>
                <ArrowRight />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Shipping;
