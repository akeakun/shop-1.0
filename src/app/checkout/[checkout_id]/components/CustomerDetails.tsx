import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import isMobilePhone from "validator/lib/isMobilePhone";

type CustomerDetailsCompProps = {
  chnageVariantFunc: (x: string) => void;
};

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Enter First name" }),
  lastName: z.string().min(1, { message: "Enter Last name" }),
  emailAddress: z.string().email(),
  phoneNumber: z
    .string()
    .refine((value) => isMobilePhone(value, ["bn-BD"]), {
      message: "Enter a valid phone number",
    }),
});

const CustomerDetailsComp = ({
  chnageVariantFunc,
}: CustomerDetailsCompProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
    },
  });

  const handleCustomerDetailsSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    chnageVariantFunc("shipping");
  };

  return (
    <Card className="max-w-full">
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
        <CardDescription>
          Fill out the form below with customer details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCustomerDetailsSubmit)}>
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
            <div className="flex justify-end py-4">
              <Button>
                <span>Shipping</span>
                <ArrowRight />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomerDetailsComp;
