// 'use server'
'use server';

/**
 * @fileOverview An AI agent that suggests shopkeepers for delivery based on past order history.
 *
 * - suggestShopkeepersForDelivery - A function that handles the shopkeeper suggestion process.
 * - SuggestShopkeepersInput - The input type for the suggestShopkeepersForDelivery function.
 * - SuggestShopkeepersOutput - The return type for the suggestShopkeepersForDelivery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestShopkeepersInputSchema = z.object({
  deliveryHistory: z
    .string()
    .describe(
      'A record of past deliveries, including shopkeeper name, date, and quantity delivered.'
    ),
  currentDate: z.string().describe('The current date.'),
});
export type SuggestShopkeepersInput = z.infer<typeof SuggestShopkeepersInputSchema>;

const SuggestShopkeepersOutputSchema = z.object({
  suggestedShopkeepers: z
    .string()
    .describe(
      'A list of shopkeepers who should be considered for delivery on the current date, based on the provided delivery history.'
    ),
});
export type SuggestShopkeepersOutput = z.infer<typeof SuggestShopkeepersOutputSchema>;

export async function suggestShopkeepersForDelivery(
  input: SuggestShopkeepersInput
): Promise<SuggestShopkeepersOutput> {
  return suggestShopkeepersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestShopkeepersPrompt',
  input: {schema: SuggestShopkeepersInputSchema},
  output: {schema: SuggestShopkeepersOutputSchema},
  prompt: `You are an AI assistant that analyzes delivery history and suggests which shopkeepers should be considered for delivery on the current date.

  Analyze the following delivery history and suggest a list of shopkeepers for delivery today, {{{currentDate}}}.

  Delivery History:
  {{deliveryHistory}}

  Consider factors such as the date of the last delivery, the quantity delivered, and any patterns or trends in the delivery schedule. Return only shopkeeper names.
  `,
});

const suggestShopkeepersFlow = ai.defineFlow(
  {
    name: 'suggestShopkeepersFlow',
    inputSchema: SuggestShopkeepersInputSchema,
    outputSchema: SuggestShopkeepersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
