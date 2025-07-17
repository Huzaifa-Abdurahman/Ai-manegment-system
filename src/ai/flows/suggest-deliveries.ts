'use server';

/**
 * @fileOverview An AI agent that suggests optimal delivery quantities for each shopkeeper.
 *
 * - suggestOptimalDeliveryQuantities - A function that suggests optimal delivery quantities.
 * - SuggestOptimalDeliveryQuantitiesInput - The input type for the suggestOptimalDeliveryQuantities function.
 * - SuggestOptimalDeliveryQuantitiesOutput - The return type for the suggestOptimalDeliveryQuantities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalDeliveryQuantitiesInputSchema = z.object({
  deliveryHistory: z
    .string()
    .describe(
      'A string containing the delivery history data. Each delivery should be on a new line. Include: shopkeeper name, phone, address, number of bars/cartoons, total bill, due bill, and pending payment.'
    ),
  currentDate: z.string().describe('The current date.'),
});
export type SuggestOptimalDeliveryQuantitiesInput = z.infer<
  typeof SuggestOptimalDeliveryQuantitiesInputSchema
>;

const SuggestOptimalDeliveryQuantitiesOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A list of delivery suggestions for each shopkeeper, including the optimal quantity of bars/cartoons. Give reasons for each suggestion.'
    ),
});
export type SuggestOptimalDeliveryQuantitiesOutput = z.infer<
  typeof SuggestOptimalDeliveryQuantitiesOutputSchema
>;

export async function suggestOptimalDeliveryQuantities(
  input: SuggestOptimalDeliveryQuantitiesInput
): Promise<SuggestOptimalDeliveryQuantitiesOutput> {
  return suggestOptimalDeliveryQuantitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalDeliveryQuantitiesPrompt',
  input: {schema: SuggestOptimalDeliveryQuantitiesInputSchema},
  output: {schema: SuggestOptimalDeliveryQuantitiesOutputSchema},
  prompt: `You are an expert delivery quantity optimization specialist.

Analyze the past delivery data provided and suggest the optimal quantity of bars/cartoons for each shopkeeper.
Also suggest shopkeepers to deliver to.

Consider factors such as:

- Past order history
- Payment history (due bills, pending payments)
- Current date: {{{currentDate}}}

Delivery History:
{{{deliveryHistory}}}`,
});

const suggestOptimalDeliveryQuantitiesFlow = ai.defineFlow(
  {
    name: 'suggestOptimalDeliveryQuantitiesFlow',
    inputSchema: SuggestOptimalDeliveryQuantitiesInputSchema,
    outputSchema: SuggestOptimalDeliveryQuantitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
