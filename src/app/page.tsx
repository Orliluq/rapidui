"use client";

import React, { useState, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComponentLibrary from '@/components/editor/ComponentLibrary';
import Canvas from '@/components/editor/Canvas';
import PropertiesPreviewTabs from '@/components/editor/PropertiesPreviewTabs';
import type { DroppedComponentData, UiComponent } from '@/types';

export default function RapidUIPage() {
  const [droppedComponents, setDroppedComponents] = useState<DroppedComponentData[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const handleDropOnCanvas = useCallback((component: UiComponent) => {
    const newComponentData: DroppedComponentData = {
      canvasId: `comp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type: component.type,
      name: component.name,
      props: { ...component.defaultProps },
    };
    setDroppedComponents(prev => [...prev, newComponentData]);
    setSelectedComponentId(newComponentData.canvasId); // Auto-select new component
  }, []);

  const handleSelectComponent = useCallback((canvasId: string) => {
    setSelectedComponentId(canvasId);
  }, []);

  const handleUpdateComponentProps = useCallback((canvasId: string, newProps: Record<string, any>) => {
    setDroppedComponents(prev =>
      prev.map(c =>
        c.canvasId === canvasId ? { ...c, props: { ...c.props, ...newProps } } : c
      )
    );
  }, []);

  const selectedComponent = selectedComponentId
    ? droppedComponents.find(c => c.canvasId === selectedComponentId)
    : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-[280px_1fr_360px] gap-4 p-4 h-[calc(100vh-8rem)]"> {/* Adjust height based on header/footer */}
        <div className="h-full overflow-hidden">
          <ComponentLibrary />
        </div>
        <div className="h-full overflow-hidden">
          <Canvas
            droppedComponents={droppedComponents}
            onDrop={handleDropOnCanvas}
            onSelectComponent={handleSelectComponent}
            selectedComponentId={selectedComponentId}
          />
        </div>
        <div className="h-full overflow-hidden">
          <PropertiesPreviewTabs
            droppedComponents={droppedComponents}
            selectedComponent={selectedComponent}
            onUpdateComponentProps={handleUpdateComponentProps}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
