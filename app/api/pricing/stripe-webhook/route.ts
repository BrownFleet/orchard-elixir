import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/client";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const stripe = getStripeClient();

  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

if (event.type === "payment_intent.succeeded") {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;

  try {
    // Update the order in Supabase based on stripe_payment_intent_id
    const { error } = await supabase
      .from("orders")
      .update({ status: "completed" })
      .eq("stripe_payment_intent_id", paymentIntent.id); // use `id`, not payment_intent

    if (error) throw error;
    console.log("Order updated successfully for payment:", paymentIntent.id);
  } catch (err) {
    console.error("Error updating order in Supabase:", err);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}


  return NextResponse.json({ received: true });
}
