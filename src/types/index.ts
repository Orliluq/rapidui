import type { LucideIcon } from 'lucide-react';

export interface UiComponent {
  id: string; // identifier for the component type e.g. 'button'
  type: string; // Display type, e.g., 'Button', 'Input'
  name: string; // User-friendly name, e.g., 'Primary Button'
  icon: LucideIcon;
  defaultProps: Record<string, any>;
}

export interface DroppedComponentData {
  canvasId: string; // Unique ID for this instance on the canvas
  type: string; // Component type, e.g., 'Button', 'Input'
  name: string; // User-friendly name
  props: Record<string, any>; 
  // Potentially add layout fields like x, y, width, height later
}
