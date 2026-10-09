import { getBlogPageContent } from "@/lib/blog-content";
import { getCareerPageContent } from "@/lib/career-content";
import { getTrustedBySectionContent } from "@/lib/clients-section";
import {
  getAboutContent,
  getContactContent,
  getFooterContent,
  getProjectsPageContent,
} from "@/lib/content";
import {
  loadClientNames,
  loadCustomersCopy,
  loadHomeCopy,
  loadNavigationCopy,
  loadServicesCopy,
} from "@/lib/page-copy/sources";
import { getAboutSectionContent } from "@/lib/about-section";
import { getAboutUsProjectsContent } from "@/lib/about-us-projects";
import { getAboutUsTeamContent } from "@/lib/about-us-team";
import { getHomeVideoCopy } from "@/lib/home-videos";
import { UI_LABELS, type Locale } from "@/lib/i18n";
import { getPartnershipContent } from "@/lib/partnership";
import { getProductShowcaseContent } from "@/lib/product-showcase";
import { getServicesDetailContent } from "@/lib/services-detail";
import {
  type PageCopyId,
  type PageCopyText,
  PAGE_COPY_IDS,
} from "@/lib/page-copy/constants";

export type PageCopyDefinition = {
  id: PageCopyId;
  title: PageCopyText;
  description: PageCopyText;
  publicPath: string;
  load: (locale: Locale) => unknown;
};

function text(en: string, ru: string, hy: string): PageCopyText {
  return { en, ru, hy };
}

