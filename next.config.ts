import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale/education-et-recherche',
        destination: '/:locale/institutions?tab=appui',
        permanent: true,
      },
      {
        source: '/:locale/acteur-publics',
        destination: '/:locale/institutions?tab=bureaux',
        permanent: true,
      },
      {
        source: '/:locale/entreprises',
        destination: '/:locale/institutions?tab=enseignement',
        permanent: true,
      },
      {
        source: '/:locale/acteur-dappui-au-developpement',
        destination: '/:locale/institutions?tab=entreprises',
        permanent: true,
      },
      {
        source: '/:locale/institution-transfrontaliere',
        destination: '/:locale/institutions?tab=transfrontaliere',
        permanent: true,
      },
      {
        source: '/:locale/ongs-et-oscs-2',
        destination: '/:locale/institutions?tab=ongs',
        permanent: true,
      }
    ];
  }
};

export default withNextIntl(nextConfig);
