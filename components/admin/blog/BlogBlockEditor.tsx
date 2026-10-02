"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlogBlockFields } from "@/components/admin/blog/BlogBlockFields";
import type { BlogAdminCopy } from "@/lib/blog/admin-copy";
import { createEmptyBlock, type BlogContentBlock } from "@/lib/blog/blocks";
import { BLOG_BLOCK_TYPES, type BlogBlockType } from "@/lib/blog/constants";
import type { BlogLocaleCode } from "@/lib/blog/translatable";

type BlogBlockEditorProps = {
  blocks: BlogContentBlock[];
  activeLocale: BlogLocaleCode;
  postId?: string;
  copy: BlogAdminCopy;
  onChange: (blocks: BlogContentBlock[]) => void;
};

export function BlogBlockEditor({ blocks, activeLocale, postId, copy, onChange }: BlogBlockEditorProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    onChange(arrayMove(blocks, oldIndex, newIndex));
  }

  function addBlock(type: BlogBlockType): void {
    onChange([...blocks, createEmptyBlock(type)]);
  }

  return (
    <section className="admin-blog-blocks">
      <div className="admin-blog-blocks-head">
        <h2>{copy.contentBlocks}</h2>
        <div className="admin-blog-add-menu">
          {BLOG_BLOCK_TYPES.map((type) => (
            <button key={type} type="button" className="btn btn-admin-secondary" onClick={() => addBlock(type)}>
              {copy.blocks[type] ?? type}
            </button>
          ))}
        </div>
      </div>
      <input type="hidden" name="contentBlocks" value={JSON.stringify(blocks)} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
          <div className="admin-blog-block-list">
            {blocks.map((block) => (
              <SortableBlock
                key={block.id}
                block={block}
                label={copy.blocks[block.type] ?? block.type}
                removeLabel={copy.removeBlock}
                activeLocale={activeLocale}
                postId={postId}
                onChange={(next) => onChange(blocks.map((item) => (item.id === next.id ? next : item)))}
                onRemove={() => onChange(blocks.filter((item) => item.id !== block.id))}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}

type SortableBlockProps = {
  block: BlogContentBlock;
  label: string;
  removeLabel: string;
  activeLocale: BlogLocaleCode;
  postId?: string;
  onChange: (block: BlogContentBlock) => void;
  onRemove: () => void;
};

function SortableBlock({ block, label, removeLabel, activeLocale, postId, onChange, onRemove }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`admin-blog-block ${isDragging ? "admin-blog-block-dragging" : ""}`}
    >
      <header className="admin-blog-block-bar">
        <button type="button" className="sortable-gallery-handle" {...attributes} {...listeners}>
          Drag
        </button>
        <strong>{label}</strong>
        <button type="button" className="btn btn-admin-danger" onClick={onRemove}>
          {removeLabel}
        </button>
      </header>
      <BlogBlockFields block={block} activeLocale={activeLocale} postId={postId} onChange={onChange} />
    </article>
  );
}
