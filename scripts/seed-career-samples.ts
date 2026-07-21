import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { normalizeDatabaseUrl } from "@/lib/database-url";

const samples = [
  {
    slug: "frontend-developer",
    salary: "450,000 – 700,000 AMD",
    workHours: "Full-time · 10:00–19:00",
    coverImage: "/cdn/static/images/projects/vexpo-bg.png",
    en: {
      title: "Frontend Developer",
      description:
        "Build immersive web experiences with Next.js and TypeScript.\n\nYou will work closely with designers and 3D artists to ship polished public pages and interactive product demos.\n\nRequirements:\n• Strong React / Next.js experience\n• TypeScript and modern CSS\n• Attention to motion and accessibility",
    },
    hy: {
      title: "Frontend ծրագրավորող",
      description:
        "Կառուցեք immersive վեբ փորձառություններ Next.js և TypeScript-ով։\n\nԿաշխատեք դիզայներների և 3D նկարիչների հետ՝ հրապարակային էջեր և ինտերակտիվ դեմոներ ստեղծելու համար։\n\nՊահանջներ՝\n• React / Next.js փորձ\n• TypeScript և ժամանակակից CSS\n• Ուշադրություն motion-ի և accessibility-ի նկատմամբ",
    },
  },
  {
    slug: "3d-artist",
    salary: "400,000 – 650,000 AMD",
    workHours: "Full-time · Flexible",
    coverImage: "/cdn/static/images/projects/vcity-bg.png",
    en: {
      title: "3D Artist",
      description:
        "Create high-quality environments and product visuals for virtual exhibitions and real-estate experiences.\n\nYou will own modeling, lighting, and look-dev for client projects.\n\nRequirements:\n• Blender or similar DCC tools\n• Strong lighting and material skills\n• Portfolio of architectural or product work",
    },
    hy: {
      title: "3D նկարիչ",
      description:
        "Ստեղծեք բարձրորակ միջավայրեր և product visuals վիրտուալ ցուցահանդեսների և անշարժ գույքի փորձառությունների համար։\n\nԴուք կպատասխանեք մոդելավորման, լուսավորության և look-dev-ի համար։\n\nՊահանջներ՝\n• Blender կամ նմանատիպ գործիքներ\n• Լուսավորության և մատերիալների հմտություններ\n• Պորտֆոլիո ճարտարապետական կամ product աշխատանքներով",
    },
  },
  {
    slug: "project-manager",
    salary: "500,000 – 800,000 AMD",
    workHours: "Full-time · 09:00–18:00",
    coverImage: "/cdn/static/images/projects/estatedata-bg.png",
    en: {
      title: "Project Manager",
      description:
        "Coordinate delivery of immersive products from kickoff to launch.\n\nYou will manage timelines, client communication, and cross-team collaboration between design, engineering, and art.\n\nRequirements:\n• 2+ years in digital product delivery\n• Clear written and spoken English and Armenian\n• Comfortable with agile rituals and stakeholder updates",
    },
    hy: {
      title: "Նախագծերի մենեջեր",
      description:
        "Համակարգեք immersive արտադրանքների առաքումը մեկնարկից մինչև թողարկում։\n\nԿկառավարեք ժամանակացույցը, հաճախորդների հետ հաղորդակցությունը և թիմերի համագործակցությունը։\n\nՊահանջներ՝\n• 2+ տարի digital product delivery փորձ\n• Հստակ անգլերեն և հայերեն\n• Agile գործընթացների և stakeholder update-ների փորձ",
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
    for (const sample of samples) {
      await prisma.careerJob.upsert({
        where: { slug: sample.slug },
        create: {
          slug: sample.slug,
          salary: sample.salary,
          workHours: sample.workHours,
          coverImage: sample.coverImage,
          isPublished: true,
          translations: {
            create: [
              {
                locale: "en",
                title: sample.en.title,
                description: sample.en.description,
              },
              {
                locale: "hy",
                title: sample.hy.title,
                description: sample.hy.description,
              },
            ],
          },
        },
        update: {
          salary: sample.salary,
          workHours: sample.workHours,
          coverImage: sample.coverImage,
          isPublished: true,
          translations: {
            deleteMany: {},
            create: [
              {
                locale: "en",
                title: sample.en.title,
                description: sample.en.description,
              },
              {
                locale: "hy",
                title: sample.hy.title,
                description: sample.hy.description,
              },
            ],
          },
        },
      });

      console.log(`Seeded career job: ${sample.slug}`);
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
