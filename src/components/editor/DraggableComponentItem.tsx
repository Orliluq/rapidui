"use client";

import type { UiComponent } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DraggableComponentItemProps {
  component: UiComponent;
}

export default function DraggableComponentItem({ component }: DraggableComponentItemProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('application/json', JSON.stringify(component));
    event.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab p-3 hover:shadow-md transition-shadow active:cursor-grabbing mb-2"
      aria-label={`Drag ${component.name}`}
    >
      <CardContent className="p-0 flex items-center gap-3">
        <component.icon className="h-6 w-6 text-primary" aria-hidden="true" />
        <span className="text-sm font-medium">{component.name}</span>
      </CardContent>
    </Card>
  );
}
