"use client";

import type React from 'react';
import type { DroppedComponentData, UiComponent } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { renderVisualComponent } from './renderVisualComponent';
import { ScrollArea } from '../ui/scroll-area';

interface CanvasProps {
  droppedComponents: DroppedComponentData[];
  onDrop: (component: UiComponent) => void;
  onSelectComponent: (canvasId: string) => void;
  selectedComponentId: string | null;
}

export default function Canvas({
  droppedComponents,
  onDrop,
  onSelectComponent,
  selectedComponentId,
}: CanvasProps) {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow dropping
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const componentJson = event.dataTransfer.getData('application/json');
    if (componentJson) {
      try {
        const component = JSON.parse(componentJson) as UiComponent;
        onDrop(component);
      } catch (error) {
        console.error("Failed to parse dropped component data:", error);
      }
    }
  };

  return (
    <Card 
      className="flex flex-col h-full shadow-lg rounded-lg"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-label="UI Canvas"
    >
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xl font-headline">Canvas</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4 border-2 border-dashed border-border rounded-md m-4 bg-background/50 relative overflow-hidden">
        <ScrollArea className="h-full w-full">
          {droppedComponents.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Drop components here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {droppedComponents.map((component) => (
                <div
                  key={component.canvasId}
                  onClick={() => onSelectComponent(component.canvasId)}
                  className={cn(
                    "p-2 border rounded-md cursor-pointer hover:shadow-md transition-all",
                    selectedComponentId === component.canvasId
                      ? "border-primary ring-2 ring-primary ring-offset-2 shadow-lg"
                      : "border-border"
                  )}
                  aria-label={`Canvas item ${component.name}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectComponent(component.canvasId)}
                >
                  {renderVisualComponent(component)}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
