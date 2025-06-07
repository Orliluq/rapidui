"use client";

import type { DroppedComponentData } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PropertiesPanelProps {
  selectedComponent: DroppedComponentData | undefined;
  onUpdateComponentProps: (canvasId: string, newProps: Record<string, any>) => void;
}

export default function PropertiesPanel({ selectedComponent, onUpdateComponentProps }: PropertiesPanelProps) {
  if (!selectedComponent) {
    return <div className="p-4 text-muted-foreground">Select a component on the canvas to see its properties.</div>;
  }

  const handlePropChange = (propName: string, value: any) => {
    onUpdateComponentProps(selectedComponent.canvasId, { [propName]: value });
  };

  const renderPropEditor = (propName: string, propValue: any) => {
    // Specific editors for common props
    if (propName === 'text' && (selectedComponent.type === 'Button' || selectedComponent.type === 'Heading' || selectedComponent.type === 'Paragraph')) {
      return (
        <div key={propName} className="space-y-1">
          <Label htmlFor={`${selectedComponent.canvasId}-${propName}`} className="capitalize">{propName}</Label>
          <Textarea
            id={`${selectedComponent.canvasId}-${propName}`}
            value={propValue as string || ''}
            onChange={(e) => handlePropChange(propName, e.target.value)}
            className="min-h-[60px]"
          />
        </div>
      );
    }
    if (propName === 'placeholder' || propName === 'alt' || (propName === 'title' && selectedComponent.type === 'Card')) {
       return (
        <div key={propName} className="space-y-1">
          <Label htmlFor={`${selectedComponent.canvasId}-${propName}`} className="capitalize">{propName}</Label>
          <Input
            id={`${selectedComponent.canvasId}-${propName}`}
            type="text"
            value={propValue as string || ''}
            onChange={(e) => handlePropChange(propName, e.target.value)}
          />
        </div>
      );
    }
     if (propName === 'content' && selectedComponent.type === 'Card') {
      return (
        <div key={propName} className="space-y-1">
          <Label htmlFor={`${selectedComponent.canvasId}-${propName}`} className="capitalize">{propName}</Label>
          <Textarea
            id={`${selectedComponent.canvasId}-${propName}`}
            value={propValue as string || ''}
            onChange={(e) => handlePropChange(propName, e.target.value)}
             className="min-h-[80px]"
          />
        </div>
      );
    }
    if (propName === 'src') {
      return (
        <div key={propName} className="space-y-1">
          <Label htmlFor={`${selectedComponent.canvasId}-${propName}`} className="capitalize">{propName} (URL)</Label>
          <Input
            id={`${selectedComponent.canvasId}-${propName}`}
            type="url"
            value={propValue as string || ''}
            onChange={(e) => handlePropChange(propName, e.target.value)}
          />
        </div>
      );
    }
    if ((propName === 'width' || propName === 'height') && selectedComponent.type === 'Image') {
       return (
        <div key={propName} className="space-y-1">
          <Label htmlFor={`${selectedComponent.canvasId}-${propName}`} className="capitalize">{propName} (px)</Label>
          <Input
            id={`${selectedComponent.canvasId}-${propName}`}
            type="number"
            value={propValue as number || 0}
            onChange={(e) => handlePropChange(propName, parseInt(e.target.value, 10))}
          />
        </div>
      );
    }
    if (propName === 'variant' && selectedComponent.type === 'Button') {
      return (
         <div key={propName} className="space-y-1">
          <Label htmlFor={`${selectedComponent.canvasId}-${propName}`} className="capitalize">{propName}</Label>
          <Select value={propValue as string || 'default'} onValueChange={(value) => handlePropChange(propName, value)}>
            <SelectTrigger id={`${selectedComponent.canvasId}-${propName}`}>
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="destructive">Destructive</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
              <SelectItem value="link">Link</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
     if (propName === 'level' && selectedComponent.type === 'Heading') {
      return (
         <div key={propName} className="space-y-1">
          <Label htmlFor={`${selectedComponent.canvasId}-${propName}`} className="capitalize">{propName} (H1-H6)</Label>
          <Select value={(propValue as number || 1).toString()} onValueChange={(value) => handlePropChange(propName, parseInt(value, 10))}>
            <SelectTrigger id={`${selectedComponent.canvasId}-${propName}`}>
              <SelectValue placeholder="Select heading level" />
            </SelectTrigger>
            <SelectContent>
              {[1,2,3,4,5,6].map(level => <SelectItem key={level} value={level.toString()}>H{level}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      );
    }

    // Generic editor for other props (can be expanded)
    if (typeof propValue === 'string') {
      return (
        <div key={propName} className="space-y-1">
          <Label htmlFor={`${selectedComponent.canvasId}-${propName}`} className="capitalize">{propName}</Label>
          <Input
            id={`${selectedComponent.canvasId}-${propName}`}
            type="text"
            value={propValue}
            onChange={(e) => handlePropChange(propName, e.target.value)}
          />
        </div>
      );
    }
    
    // Add more type handlers as needed (number, boolean with Switch, etc.)
    return null; // Or a generic display for unhandled prop types
  };

  return (
    <ScrollArea className="h-full p-1">
      <div className="p-4 space-y-6">
        <h3 className="text-lg font-medium font-headline">Properties: {selectedComponent.name}</h3>
        {Object.entries(selectedComponent.props)
          .map(([propName, propValue]) => renderPropEditor(propName, propValue))
          .filter(Boolean) // Remove nulls if some props are not editable
        }
        {/* Fallback for components with no directly editable props shown yet */}
        {Object.keys(selectedComponent.props).length === 0 && <p className="text-sm text-muted-foreground">No editable properties for this component.</p>}
      </div>
    </ScrollArea>
  );
}
