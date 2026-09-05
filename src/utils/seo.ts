export function setPageTitle(title: string, description?: string, image?: string) {
  const fullTitle = `${title} | Konya Teknik Üniversitesi Kariyer Gelişim Merkezi`;
  document.title = fullTitle;

  const defaultDesc =
    'Konya Teknik Üniversitesi Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi resmi web portalı. İş ve staj ilanları, kariyer danışmanlığı, etkinlikler ve kurumsal iş birlikleri.';

  const descContent = description || defaultDesc;

  // 1. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', descContent);

  // 2. OpenGraph Tags
  const setOgMeta = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  setOgMeta('og:title', fullTitle);
  setOgMeta('og:description', descContent);
  setOgMeta('og:type', 'website');
  setOgMeta('og:site_name', 'KTÜN Kariyer Portalı');
  setOgMeta('og:url', window.location.href);
  if (image) {
    setOgMeta('og:image', image);
  }

  // 3. Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', window.location.href);
}

export function injectInstitutionalSchema() {
  const schemaId = 'ktun-schema-org';
  if (document.getElementById(schemaId)) return;

  const script = document.createElement('script');
  script.id = schemaId;
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Konya Teknik Üniversitesi Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi',
    alternateName: 'KTÜN Kariyer',
    url: 'https://kariyer.ktun.edu.tr',
    logo: 'https://www.ktun.edu.tr/Content/Images/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Akademi Mah. Yeni İstanbul Cad. No:369',
      addressLocality: 'Selçuklu',
      addressRegion: 'Konya',
      postalCode: '42130',
      addressCountry: 'TR',
    },
    telephone: '+90-332-205-1111',
    email: 'kariyer@ktun.edu.tr',
  });
  document.head.appendChild(script);
}
