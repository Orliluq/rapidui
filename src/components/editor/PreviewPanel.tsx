"use client";

import type { DroppedComponentData } from '@/types';
import { renderVisualComponent } from './renderVisualComponent';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PreviewPanelProps {
  droppedComponents: DroppedComponentData[];
}

export default function PreviewPanel({ droppedComponents }: PreviewPanelProps) {
  return (
    <ScrollArea className="h-full p-1">
      <div className="p-4 space-y-3 bg-muted/30 rounded-md min-h-[200px]">
        {droppedComponents.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Preview will appear here as you build.</p>
          </div>
        ) : (
          droppedComponents.map((component) => (
            <div key={component.canvasId} className="outline-dashed outline-1 outline-transparent hover:outline-accent transition-all">
               {renderVisualComponent(component, true)}
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
