"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { deleteBlogCategory, reorderBlogCategories } from "@/app/admin/blog/actions";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocaleProvider";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminUi } from "@/components/admin/useAdminUi";
import { getBlogAdminCopy } from "@/lib/blog/admin-copy";
import type { AdminBlogCategoryRow } from "@/lib/blog/types";
import { getAdminLocaleValue } from "@/lib/blog/translatable";

type BlogCategoriesAdminProps = {
  categories: AdminBlogCategoryRow[];
};

export function BlogCategoriesAdmin({ categories }: BlogCategoriesAdminProps) {
  const router = useRouter();
  const ui = useAdminUi();
  const { locale } = useAdminContentLocale();
  const copy = getBlogAdminCopy(locale);
  const [rows, setRows] = useState(categories);
  const [message, setMessage] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  async function handleDragEnd(event: DragEndEvent): Promise<void> {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = rows.findIndex((row) => row.id === active.id);
    const newIndex = rows.findIndex((row) => row.id === over.id);
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const next = arrayMove(rows, oldIndex, newIndex);
    setRows(next);
    const result = await reorderBlogCategories(next.map((row) => row.id));
    if (result.error) {
      setRows(rows);
      setMessage(result.error);
      return;
    }

    setMessage(result.success ?? null);
    router.refresh();
  }

  return (
    <>
      <AdminPageHeader
        title={copy.categories}
        actions={
          <div className="admin-page-header-actions">
            <Link href="/admin/blog" className="btn btn-admin-secondary">
              {copy.backToPosts}
            </Link>
            <Link href="/admin/blog/categories/new" className="btn btn-admin-primary">
              {copy.newCategory}
            </Link>
          </div>
        }
      />
      {message ? <p className="admin-field-hint">{message}</p> : null}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => void handleDragEnd(event)}>
        <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
          <div className="admin-card admin-blog-category-list">
            {rows.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                title={getAdminLocaleValue(category.title, locale) || category.slug}
                editLabel={ui.actionEdit}
                deleteLabel={ui.actionDelete}
              />
            ))}
            {rows.length === 0 ? <p className="admin-table-empty">{copy.categories}</p> : null}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}

type CategoryRowProps = {
  category: AdminBlogCategoryRow;
  title: string;
  editLabel: string;
  deleteLabel: string;
};

function CategoryRow({ category, title, editLabel, deleteLabel }: CategoryRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: category.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="admin-blog-category-row">
      <button type="button" className="sortable-gallery-handle" {...attributes} {...listeners}>
        Drag
      </button>
      <div>
        <p className="admin-blog-title">{title}</p>
        <p className="admin-blog-meta">{category.slug}</p>
      </div>
      <div className="admin-table-actions">
        <Link href={`/admin/blog/categories/${category.id}`} className="btn btn-admin-secondary">
          {editLabel}
        </Link>
        <form action={deleteBlogCategory.bind(null, category.id)}>
          <button type="submit" className="btn btn-admin-danger">
            {deleteLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
