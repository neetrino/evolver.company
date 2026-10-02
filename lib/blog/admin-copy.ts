import type { AdminContentLocale } from "@/lib/admin-locales";

export type BlogAdminCopy = {
  backToPosts: string;
  backToCategories: string;
  categories: string;
  newPost: string;
  editPost: string;
  newCategory: string;
  editCategory: string;
  save: string;
  cancel: string;
  localeHint: string;
  title: string;
  shortDescription: string;
  shortDescriptionHint: string;
  slug: string;
  category: string;
  noCategory: string;
  publishedAt: string;
  cardImage: string;
  headerImage: string;
  published: string;
  featured: string;
  featuredOrder: string;
  contentBlocks: string;
  addBlock: string;
  removeBlock: string;
  search: string;
  emptyPosts: string;
  emptySearch: string;
  colPost: string;
  colCategory: string;
  homepage: string;
  view: string;
  blocks: Record<string, string>;
  reorderSaved: string;
  reorderError: string;
};

const EN: BlogAdminCopy = {
  backToPosts: "Back to posts",
  backToCategories: "Back to categories",
  categories: "Categories",
  newPost: "New post",
  editPost: "Edit post",
  newCategory: "New category",
  editCategory: "Edit category",
  save: "Save",
  cancel: "Cancel",
  localeHint: "Any language is enough. English is optional. Switching tabs keeps every locale.",
  title: "Title",
  shortDescription: "Short description",
  shortDescriptionHint: "Card and homepage excerpt. Hidden on the article.",
  slug: "Slug",
  category: "Category",
  noCategory: "No category",
  publishedAt: "Publish date",
  cardImage: "Card image",
  headerImage: "Post cover",
  published: "Published",
  featured: "Featured on homepage",
  featuredOrder: "Homepage order",
  contentBlocks: "Content blocks",
  addBlock: "Add block",
  removeBlock: "Remove",
  search: "Search title, slug, or category",
  emptyPosts: "No posts yet.",
  emptySearch: "No posts match this search.",
  colPost: "Post",
  colCategory: "Category",
  homepage: "Homepage",
  view: "View",
  blocks: {
    heading: "Heading",
    description: "Description",
    photo: "Photo",
    youtube: "YouTube",
    gallery: "Gallery",
    link: "Link",
  },
  reorderSaved: "Order saved.",
  reorderError: "Category order is out of date. Refresh and try again.",
};

const RU: BlogAdminCopy = {
  ...EN,
  backToPosts: "К записям",
  backToCategories: "К категориям",
  categories: "Категории",
  newPost: "Новая запись",
  editPost: "Редактировать запись",
  newCategory: "Новая категория",
  editCategory: "Редактировать категорию",
  save: "Сохранить",
  cancel: "Отмена",
  localeHint: "Достаточно любого языка. Английский необязателен. Переключение вкладок сохраняет все языки.",
  title: "Заголовок",
  shortDescription: "Краткое описание",
  shortDescriptionHint: "Анонс карточки и главной. На странице статьи не показывается.",
  slug: "Слаг",
  category: "Категория",
  noCategory: "Без категории",
  publishedAt: "Дата публикации",
  cardImage: "Изображение карточки",
  headerImage: "Обложка статьи",
  published: "Опубликовано",
  featured: "На главной",
  featuredOrder: "Порядок на главной",
  contentBlocks: "Блоки контента",
  addBlock: "Добавить блок",
  removeBlock: "Удалить",
  search: "Поиск по заголовку, слагу или категории",
  emptyPosts: "Записей пока нет.",
  emptySearch: "Ничего не найдено.",
  colPost: "Запись",
  colCategory: "Категория",
  homepage: "Главная",
  view: "Открыть",
  reorderSaved: "Порядок сохранён.",
  reorderError: "Порядок устарел. Обновите страницу и повторите.",
};

const HY: BlogAdminCopy = {
  ...EN,
  backToPosts: "Դեպի գրառումներ",
  backToCategories: "Դեպի կատեգորիաներ",
  categories: "Կատեգորիաներ",
  newPost: "Նոր գրառում",
  editPost: "Խմբագրել գրառումը",
  newCategory: "Նոր կատեգորիա",
  editCategory: "Խմբագրել կատեգորիան",
  save: "Պահել",
  cancel: "Չեղարկել",
  localeHint: "Բավարար է ցանկացած լեզու։ Անգլերենը պարտադիր չէ։ Ներդիրները փոխելը պահում է բոլոր լեզուները։",
  title: "Վերնագիր",
  shortDescription: "Կարճ նկարագրություն",
  shortDescriptionHint: "Քարտի և գլխավոր էջի հատված։ Հոդվածում չի երևում։",
  slug: "Սլագ",
  category: "Կատեգորիա",
  noCategory: "Առանց կատեգորիայի",
  publishedAt: "Հրապարակման ամսաթիվ",
  cardImage: "Քարտի նկար",
  headerImage: "Գրառման շապիկ",
  published: "Հրապարակված",
  featured: "Գլխավոր էջում",
  featuredOrder: "Գլխավորի հերթականություն",
  contentBlocks: "Բովանդակության բլոկներ",
  addBlock: "Ավելացնել բլոկ",
  removeBlock: "Հեռացնել",
  search: "Փնտրել վերնագիր, սլագ կամ կատեգորիա",
  emptyPosts: "Գրառումներ դեռ չկան։",
  emptySearch: "Որոնմանը համապատասխան գրառում չկա։",
  colPost: "Գրառում",
  colCategory: "Կատեգորիա",
  homepage: "Գլխավոր",
  view: "Դիտել",
  reorderSaved: "Հերթականությունը պահվեց։",
  reorderError: "Հերթականությունը հնացած է։ Թարմացրեք և կրկին փորձեք։",
};

const COPY: Record<AdminContentLocale, BlogAdminCopy> = { en: EN, ru: RU, hy: HY };

export function getBlogAdminCopy(locale: AdminContentLocale): BlogAdminCopy {
  return COPY[locale];
}
