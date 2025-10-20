"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface SessionData {
  orderId: string;
  amount: number;
  currency: string;
  items: { name: string; quantity: number; price: number }[];
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
    const { clearCart } = useCart();

  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.error("Failed to fetch session:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Order not found.</p>
      </div>
    );
  }

   useEffect(() => {
    if (session) {
      clearCart(); 
    }
  }, [session]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Thank you for your order. Your payment of {session.currency} {session.amount} has been received.
          </p>
          <div className="text-left space-y-2">
            <h4 className="font-semibold">Order Items:</h4>
            {session.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>{session.currency} {item.price}</span>
              </div>
            ))}
          </div>
          <Button asChild className="w-full">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/orders">View My Orders</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
