import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { normalizeDatabaseUrl } from "@/lib/database-url";
import { staticAssetUrl } from "@/lib/static-assets";

const SAMPLE_POSTS = [
  {
    slug: "immersive-3d-tours-future",
    coverImage: staticAssetUrl("/images/projects/estatedata-bg.png"),
    translations: {
      en: {
        title: "Why immersive 3D tours are the future of property discovery",
        description:
          "Virtual walkthroughs are changing how people explore homes and venues before they visit. In this post we share how Evolver builds production-ready 3D experiences that feel natural on every device.\n\nFrom capture to publish, the goal is clarity: visitors should understand space, light, and layout in minutes — not after a long onboarding flow.",
      },
      hy: {
        title: "Ինչու immersive 3D տուրերը անշարժ գույքի հայտնագործման ապագան են",
        description:
          "Վիրտուալ տուրերը փոխում են այն, թե ինչպես են մարդիկ ուսումնասիրում տներն ու վայրերը՝ նախքան այցելելը։ Այս գրառման մեջ կիսվում ենք, թե ինչպես է Evolver-ը ստեղծում production-ready 3D փորձառություններ։\n\nՆպատակը պարզությունն է. այցելուն պետք է րոպեների ընթացքում հասկանա տարածքը, լույսը և դասավորությունը։",
      },
    },
  },
  {
    slug: "behind-the-scan-studio-notes",
    coverImage: staticAssetUrl("/images/projects/vexpo-bg.png"),
    translations: {
      en: {
        title: "Behind the scan: notes from the Evolver studio",
        description:
          "A quick look at how our team plans a capture day — gear checks, lighting decisions, and the small details that keep 3D scans clean.\n\nGood data starts on site. When the scan is disciplined, editing stays creative instead of corrective.",
      },
      hy: {
        title: "Սկանավորման հետևում. նշումներ Evolver ստուդիայից",
        description:
          "Կարճ հայացք այն բանին, թե ինչպես է մեր թիմը պլանավորում capture օրը՝ սարքավորումներ, լուսավորություն և մանրամասներ, որոնք 3D սկանը պահում են մաքուր։\n\nԼավ տվյալները սկսվում են տեղում։ Երբ սկանը կարգապահ է, խմբագրումը մնում է ստեղծագործ։",
      },
    },
  },
  {
    slug: "partnering-on-virtual-events",
    coverImage: staticAssetUrl("/images/projects/vcity-bg.png"),
    translations: {
      en: {
        title: "Partnering on virtual events that feel real",
        description:
          "Expos and brand moments deserve more than a slideshow. We write about co-building virtual event spaces with partners — from first brief to a launch that audiences can explore.\n\nThe strongest collaborations start with a shared story, then layer interaction, media, and spatial design around it.",
      },
      hy: {
        title: "Գործընկերություն վիրտուալ միջոցառումների շուրջ, որոնք իրական են թվում",
        description:
          "Expo-ները և բրենդային պահերը արժանի են ավելին, քան սլայդշոուն։ Գրում ենք գործընկերների հետ վիրտուալ միջոցառումների տարածքներ ստեղծելու մասին՝ առաջին brief-ից մինչև launch։\n\nԱմենաուժեղ համագործակցությունները սկսվում են ընդհանուր պատմությունից, ապա ավելացնում են interaction, media և spatial դիզայն։",
      },
    },
  },
] as const;

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL must be set.");
  }

  const pool = new Pool({ connectionString: normalizeDatabaseUrl(connectionString) });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    for (const post of SAMPLE_POSTS) {
      await prisma.post.upsert({
        where: { slug: post.slug },
        create: {
          slug: post.slug,
          coverImage: post.coverImage,
          isPublished: true,
          translations: {
            create: [
              {
                locale: "en",
                title: post.translations.en.title,
                description: post.translations.en.description,
              },
              {
                locale: "hy",
                title: post.translations.hy.title,
                description: post.translations.hy.description,
              },
            ],
          },
        },
        update: {
          coverImage: post.coverImage,
          isPublished: true,
          translations: {
            deleteMany: {},
            create: [
              {
                locale: "en",
                title: post.translations.en.title,
                description: post.translations.en.description,
              },
              {
                locale: "hy",
                title: post.translations.hy.title,
                description: post.translations.hy.description,
              },
            ],
          },
        },
      });

      console.log(`Upserted post: ${post.slug}`);
    }
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
