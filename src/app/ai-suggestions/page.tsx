"use client"
import AiSuggestions from "@/components/ai-suggestions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AiSuggestionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">AI-Powered Delivery Suggestions</CardTitle>
            <CardDescription>
                Let our Smart Order Tool analyze your delivery history to suggest optimal quantities and identify which shopkeepers need deliveries today.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <AiSuggestions />
        </CardContent>
      </Card>
    </div>
  );
}
