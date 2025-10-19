"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { XCircle } from "lucide-react";

export default function CheckoutCancelledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <XCircle className="h-6 w-6 text-red-600" />
            Payment Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your payment was not completed. You can try again or contact support.
          </p>
          <Button asChild className="w-full">
            <Link href="/checkout">Return to Checkout</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/support">Contact Support</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
