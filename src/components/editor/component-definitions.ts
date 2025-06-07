import type { UiComponent } from '@/types';
import { MousePointerSquareDashed, CaseSensitive, Square, Image as ImageIcon, Heading1, Baseline, Type, Calendar, Minus } from 'lucide-react';

export const AVAILABLE_COMPONENTS: UiComponent[] = [
  {
    id: 'button',
    type: 'Button',
    name: 'Button',
    icon: MousePointerSquareDashed,
    defaultProps: { text: 'Click Me', variant: 'default', size: 'default' },
  },
  {
    id: 'input',
    type: 'Input',
    name: 'Text Input',
    icon: Type, // Using Type icon as CaseSensitive might be too specific
    defaultProps: { placeholder: 'Enter text...', type: 'text' },
  },
  {
    id: 'card', // A conceptual card, not ShadCN Card directly as a draggable item initially
    type: 'Card',
    name: 'Card Layout', // More descriptive for a layout element
    icon: Square, // Using Square as RectangleHorizontal is not available
    defaultProps: { title: 'Card Title', content: 'Card content goes here.' },
  },
  {
    id: 'image',
    type: 'Image',
    name: 'Image',
    icon: ImageIcon,
    defaultProps: { src: 'https://placehold.co/300x200.png', alt: 'Placeholder Image', width: 300, height: 200, "data-ai-hint": "abstract background" },
  },
  {
    id: 'heading',
    type: 'Heading',
    name: 'Heading',
    icon: Heading1,
    defaultProps: { text: 'Main Heading', level: 1 as 1 | 2 | 3 | 4 | 5 | 6 },
  },
  {
    id: 'paragraph',
    type: 'Paragraph',
    name: 'Paragraph',
    icon: Baseline,
    defaultProps: { text: 'This is a paragraph of text. You can edit this content.' },
  },
  {
    id: 'textarea',
    type: 'Textarea',
    name: 'Textarea',
    icon: CaseSensitive, // Puedes elegir otro si quieres
    defaultProps: { placeholder: 'Write something...', rows: 4 },
  },
  {
    id: 'switch',
    type: 'Switch',
    name: 'Toggle Switch',
    icon: MousePointerSquareDashed,
    defaultProps: { checked: false, label: 'Enable feature' },
  },
  {
    id: 'datepicker',
    type: 'DatePicker',
    name: 'Date Picker',
    icon: Calendar,
    defaultProps: { value: '', label: 'Pick a date' },
  },
  {
    id: 'divider',
    type: 'Divider',
    name: 'Divider',
    icon: Minus, // Simula una línea
    defaultProps: { orientation: 'horizontal' },
  },
];
