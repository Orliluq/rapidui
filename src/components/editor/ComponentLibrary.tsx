"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import DraggableComponentItem from './DraggableComponentItem';
import { AVAILABLE_COMPONENTS } from './component-definitions';

export default function ComponentLibrary() {
  return (
    <Card className="flex flex-col h-full shadow-lg rounded-lg">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xl font-headline">Components</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-2 overflow-hidden">
        <ScrollArea className="h-full pr-3">
          {AVAILABLE_COMPONENTS.map((component) => (
            <DraggableComponentItem key={component.id} component={component} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
