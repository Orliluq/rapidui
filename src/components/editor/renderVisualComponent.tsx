import type { DroppedComponentData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card as ShadCnCard, CardHeader, CardTitle, CardContent as ShadCnCardContent } from '@/components/ui/card';
import NextImage from 'next/image';

export function renderVisualComponent(component: DroppedComponentData, isPreview?: boolean): React.ReactNode {
  const commonProps = isPreview ? { style: { pointerEvents: 'none' as const } } : {};

  switch (component.type) {
    case 'Button':
      return (
        <Button 
          variant={component.props.variant || 'default'} 
          size={component.props.size || 'default'}
          {...commonProps}
        >
          {component.props.text || 'Button'}
        </Button>
      );
    case 'Input':
      return (
        <Input
          type={component.props.type || 'text'}
          placeholder={component.props.placeholder || 'Input Field'}
          defaultValue={component.props.value} // Use defaultValue for uncontrolled input in preview/canvas
          className="w-full"
          {...commonProps}
        />
      );
    case 'Card': // This renders a conceptual card, not a draggable item.
      return (
        <ShadCnCard className="w-full" {...commonProps}>
          <CardHeader>
            <CardTitle>{component.props.title || 'Card Title'}</CardTitle>
          </CardHeader>
          <ShadCnCardContent>
            <p>{component.props.content || 'Card content goes here.'}</p>
          </ShadCnCardContent>
        </ShadCnCard>
      );
    case 'Image':
      return (
        <NextImage
          src={component.props.src || 'https://placehold.co/150x100.png'}
          alt={component.props.alt || 'Image'}
          width={component.props.width || 150}
          height={component.props.height || 100}
          data-ai-hint={component.props['data-ai-hint'] || "placeholder image"}
          className="object-cover"
          {...commonProps}
        />
      );
    case 'Heading':
      const Tag = `h${component.props.level || 1}` as keyof JSX.IntrinsicElements;
      return <Tag className="font-headline" {...commonProps}>{component.props.text || 'Heading'}</Tag>;
    case 'Paragraph':
      return <p {...commonProps}>{component.props.text || 'Paragraph text.'}</p>;
    default:
      return <div className="p-2 border border-dashed border-muted-foreground text-muted-foreground text-xs" {...commonProps}>Unknown: {component.name}</div>;
  }
}
