import type { AdminContentLocale } from "@/lib/admin-locales";
import { ADMIN_CONTENT_LOCALE_LABELS } from "@/lib/admin-locales";

export type AdminUiCopy = {
  groupOverview: string;
  groupContent: string;
  groupInbox: string;
  navDashboard: string;
  navProjects: string;
  navPosts: string;
  navCareers: string;
  navHomeHero: string;
  navPages: string;
  navContactMessages: string;
  navCareerApplications: string;
  menu: string;
  collapseSidebar: string;
  expandSidebar: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  dashboardProjectsBody: string;
  dashboardPostsBody: string;
  dashboardCareersBody: string;
  dashboardApplicationsBody: string;
  dashboardHomeHeroBody: string;
  dashboardPagesBody: string;
  dashboardContactBody: string;
  projectsTitle: string;
  projectsSubtitle: string;
  newProject: string;
  emptyProjects: string;
  sheetNewProject: string;
  sheetEditProject: string;
  sheetNewProjectSubtitle: string;
  sheetEditProjectSubtitle: string;
  postsTitle: string;
  postsSubtitle: string;
  newPost: string;
  emptyPosts: string;
  sheetNewPost: string;
  sheetEditPost: string;
  sheetNewPostSubtitle: string;
  sheetEditPostSubtitle: string;
  careersTitle: string;
  careersSubtitle: string;
  newJob: string;
  emptyJobs: string;
  sheetNewJob: string;
  sheetEditJob: string;
  sheetNewJobSubtitle: string;
  sheetEditJobSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  applicationsTitle: string;
  applicationsSubtitle: string;
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  colTitle: string;
  colSlug: string;
  colStatus: string;
  colActions: string;
  colSalary: string;
  colHours: string;
  colName: string;
  colEmail: string;
  colPhone: string;
  colMessage: string;
  colDate: string;
  colJob: string;
  statusPublished: string;
  statusDraft: string;
  actionEdit: string;
  actionPublish: string;
  actionUnpublish: string;
  actionDelete: string;
  noTranslation: string;
  pagesTitle: string;
  pagesSubtitle: string;
  pagesSearch: string;
  pagesEditedOnly: string;
  pagesSave: string;
  pagesSaving: string;
  pagesReset: string;
  pagesResetting: string;
  pagesResetConfirm: string;
  pagesSaved: string;
  pagesResetDone: string;
  pagesBack: string;
  pagesLeaveConfirm: string;
  pagesEmpty: string;
  pagesEdited: string;
  pagesCustom: string;
  pagesFields: string;
  pagesView: string;
};

