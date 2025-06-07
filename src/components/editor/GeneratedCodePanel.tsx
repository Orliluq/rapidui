"use client";

import { useState } from 'react';
import type { DroppedComponentData } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { generateUiCode } from '@/ai/flows/generate-ui-code'; // Assuming this path is correct
import { Lightbulb, Copy, Check } from 'lucide-react';

interface GeneratedCodePanelProps {
  droppedComponents: DroppedComponentData[];
}

export default function GeneratedCodePanel({ droppedComponents }: GeneratedCodePanelProps) {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const buildDescriptionFromComponents = (): string => {
    if (droppedComponents.length === 0) {
      return "An empty UI canvas.";
    }
    const componentDescriptions = droppedComponents.map(comp => {
      let desc = `A ${comp.type.toLowerCase()}`;
      if (comp.props.text) desc += ` with text "${comp.props.text}"`;
      else if (comp.props.placeholder) desc += ` with placeholder "${comp.props.placeholder}"`;
      else if (comp.props.title) desc += ` titled "${comp.props.title}"`;
      else if (comp.props.src) desc += ` displaying an image from source "${comp.props.src}"`;
      return desc;
    });
    return `Generate React component code for a UI layout containing the following elements in order: ${componentDescriptions.join(', ')}. Use TailwindCSS for styling. Wrap in a single parent div.`;
  };

  const handleGenerateCode = async () => {
    setIsLoading(true);
    setGeneratedCode('');
    const description = buildDescriptionFromComponents();
    try {
      const result = await generateUiCode({
        description,
        uiFramework: 'React', // Or make this configurable
        styleGuide: "Modern, clean design using TailwindCSS. Ensure components are functional and well-structured. Use primary color for main actions if any, and accent for highlights.",
      });
      setGeneratedCode(result.code);
      toast({ title: "Code Generated", description: "AI has generated the UI code." });
    } catch (error) {
      console.error("Error generating code:", error);
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      });
      setGeneratedCode('// Error generating code. Please check console.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setIsCopied(true);
      toast({ title: "Copied!", description: "Code copied to clipboard." });
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy code:", err);
      toast({ title: "Copy Failed", description: "Could not copy code to clipboard.", variant: "destructive" });
    });
  };

  return (
    <ScrollArea className="h-full p-1">
      <div className="p-4 space-y-4">
        <Button onClick={handleGenerateCode} disabled={isLoading || droppedComponents.length === 0} className="w-full">
          <Lightbulb className="mr-2 h-4 w-4" />
          {isLoading ? 'Generating...' : 'Generate Code with AI'}
        </Button>
        {generatedCode && (
          <div className="relative">
            <Textarea
              value={generatedCode}
              readOnly
              className="min-h-[250px] font-code text-xs bg-muted/50"
              aria-label="Generated UI Code"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyCode}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              aria-label="Copy code"
            >
              {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
        {droppedComponents.length === 0 && !generatedCode && (
           <p className="text-sm text-muted-foreground text-center pt-4">Add components to the canvas to generate code.</p>
        )}
      </div>
    </ScrollArea>
  );
}
