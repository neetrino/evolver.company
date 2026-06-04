"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import type { GalleryImageItem } from "@/lib/projects";

type SortableGalleryImagesProps = {
  images: GalleryImageItem[];
  onChange: (images: GalleryImageItem[]) => void;
};

type SortableItemProps = {
  image: GalleryImageItem;
  onRemove: (key: string) => void;
};

function SortableGalleryItem({ image, onRemove }: SortableItemProps) {
  const itemId = image.key || image.url;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: itemId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sortable-gallery-item ${isDragging ? "sortable-gallery-item-dragging" : ""}`}
    >
      <button type="button" className="sortable-gallery-handle" {...attributes} {...listeners}>
        Drag
      </button>
      <Image src={image.url} alt="Gallery preview" width={160} height={120} unoptimized className="rounded-md" />
      <button
        type="button"
        className="btn btn-admin-secondary mt-2 w-full"
        onClick={() => onRemove(itemId)}
      >
        Remove
      </button>
    </div>
  );
}

export function SortableGalleryImages({ images, onChange }: SortableGalleryImagesProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = images.findIndex((image) => (image.key || image.url) === active.id);
    const newIndex = images.findIndex((image) => (image.key || image.url) === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    onChange(arrayMove(images, oldIndex, newIndex));
  }

  function handleRemove(itemId: string): void {
    onChange(images.filter((image) => (image.key || image.url) !== itemId));
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={images.map((image) => image.key || image.url)} strategy={rectSortingStrategy}>
        <div className="sortable-gallery-grid">
          {images.map((image) => (
            <SortableGalleryItem
              key={image.key || image.url}
              image={image}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