const PAGE_COPY: PageCopyDefinition[] = [
  {
    id: "home",
    title: text("Home", "Главная", "Գլխավոր"),
    description: text(
      "Hero fallback copy and the featured-projects heading.",
      "Запасной текст баннера и заголовок избранных проектов.",
      "Բանների պահուստային տեքստը և ընտրված նախագծերի վերնագիրը։",
    ),
    publicPath: "/",
    load: loadHomeCopy,
  },
  {
    id: "home-videos",
    title: text("Home videos", "Видео на главной", "Գլխավորի տեսանյութեր"),
    description: text(
      "Eyebrow, title, and subtitle above the video row.",
      "Надпись, заголовок и подзаголовок над видео.",
      "Վերնագիրը և ենթավերնագիրը տեսանյութերի վրա։",
    ),
    publicPath: "/",
    load: getHomeVideoCopy,
  },
  {
    id: "what-we-do",
    title: text("What we do", "Чем занимаемся", "Ինչ ենք անում"),
    description: text(
      "Product cards on the homepage.",
      "Карточки продуктов на главной.",
      "Ապրանքների քարտերը գլխավոր էջում։",
    ),
    publicPath: "/",
    load: getProductShowcaseContent,
  },
  {
    id: "home-about",
    title: text("Home about", "О нас на главной", "Գլխավորի մասին"),
    description: text(
      "The about block on the homepage.",
      "Блок «о нас» на главной.",
      "Գլխավոր էջի «մեր մասին» բլոկը։",
    ),
    publicPath: "/",
    load: getAboutSectionContent,
  },
  {
    id: "trusted-by",
    title: text("Trusted by", "Нам доверяют", "Մեզ վստահում են"),
    description: text(
      "Heading above the client logo row.",
      "Заголовок над логотипами клиентов.",
      "Վերնագիրը հաճախորդների լոգոների վրա։",
    ),
    publicPath: "/",
    load: getTrustedBySectionContent,
  },
  {
    id: "services",
    title: text("Services", "Услуги", "Ծառայություններ"),
    description: text(
      "Services page intro and service cards.",
      "Вступление и карточки страницы услуг.",
      "Ծառայությունների էջի ներածությունն ու քարտերը։",
    ),
    publicPath: "/services",
    load: loadServicesCopy,
  },
  {
    id: "services-detail",
    title: text("Service details", "Подробности услуг", "Ծառայությունների մանրամասներ"),
    description: text(
      "Long service sections, features, and links.",
      "Развёрнутые блоки услуг, пункты и ссылки.",
      "Ծառայությունների երկար բաժինները, կետերն ու հղումները։",
    ),
    publicPath: "/services",
    load: getServicesDetailContent,
  },
  {
    id: "about",
    title: text("About us", "О нас", "Մեր մասին"),
    description: text(
      "About page hero, search label, and capabilities.",
      "Баннер, поиск и возможности страницы «О нас».",
      "«Մեր մասին» էջի բանները, որոնումը և հնարավորությունները։",
    ),
    publicPath: "/about-us",
    load: getAboutContent,
  },
  {
    id: "about-projects",
    title: text("About projects", "Проекты «О нас»", "Մեր նախագծերը"),
    description: text(
      "Project row on the about page.",
      "Ряд проектов на странице «О нас».",
      "Նախագծերի շարքը «Մեր մասին» էջում։",
    ),
    publicPath: "/about-us",
    load: getAboutUsProjectsContent,
  },
  {
    id: "about-team",
    title: text("Team", "Команда", "Թիմ"),
    description: text(
      "Team heading, names, roles, and image descriptions.",
      "Заголовок команды, имена, роли и описания фото.",
      "Թիմի վերնագիրը, անունները, դերերն ու նկարագրությունները։",
    ),
    publicPath: "/about-us",
    load: getAboutUsTeamContent,
  },
  {
    id: "customers",
    title: text("Customers", "Клиенты", "Հաճախորդներ"),
    description: text(
      "Customers page copy and industry labels.",
      "Тексты страницы клиентов и отрасли.",
      "Հաճախորդների էջի տեքստերը և ոլորտները։",
    ),
    publicPath: "/customers",
    load: loadCustomersCopy,
  },
  {
    id: "clients",
    title: text("Client names", "Названия клиентов", "Հաճախորդների անուններ"),
    description: text(
      "Names shown with logos on customers, partners, and the homepage.",
      "Имена у логотипов на клиентах, партнёрах и главной.",
      "Անունները լոգոների մոտ՝ հաճախորդներ, գործընկերներ և գլխավոր։",
    ),
    publicPath: "/customers",
    load: () => loadClientNames(),
  },
  {
    id: "partnership",
    title: text("Partnership", "Партнёрство", "Գործընկերություն"),
    description: text(
      "Partnership page heading and call to action.",
      "Заголовок и призыв страницы партнёрства.",
      "Գործընկերության էջի վերնագիրն ու կոչը։",
    ),
    publicPath: "/partnership",
    load: getPartnershipContent,
  },
  {
    id: "contact",
    title: text("Contact", "Контакты", "Կապ"),
    description: text(
      "Contact page, form labels, email, phone, and address.",
      "Страница контактов, подписи формы, почта, телефон и адрес.",
      "Կապի էջը, ձևի դաշտերը, էլ․ փոստը, հեռախոսն ու հասցեն։",
    ),
    publicPath: "/contact-us",
    load: getContactContent,
  },
  {
    id: "footer",
    title: text("Footer", "Подвал", "Ստորին մաս"),
    description: text(
      "Footer description, address, phone, and social labels.",
      "Описание, адрес, телефон и подписи соцсетей в подвале.",
      "Ստորին մասի նկարագրությունը, հասցեն, հեռախոսն ու սոցցանցերը։",
    ),
    publicPath: "/",
    load: getFooterContent,
  },
  {
    id: "projects",
    title: text("Projects page", "Страница проектов", "Նախագծերի էջ"),
    description: text(
      "Projects listing heading and call to action.",
      "Заголовок списка проектов и призыв.",
      "Նախագծերի ցանկի վերնագիրն ու կոչը։",
    ),
    publicPath: "/projects",
    load: getProjectsPageContent,
  },
  {
    id: "career",
    title: text("Careers page", "Страница карьеры", "Կարիերայի էջ"),
    description: text(
      "Careers listing and application form labels.",
      "Список вакансий и подписи формы отклика.",
      "Աշխատատեղերի ցանկի և դիմումի ձևի տեքստերը։",
    ),
    publicPath: "/career",
    load: getCareerPageContent,
  },
  {
    id: "blog",
    title: text("Blog page", "Страница блога", "Բլոգի էջ"),
    description: text(
      "Blog heading, empty states, and homepage stories intro.",
      "Заголовок блога, пустые состояния и блок на главной.",
      "Բլոգի վերնագիրը, դատարկ վիճակները և գլխավորի բլոկը։",
    ),
    publicPath: "/blog",
    load: getBlogPageContent,
  },
  {
    id: "navigation",
    title: text("Navigation", "Навигация", "Նավիգացիա"),
    description: text(
      "Header and footer menu labels.",
      "Подписи меню в шапке и подвале.",
      "Վերևի և ստորին մենյուի անունները։",
    ),
    publicPath: "/",
    load: loadNavigationCopy,
  },
  {
    id: "interface",
    title: text("Shared labels", "Общие подписи", "Ընդհանուր տեքստեր"),
    description: text(
      "Project buttons, empty state, and language names.",
      "Кнопки проектов, пустое состояние и названия языков.",
      "Նախագծի կոճակները, դատարկ վիճակը և լեզուների անունները։",
    ),
    publicPath: "/projects",
    load: (locale) => UI_LABELS[locale],
  },
];

export function getPageCopyCatalog(): readonly PageCopyDefinition[] {
  if (PAGE_COPY.length !== PAGE_COPY_IDS.length) {
    throw new Error("Page copy catalog is out of sync.");
  }

  return PAGE_COPY;
}

export function getPageCopyDefinition(pageId: PageCopyId): PageCopyDefinition {
  const definition = PAGE_COPY.find((page) => page.id === pageId);
  if (!definition) {
    throw new Error(`Unknown page copy: ${pageId}`);
  }

  return definition;
}
