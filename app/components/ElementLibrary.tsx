
import React from 'react';
import { useFloorplan } from '@/app/context/FloorplanContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { CanvasElement } from '@/app/types';

export const ElementLibrary: React.FC = () => {
    const { elementLibrary } = useFloorplan();
    const reservableItems = elementLibrary.filter(item => item.elementType === 'reservable');
    const decorativeItems = elementLibrary.filter(item => item.elementType === 'decorative');
    // test comment
    return (
        <div className="space-y-6">
            <LibrarySection title="Tables & Seating" items={reservableItems} />
            <LibrarySection title="Decorations & Fixtures" items={decorativeItems} />
        </div>
    );
};

interface LibrarySectionProps {
    title: string;
    items: CanvasElement[];
}

const LibrarySection: React.FC<LibrarySectionProps> = ({ title, items }) => {
    return (
        <Card className="shadow-sm bg-gradient-to-br from-[#b98858]/20 to-[#121120]/40 rounded-2xl">
            <CardHeader className="px-4 py-3">
                <CardTitle className="text-base font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
                <div className="grid grid-cols-2 gap-2">
                    {items.map(item => (
                        <LibraryItem key={item.id} item={item} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

interface LibraryItemProps {
    item: CanvasElement;
}

const LibraryItem: React.FC<LibraryItemProps> = ({ item }) => {
    // console.log('here is element library item', item);
    // e.dataTransfer.setData('application/json', JSON.stringify(item));
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('application/json', JSON.stringify(item));
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div
            className="flex flex-col items-center justify-center p-2 rounded-md bg-background cursor-grab hover:bg-secondary transition-colors"
            draggable
            onDragStart={handleDragStart}
        >
            <div className="text-2xl mb-1"> <img
                src={item.elementImageUrl}
                alt={item.name}
                className="max-w-[60px] max-h-[100px]"
            /></div>
            <div className="text-xs text-center">{item.name}</div>
        </div>
    );
};