const ADMIN_UI_EN: AdminUiCopy = {
  groupOverview: "Overview",
  groupContent: "Content",
  groupInbox: "Inbox",
  navDashboard: "Dashboard",
  navProjects: "Projects",
  navPosts: "Blog posts",
  navCareers: "Careers",
  navHomeHero: "Home Hero",
  navPages: "Pages",
  navContactMessages: "Contact Messages",
  navCareerApplications: "Career applications",
  menu: "Menu",
  collapseSidebar: "Collapse sidebar",
  expandSidebar: "Expand sidebar",
  dashboardTitle: "Dashboard",
  dashboardSubtitle: "Manage content, media, and incoming messages.",
  dashboardProjectsBody: "Create, edit and publish bilingual projects.",
  dashboardPostsBody: "Manage published and draft blog posts.",
  dashboardCareersBody: "Manage job listings, salary, hours, and cover images.",
  dashboardApplicationsBody: "Review applications from the public career page.",
  dashboardHomeHeroBody: "Edit homepage carousel slides and copy.",
  dashboardPagesBody: "Services, about, customers, and the rest of the public copy.",
  dashboardContactBody: "Review messages submitted from the public site.",
  projectsTitle: "Projects",
  projectsSubtitle: "Manage published and draft projects.",
  newProject: "New project",
  emptyProjects: "No projects yet.",
  sheetNewProject: "New project",
  sheetEditProject: "Edit project",
  sheetNewProjectSubtitle: "Create a bilingual project with cover and gallery.",
  sheetEditProjectSubtitle: "Update gallery, cover, and bilingual project copy.",
  postsTitle: "Blog posts",
  postsSubtitle: "Manage published and draft blog posts.",
  newPost: "New post",
  emptyPosts: "No posts yet.",
  sheetNewPost: "New post",
  sheetEditPost: "Edit post",
  sheetNewPostSubtitle: "Create a bilingual blog post with cover image.",
  sheetEditPostSubtitle: "Update cover image and bilingual content.",
  careersTitle: "Careers",
  careersSubtitle: "Manage open positions, salary, hours, and cover images.",
  newJob: "New job",
  emptyJobs: "No jobs yet.",
  sheetNewJob: "New job",
  sheetEditJob: "Edit job",
  sheetNewJobSubtitle: "Create a bilingual career listing with cover image.",
  sheetEditJobSubtitle: "Update salary, hours, cover, and bilingual copy.",
  contactTitle: "Contact Messages",
  contactSubtitle: "Messages from the public contact form.",
  applicationsTitle: "Career applications",
  applicationsSubtitle: "Applications submitted from the public career page.",
  homeHeroTitle: "Home Hero",
  homeHeroSubtitle: "Homepage carousel slides and copy.",
  colTitle: "Title",
  colSlug: "Slug",
  colStatus: "Status",
  colActions: "Actions",
  colSalary: "Salary",
  colHours: "Hours",
  colName: "Name",
  colEmail: "Email",
  colPhone: "Phone",
  colMessage: "Message",
  colDate: "Date",
  colJob: "Job",
  statusPublished: "Published",
  statusDraft: "Draft",
  actionEdit: "Edit",
  actionPublish: "Publish",
  actionUnpublish: "Unpublish",
  actionDelete: "Delete",
  noTranslation: "No translation",
  pagesTitle: "Pages",
  pagesSubtitle: "Edit public copy. Built-in text stays until you change a field.",
  pagesSearch: "Search fields",
  pagesEditedOnly: "Edited only",
  pagesSave: "Save changes",
  pagesSaving: "Saving...",
  pagesReset: "Reset to defaults",
  pagesResetting: "Resetting...",
  pagesResetConfirm: "Reset this page to the built-in copy? Custom text will be removed.",
  pagesSaved: "Saved. The public site is updated.",
  pagesResetDone: "Reset to the built-in copy.",
  pagesBack: "Back",
  pagesLeaveConfirm: "You have unsaved changes. Leave this page?",
  pagesEmpty: "No fields match this search.",
  pagesEdited: "Edited",
  pagesCustom: "Custom",
  pagesFields: "fields",
  pagesView: "View page",
};

