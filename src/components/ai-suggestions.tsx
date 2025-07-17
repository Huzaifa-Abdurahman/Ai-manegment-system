"use client";

import { useState } from "react";
import { useDeliveries, Delivery } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { suggestOptimalDeliveryQuantities } from "@/ai/flows/suggest-deliveries";
import { suggestShopkeepersForDelivery } from "@/ai/flows/suggest-shopkeepers-for-delivery";
import { Loader2, Lightbulb, UserCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AiSuggestions() {
  const { deliveries } = useDeliveries();
  const [loading, setLoading] = useState(false);
  const [quantitySuggestions, setQuantitySuggestions] = useState<string | null>(null);
  const [shopkeeperSuggestions, setShopkeeperSuggestions] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatDeliveryHistory = (history: Delivery[]): string => {
    return history
      .map(
        (d) =>
          `Shopkeeper: ${d.shopkeeperName}, Phone: ${d.phone}, Address: ${d.address}, ` +
          `Date: ${d.date}, Bars: ${d.bars}, Cartoons: ${d.cartoons}, Total Bill: ${d.totalBill}, ` +
          `Due Bill: ${d.dueBill}, Pending Payment: ${d.pendingPayment}`
      )
      .join("\n");
  };

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError(null);
    setQuantitySuggestions(null);
    setShopkeeperSuggestions(null);

    if (deliveries.length === 0) {
        setError("No delivery history available to make suggestions.");
        setLoading(false);
        return;
    }

    try {
      const deliveryHistory = formatDeliveryHistory(deliveries);
      const currentDate = new Date().toISOString().split('T')[0];

      const [quantityRes, shopkeeperRes] = await Promise.all([
         suggestOptimalDeliveryQuantities({ deliveryHistory, currentDate }),
         suggestShopkeepersForDelivery({ deliveryHistory, currentDate })
      ]);

      if (quantityRes?.suggestions) {
        setQuantitySuggestions(quantityRes.suggestions);
      }
      if (shopkeeperRes?.suggestedShopkeepers) {
        setShopkeeperSuggestions(shopkeeperRes.suggestedShopkeepers);
      }

    } catch (err) {
      console.error(err);
      setError("Failed to get suggestions from AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Button onClick={handleGetSuggestions} disabled={loading || deliveries.length === 0}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Get AI Suggestions"
          )}
        </Button>
        {deliveries.length === 0 && <p className="text-sm text-muted-foreground mt-2">Add some deliveries first to enable suggestions.</p>}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        {shopkeeperSuggestions && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <UserCheck className="h-6 w-6 text-primary" />
                        Suggested Shopkeepers for Today
                    </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert whitespace-pre-wrap">
                    <p>{shopkeeperSuggestions}</p>
                </CardContent>
            </Card>
        )}

        {quantitySuggestions && (
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Lightbulb className="h-6 w-6 text-primary" />
                        Optimal Delivery Suggestions
                    </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert whitespace-pre-wrap">
                    <p>{quantitySuggestions}</p>
                </CardContent>
            </Card>
        )}
      </div>

    </div>
  );
}
