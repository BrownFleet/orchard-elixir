"use server";

import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
});

export async function initiatePaymentAction(
  userId: string,
  items: any[],
  amount: number
) {
  const supabase = await createClient();

  // Insert order in Supabase
  const { data: orderRow, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        items,
        total_amount_inr: amount,
        currency: "INR",
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  // Create Razorpay order (amount in paise, integer)
  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: orderRow.id,
  });

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    dbOrderId: orderRow.id,
  };
}


export async function initiateStripeCheckoutAction(
  userId: string,
  items: any[],
  amount: number,
  currency: "EUR" | "INR"
) {
  const supabase = await createClient();
  const stripe = getStripeClient();

  // Insert order in Supabase
  const { data: orderRow, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        items,
        total_amount_eur: amount,
        currency,
        status: "pending",
        payment_provider: "stripe",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  // Create Stripe Checkout session
  const line_items = items.map((item: any) => ({
    price_data: {
      currency: currency.toLowerCase(),
      product_data: {
        name: item.product.name,
        images: [item.product.image_url],
      },
      unit_amount: Math.round(
        (currency === "EUR" ? item.product.price_eur : item.product.price_inr) * 100
      ),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout-cancelled`,
    metadata: { orderId: orderRow.id },
  });

  return { url: session.url, sessionId: session.id };
}

export async function verifyPaymentAction({
  dbOrderId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: {
  dbOrderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) {
  // ...same code
  const supabase = await createClient();

  await supabase
    .from("orders")
    .update({
      status: "paid",
      razorpay_order_id,
      
      razorpay_payment_id,
    })
    .eq("id", dbOrderId); // now this works
}