const ADMIN_UI_RU: AdminUiCopy = {
  groupOverview: "Обзор",
  groupContent: "Контент",
  groupInbox: "Входящие",
  navDashboard: "Панель",
  navProjects: "Проекты",
  navPosts: "Блог",
  navCareers: "Карьера",
  navHomeHero: "Главный баннер",
  navPages: "Страницы",
  navContactMessages: "Сообщения",
  navCareerApplications: "Отклики",
  menu: "Меню",
  collapseSidebar: "Свернуть меню",
  expandSidebar: "Развернуть меню",
  dashboardTitle: "Панель",
  dashboardSubtitle: "Управление контентом, медиа и входящими сообщениями.",
  dashboardProjectsBody: "Создание, редактирование и публикация проектов.",
  dashboardPostsBody: "Управление опубликованными и черновыми постами.",
  dashboardCareersBody: "Вакансии, зарплата, график и обложки.",
  dashboardApplicationsBody: "Отклики с публичной страницы карьеры.",
  dashboardHomeHeroBody: "Слайды и тексты главной карусели.",
  dashboardPagesBody: "Услуги, о нас, клиенты и остальные публичные тексты.",
  dashboardContactBody: "Сообщения с публичной формы контактов.",
  projectsTitle: "Проекты",
  projectsSubtitle: "Управление опубликованными и черновыми проектами.",
  newProject: "Новый проект",
  emptyProjects: "Проектов пока нет.",
  sheetNewProject: "Новый проект",
  sheetEditProject: "Редактировать проект",
  sheetNewProjectSubtitle: "Создайте проект с обложкой и галереей.",
  sheetEditProjectSubtitle: "Обновите галерею, обложку и тексты проекта.",
  postsTitle: "Блог",
  postsSubtitle: "Управление опубликованными и черновыми постами.",
  newPost: "Новый пост",
  emptyPosts: "Постов пока нет.",
  sheetNewPost: "Новый пост",
  sheetEditPost: "Редактировать пост",
  sheetNewPostSubtitle: "Создайте пост блога с обложкой.",
  sheetEditPostSubtitle: "Обновите обложку и тексты поста.",
  careersTitle: "Карьера",
  careersSubtitle: "Вакансии, зарплата, график и обложки.",
  newJob: "Новая вакансия",
  emptyJobs: "Вакансий пока нет.",
  sheetNewJob: "Новая вакансия",
  sheetEditJob: "Редактировать вакансию",
  sheetNewJobSubtitle: "Создайте вакансию с обложкой.",
  sheetEditJobSubtitle: "Обновите зарплату, график, обложку и тексты.",
  contactTitle: "Сообщения",
  contactSubtitle: "Сообщения с публичной формы контактов.",
  applicationsTitle: "Отклики",
  applicationsSubtitle: "Отклики с публичной страницы карьеры.",
  homeHeroTitle: "Главный баннер",
  homeHeroSubtitle: "Слайды и тексты главной карусели.",
  colTitle: "Название",
  colSlug: "Slug",
  colStatus: "Статус",
  colActions: "Действия",
  colSalary: "Зарплата",
  colHours: "График",
  colName: "Имя",
  colEmail: "Email",
  colPhone: "Телефон",
  colMessage: "Сообщение",
  colDate: "Дата",
  colJob: "Вакансия",
  statusPublished: "Опубликовано",
  statusDraft: "Черновик",
  actionEdit: "Изменить",
  actionPublish: "Опубликовать",
  actionUnpublish: "Снять",
  actionDelete: "Удалить",
  noTranslation: "Нет перевода",
  pagesTitle: "Страницы",
  pagesSubtitle: "Публичные тексты. Встроенный текст остаётся, пока вы не измените поле.",
  pagesSearch: "Поиск полей",
  pagesEditedOnly: "Только изменённые",
  pagesSave: "Сохранить",
  pagesSaving: "Сохранение...",
  pagesReset: "Сбросить",
  pagesResetting: "Сброс...",
  pagesResetConfirm: "Вернуть встроенный текст этой страницы? Свои правки будут удалены.",
  pagesSaved: "Сохранено. Сайт обновлён.",
  pagesResetDone: "Возвращён встроенный текст.",
  pagesBack: "Назад",
  pagesLeaveConfirm: "Есть несохранённые изменения. Выйти со страницы?",
  pagesEmpty: "Нет полей по этому запросу.",
  pagesEdited: "Изменено",
  pagesCustom: "Своё",
  pagesFields: "полей",
  pagesView: "Открыть страницу",
};

