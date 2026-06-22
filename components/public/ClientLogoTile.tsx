import Image from "next/image";
import type { ClientLogo } from "@/lib/clients-section";

type ClientLogoTileProps = {
  client: ClientLogo;
};

export function ClientLogoTile({ client }: ClientLogoTileProps) {
  return (
    <article className="trusted-by-tile" data-accent={client.accent}>
      <span className="trusted-by-tile-glow" aria-hidden="true" />
      <span className="trusted-by-tile-edge trusted-by-tile-edge-top" aria-hidden="true" />
      <span className="trusted-by-tile-edge trusted-by-tile-edge-bottom" aria-hidden="true" />

      <div className="trusted-by-tile-logo-wrap">
        <Image
          src={client.logoSrc}
          alt={client.name}
          width={client.logoWidth}
          height={client.logoHeight}
          className="trusted-by-tile-logo"
          sizes="(max-width: 768px) 96px, 132px"
        />
      </div>
    </article>
  );
}
