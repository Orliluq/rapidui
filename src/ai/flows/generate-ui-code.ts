// use server'
"use server";
/**
 * @fileOverview Generates UI code snippets based on a text description.
 *
 * - generateUiCode - A function that generates UI code from a description.
 * - GenerateUiCodeInput - The input type for the generateUiCode function.
 * - GenerateUiCodeOutput - The return type for the generateUiCode function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const GenerateUiCodeInputSchema = z.object({
  description: z
    .string()
    .describe(
      "A description of the UI element or layout to generate code for."
    ),
  uiFramework: z
    .enum(["React"])
    .default("React")
    .describe("The UI framework to generate code for."),
  styleGuide: z
    .string()
    .optional()
    .describe(
      "Additional instructions on the style such as the color and typography."
    )
});
export type GenerateUiCodeInput = z.infer<typeof GenerateUiCodeInputSchema>;

const GenerateUiCodeOutputSchema = z.object({
  code: z.string().describe("The generated UI code snippet.")
});
export type GenerateUiCodeOutput = z.infer<typeof GenerateUiCodeOutputSchema>;

export async function generateUiCode(
  input: GenerateUiCodeInput
): Promise<GenerateUiCodeOutput> {
  return generateUiCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: "generateUiCodePrompt",
  input: { schema: GenerateUiCodeInputSchema },
  output: { schema: GenerateUiCodeOutputSchema },
  prompt: `You are a UI code generation expert.  You will generate UI code snippets based on the description provided.

  Description: {{{description}}}
  UI Framework: {{{uiFramework}}}
  Style Guide: {{{styleGuide}}}

  Ensure the code is well-formatted and includes all necessary imports.
  Do not include any explanatory text or comments in the code, only the code itself.
  `
});

const generateUiCodeFlow = ai.defineFlow(
  {
    name: "generateUiCodeFlow",
    inputSchema: GenerateUiCodeInputSchema,
    outputSchema: GenerateUiCodeOutputSchema
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