const ADMIN_UI_HY: AdminUiCopy = {
  groupOverview: "Ակնարկ",
  groupContent: "Բովանդակություն",
  groupInbox: "Մուտքային",
  navDashboard: "Վահանակ",
  navProjects: "Նախագծեր",
  navPosts: "Բլոգ",
  navCareers: "Կարիերա",
  navHomeHero: "Գլխավոր բաններ",
  navPages: "Էջեր",
  navContactMessages: "Հաղորդագրություններ",
  navCareerApplications: "Դիմումներ",
  menu: "Մենյու",
  collapseSidebar: "Փոքրացնել",
  expandSidebar: "Մեծացնել",
  dashboardTitle: "Վահանակ",
  dashboardSubtitle: "Կառավարիր բովանդակությունը, մեդիան և մուտքայինները։",
  dashboardProjectsBody: "Ստեղծիր, խմբագրիր և հրապարակիր նախագծեր։",
  dashboardPostsBody: "Կառավարիր հրապարակված և սևագիր գրառումները։",
  dashboardCareersBody: "Աշխատատեղեր, աշխատավարձ, ժամեր և կազմեր։",
  dashboardApplicationsBody: "Դիմումներ հանրային կարիերայի էջից։",
  dashboardHomeHeroBody: "Գլխավոր էջի կարուսելի սլայդներ և տեքստեր։",
  dashboardPagesBody: "Ծառայություններ, մեր մասին, հաճախորդներ և մնացած հանրային տեքստերը։",
  dashboardContactBody: "Հաղորդագրություններ կոնտակտային ձևից։",
  projectsTitle: "Նախագծեր",
  projectsSubtitle: "Կառավարիր հրապարակված և սևագիր նախագծերը։",
  newProject: "Նոր նախագիծ",
  emptyProjects: "Նախագծեր դեռ չկան։",
  sheetNewProject: "Նոր նախագիծ",
  sheetEditProject: "Խմբագրել նախագիծը",
  sheetNewProjectSubtitle: "Ստեղծիր նախագիծ կազմով և պատկերասրահով։",
  sheetEditProjectSubtitle: "Թարմացրու պատկերասրահը, կազմը և տեքստերը։",
  postsTitle: "Բլոգ",
  postsSubtitle: "Կառավարիր հրապարակված և սևագիր գրառումները։",
  newPost: "Նոր գրառում",
  emptyPosts: "Գրառումներ դեռ չկան։",
  sheetNewPost: "Նոր գրառում",
  sheetEditPost: "Խմբագրել գրառումը",
  sheetNewPostSubtitle: "Ստեղծիր բլոգի գրառում կազմով։",
  sheetEditPostSubtitle: "Թարմացրու կազմը և տեքստերը։",
  careersTitle: "Կարիերա",
  careersSubtitle: "Աշխատատեղեր, աշխատավարձ, ժամեր և կազմեր։",
  newJob: "Նոր աշխատատեղ",
  emptyJobs: "Աշխատատեղեր դեռ չկան։",
  sheetNewJob: "Նոր աշխատատեղ",
  sheetEditJob: "Խմբագրել աշխատատեղը",
  sheetNewJobSubtitle: "Ստեղծիր աշխատատեղ կազմով։",
  sheetEditJobSubtitle: "Թարմացրու աշխատավարձը, ժամերը, կազմը և տեքստերը։",
  contactTitle: "Հաղորդագրություններ",
  contactSubtitle: "Հաղորդագրություններ կոնտակտային ձևից։",
  applicationsTitle: "Դիմումներ",
  applicationsSubtitle: "Դիմումներ հանրային կարիերայի էջից։",
  homeHeroTitle: "Գլխավոր բաններ",
  homeHeroSubtitle: "Գլխավոր էջի կարուսելի սլայդներ և տեքստեր։",
  colTitle: "Վերնագիր",
  colSlug: "Slug",
  colStatus: "Կարգավիճակ",
  colActions: "Գործողություններ",
  colSalary: "Աշխատավարձ",
  colHours: "Ժամեր",
  colName: "Անուն",
  colEmail: "Էլ․ փոստ",
  colPhone: "Հեռախոս",
  colMessage: "Հաղորդագրություն",
  colDate: "Ամսաթիվ",
  colJob: "Աշխատատեղ",
  statusPublished: "Հրապարակված",
  statusDraft: "Սևագիր",
  actionEdit: "Խմբագրել",
  actionPublish: "Հրապարակել",
  actionUnpublish: "Հանել",
  actionDelete: "Ջնջել",
  noTranslation: "Թարգմանություն չկա",
  pagesTitle: "Էջեր",
  pagesSubtitle: "Խմբագրիր հանրային տեքստերը։ Ներկառուցվածը մնում է, մինչև դաշտը փոխես։",
  pagesSearch: "Փնտրել դաշտեր",
  pagesEditedOnly: "Միայն փոփոխվածները",
  pagesSave: "Պահել",
  pagesSaving: "Պահվում է...",
  pagesReset: "Վերականգնել",
  pagesResetting: "Վերականգնվում է...",
  pagesResetConfirm: "Վերադարձնե՞լ այս էջի ներկառուցված տեքստը։ Սեփական փոփոխությունները կջնջվեն։",
  pagesSaved: "Պահված է։ Կայքը թարմացվել է։",
  pagesResetDone: "Վերադարձվել է ներկառուցված տեքստը։",
  pagesBack: "Հետ",
  pagesLeaveConfirm: "Կան չպահված փոփոխություններ։ Դուրս գա՞լ էջից։",
  pagesEmpty: "Այս որոնմանը դաշտ չկա։",
  pagesEdited: "Փոփոխված",
  pagesCustom: "Սեփական",
  pagesFields: "դաշտ",
  pagesView: "Բացել էջը",
};

const ADMIN_UI: Record<AdminContentLocale, AdminUiCopy> = {
  en: ADMIN_UI_EN,
  ru: ADMIN_UI_RU,
  hy: ADMIN_UI_HY,
};

export function getAdminUi(locale: AdminContentLocale): AdminUiCopy {
  return ADMIN_UI[locale];
}

export function getAdminTitleColumnLabel(
  locale: AdminContentLocale,
  titleWord?: string,
): string {
  const label = titleWord ?? ADMIN_UI[locale].colTitle;
  return `${label} (${ADMIN_CONTENT_LOCALE_LABELS[locale]})`;
}
