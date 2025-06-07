"use client";

import type { DroppedComponentData } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import PropertiesPanel from './PropertiesPanel';
import PreviewPanel from './PreviewPanel';
import GeneratedCodePanel from './GeneratedCodePanel';

interface PropertiesPreviewTabsProps {
  droppedComponents: DroppedComponentData[];
  selectedComponent: DroppedComponentData | undefined;
  onUpdateComponentProps: (canvasId: string, newProps: Record<string, any>) => void;
}

export default function PropertiesPreviewTabs({
  droppedComponents,
  selectedComponent,
  onUpdateComponentProps,
}: PropertiesPreviewTabsProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg rounded-lg overflow-hidden">
      <Tabs defaultValue="properties" className="flex flex-col flex-grow">
        <TabsList className="grid w-full grid-cols-3 rounded-none border-b m-0 h-12">
          <TabsTrigger value="properties" className="rounded-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">Properties</TabsTrigger>
          <TabsTrigger value="preview" className="rounded-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">Preview</TabsTrigger>
          <TabsTrigger value="code" className="rounded-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">Code</TabsTrigger>
        </TabsList>
        
        <div className="flex-grow overflow-auto">
          <TabsContent value="properties" className="m-0 h-full">
            <PropertiesPanel
              selectedComponent={selectedComponent}
              onUpdateComponentProps={onUpdateComponentProps}
            />
          </TabsContent>
          <TabsContent value="preview" className="m-0 h-full">
            <PreviewPanel droppedComponents={droppedComponents} />
          </TabsContent>
          <TabsContent value="code" className="m-0 h-full">
            <GeneratedCodePanel droppedComponents={droppedComponents} />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
