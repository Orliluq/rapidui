'use server';

/**
 * @fileOverview Suggests appropriate and descriptive names for UI components based on their type and context.
 *
 * - suggestComponentName - A function that suggests a component name.
 * - SuggestComponentNameInput - The input type for the suggestComponentName function.
 * - SuggestComponentNameOutput - The return type for the suggestComponentName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestComponentNameInputSchema = z.object({
  componentType: z
    .string()
    .describe('The type of the UI component (e.g., button, input field, image).'),
  componentDescription: z
    .string()
    .optional()
    .describe('A description of the UI component and its purpose.'),
  existingComponentNames: z
    .array(z.string())
    .optional()
    .describe('A list of existing component names in the project.'),
});
export type SuggestComponentNameInput = z.infer<typeof SuggestComponentNameInputSchema>;

const SuggestComponentNameOutputSchema = z.object({
  suggestedName: z.string().describe('A suggested name for the UI component.'),
  reasoning: z
    .string()
    .optional()
    .describe('The reasoning behind the suggested name.'),
});
export type SuggestComponentNameOutput = z.infer<typeof SuggestComponentNameOutputSchema>;

export async function suggestComponentName(
  input: SuggestComponentNameInput
): Promise<SuggestComponentNameOutput> {
  return suggestComponentNameFlow(input);
}

const suggestComponentNamePrompt = ai.definePrompt({
  name: 'suggestComponentNamePrompt',
  input: {schema: SuggestComponentNameInputSchema},
  output: {schema: SuggestComponentNameOutputSchema},
  prompt: `You are a UI component naming expert.  Given the type and description of a UI component, you will suggest a suitable and descriptive name for the component.

  Component Type: {{{componentType}}}
  Description: {{{componentDescription}}}
  Existing Component Names: {{#if existingComponentNames}}{{#each existingComponentNames}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}

  Please suggest a name that is clear, concise, and reflects the component's purpose.  Consider existing component names to avoid duplicates and maintain consistency.
  Return the suggested name and reasoning.
  `,
});

const suggestComponentNameFlow = ai.defineFlow(
  {
    name: 'suggestComponentNameFlow',
    inputSchema: SuggestComponentNameInputSchema,
    outputSchema: SuggestComponentNameOutputSchema,
  },
  async input => {
    const {output} = await suggestComponentNamePrompt(input);
    return output!;
  }
);
