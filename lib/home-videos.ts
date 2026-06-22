import type { Locale } from "@/lib/i18n";

export type HomeVideoItem = {
  id: string;
  src: string;
  poster?: string;
  title: Record<Locale, string>;
  description?: Record<Locale, string>;
};

const HOME_VIDEOS: HomeVideoItem[] = [
  {
    id: "showcase-01",
    src: "/videos/showcase-01.mp4",
    title: {
      en: "Evolver in motion",
      hy: "Evolver-ը գործողության մեջ",
    },
    description: {
      en: "Immersive digital experience captured in real time.",
      hy: "Լիարժեք թվային փորձառություն՝ գրանցված իրական ժամանակում։",
    },
  },
  {
    id: "showcase-02",
    src: "/videos/showcase-02.mp4",
    title: {
      en: "3D experience preview",
      hy: "3D փորձառության նախադիտում",
    },
    description: {
      en: "Interactive spatial presentation built with cutting-edge technology.",
      hy: "Ինտերակտիվ տարածական ներկայացում՝ ստեղծված նորագույն տեխնոլոգիաներով։",
    },
  },
];

export function getHomeVideos(): HomeVideoItem[] {
  return HOME_VIDEOS;
}

export function getHomeVideoCopy(locale: Locale): {
  eyebrow: string;
  titleLines: Array<{ text: string; gradient?: boolean }>;
  subtitle: string;
} {
  if (locale === "hy") {
    return {
      eyebrow: "Շարժման մեջ",
      titleLines: [
        { text: "Փորձառություն" },
        { text: "գործում", gradient: true },
      ],
      subtitle: "Թերթեք և դիտեք մեր immersive 3D աշխատանքները գործողության մեջ։",
    };
  }

  return {
    eyebrow: "In motion",
    titleLines: [
      { text: "Experience" },
      { text: "in action", gradient: true },
    ],
    subtitle: "Swipe through immersive 3D experiences captured in motion.",
  };
}
