"use client";

import type React from "react";
import { useState, useEffect } from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Checkbox } from "@/ui/checkbox";
import { Separator } from "@/ui/separator";
import { Badge } from "@/ui/badge";
import { ArrowLeft, CreditCard, Smartphone, Truck, Shield, Currency } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  initiatePaymentAction,
  initiateStripeCheckoutAction,
  // initiateStripePaymentAction,
  verifyPaymentAction,
} from "./actions";
import { useCart } from "@/hooks/use-cart";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  currency: "EUR" | "INR";
  sameAsBilling: boolean;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

enum PaymentMethod {
  Razorpay = "razorpay",
  Stripe = "stripe",
}

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, loading, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    currency: "EUR",
    sameAsBilling: true,
    shippingAddress: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined
  );
  const [processing, setProcessing] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    if (!document.getElementById("razorpay-script")) {
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const supabase = createClient();

  const handleInputChange = (
    field: keyof CheckoutForm,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingChange = (
    field: keyof CheckoutForm["shippingAddress"],
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, [field]: value },
    }));
  };

  const createOrder = async (paymentIntentId?: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const orderData = {
      user_id: user?.id,
      total_amount_eur: totalPrice.eur,
      total_amount_inr: totalPrice.inr,
      currency: form.currency,
      status: "pending",
      shipping_address: form.sameAsBilling ? null : form.shippingAddress,
      billing_address: {
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
      stripe_payment_intent_id: paymentIntentId, // For Razorpay/Stripe
    };

    const { error } = await supabase.from("orders").insert(orderData);
    if (error) throw error;

    clearCart();
  };

  const handleRazorpayPayment = async () => {
    try {
      setProcessing(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not logged in");

      // Call your server action securely (executes on server)
      const order = await initiatePaymentAction(user.id, items, selectedTotal);

      // Now open Razorpay checkout with the returned order.id
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Orchard Elixirs",
        description: `Order for ${totalItems} items`,
        order_id: order.orderId, // from server
        handler: async (response: any) => {
          // Verify signature securely on server
          await verifyPaymentAction({
            dbOrderId: order.orderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          clearCart();
          alert("Payment successful! Check your email for confirmation.");
          window.location.href = "/order-confirmation";
        },
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#10b981" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

 
  const handleStripePayment = async () => {
  try {
    setProcessing(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not logged in");

    const paymentInit = await initiateStripeCheckoutAction(
      user.id,
      items,
      selectedTotal,
      form.currency
    );

    // Redirect user to Stripe-hosted checkout page
    window.location.href = paymentInit.url;
  } catch (error) {
    console.error("Stripe payment failed:", error);
    alert("Payment failed. Please try again.");
  } finally {
    setProcessing(false);
  }
};



  const selectedTotal =
    form.currency === "EUR" ? totalPrice.eur : totalPrice.inr;
  const currencySymbol = form.currency === "EUR" ? "€" : "₹";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.firstName || !form.address) {
      alert("Please fill required fields.");
      return;
    }

    setProcessing(true);
    switch (paymentMethod) {
      case PaymentMethod.Razorpay:
        handleRazorpayPayment();
        break;
      case PaymentMethod.Stripe:
        handleStripePayment();
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* <Header /> */}
        <div className="container px-4 py-16">
          <div className="text-center">Loading checkout...</div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        {/* <Header /> */}
        <div className="container px-4 py-16 text-center space-y-4">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">
            Add some products before proceeding to checkout
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form (unchanged) */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                      1
                    </div>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <div></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address (unchanged) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                      2
                    </div>
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={form.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={form.postalCode}
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={form.country}
                      onValueChange={(value) =>
                        handleInputChange("country", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address (unchanged) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                      3
                    </div>
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsBilling"
                      checked={form.sameAsBilling}
                      onCheckedChange={(checked) =>
                        handleInputChange("sameAsBilling", checked as boolean)
                      }
                    />
                    <Label htmlFor="sameAsBilling">
                      Same as billing address
                    </Label>
                  </div>

                  {!form.sameAsBilling && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="shippingAddress">Address</Label>
                        <Input
                          id="shippingAddress"
                          value={form.shippingAddress.address}
                          onChange={(e) =>
                            handleShippingChange("address", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shippingCity">City</Label>
                          <Input
                            id="shippingCity"
                            value={form.shippingAddress.city}
                            onChange={(e) =>
                              handleShippingChange("city", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingPostalCode">
                            Postal Code
                          </Label>
                          <Input
                            id="shippingPostalCode"
                            value={form.shippingAddress.postalCode}
                            onChange={(e) =>
                              handleShippingChange("postalCode", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="shippingCountry">Country</Label>
                        <Select
                          value={form.shippingAddress.country}
                          onValueChange={(value) =>
                            handleShippingChange("country", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            <SelectItem value="IN">India</SelectItem>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method - NEW SECTION */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                      4
                    </div>
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Currency</Label>
                    <Select
                      value={form.currency}
                      onValueChange={(value: "EUR" | "INR") =>
                        handleInputChange("currency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <Label>Choose Payment Method</Label>
                    <div className="space-y-2 mt-2">
                      <div
                        className={`p-3 border rounded-lg cursor-pointer ${
                          paymentMethod === PaymentMethod.Stripe
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary"
                        }`}
                        onClick={() => setPaymentMethod(PaymentMethod.Stripe)}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">
                              Card (Visa/Mastercard)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Secure via Stripe
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`p-3 border rounded-lg cursor-pointer ${
                          paymentMethod === PaymentMethod.Razorpay
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary"
                        }`}
                        onClick={() => setPaymentMethod(PaymentMethod.Razorpay)}
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">
                              UPI (Google Pay, PhonePe)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Instant & free via Razorpay
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary (unchanged) */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-12 h-12 rounded border overflow-hidden">
                          <img
                            src={item.product?.image_url || "/placeholder.svg"}
                            alt={item.product?.name || "Product"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-medium text-sm leading-tight">
                            {item.product?.name}
                          </h4>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Qty: {item.quantity}
                            </span>
                            <span>
                              {currencySymbol}
                              {form.currency === "EUR"
                                ? (
                                    (item.product?.price_eur || 0) *
                                    item.quantity
                                  ).toFixed(2)
                                : (
                                    (item.product?.price_inr || 0) *
                                    item.quantity
                                  ).toFixed(0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>
                        {currencySymbol}
                        {selectedTotal.toFixed(form.currency === "EUR" ? 2 : 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>
                      {currencySymbol}
                      {selectedTotal.toFixed(form.currency === "EUR" ? 2 : 0)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={processing}
                  >
                    {processing ? (
                      "Processing..."
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Complete Order ({currencySymbol}
                        {selectedTotal.toFixed(form.currency === "EUR" ? 2 : 0)}
                        )
                      </>
                    )}
                  </Button>

                  {/* Security Features */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Secure SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span>Free shipping on orders over €50</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
