import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const base = '/guias-andino';

// Agrega el prefijo `base` a los enlaces y las imágenes con rutas absolutas del contenido (/anexos/harvester/).
function prefijarBase() {
  const conBase = (url) => (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(base) ? base + url : url);
  return (tree) => {
    const visitar = (nodo) => {
      if (nodo.tagName === 'a' && typeof nodo.properties?.href === 'string') nodo.properties.href = conBase(nodo.properties.href);
      if (nodo.tagName === 'img' && typeof nodo.properties?.src === 'string') nodo.properties.src = conBase(nodo.properties.src);
      if (nodo.type === 'raw') nodo.value = nodo.value.replace(/\b(src|href)="(\/(?!\/)[^"]*)"/g, (_, attr, url) => `${attr}="${conBase(url)}"`);
      nodo.children?.forEach(visitar);
    };
    visitar(tree);
  };
}

export default defineConfig({
  site: 'https://datosgobar.github.io',
  base,
  devToolbar: { enabled: false },
  markdown: { rehypePlugins: [prefijarBase] },
  integrations: [
    starlight({
      title: 'Portal Andino',
      description: 'Guía para que organismos nacionales, provinciales y municipales instalen y usen su propia instancia de Portal Andino.',
      favicon: '/favicon.png',
      defaultLocale: 'root',
      locales: { root: { label: 'Español', lang: 'es-AR' } },
      customCss: ['./src/styles/datos.css'],
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
        { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap' } },
      ],
      // Por ahora la guía se ve solo en modo claro.
      components: {
        ThemeProvider: './src/components/TemaClaro.astro',
        ThemeSelect: './src/components/Vacio.astro',
        Hero: './src/components/Portada.astro',
        SocialIcons: './src/components/AccesosGuias.astro',
      },
      social: [{ icon: 'github', label: 'Repositorio del stack', href: 'https://github.com/datosgobar/portal-andino-v2' }],
      sidebar: [
        {
          label: 'Guía de instalación',
          items: [
            { label: 'Prerrequisitos', slug: 'instalacion/prerrequisitos' },
            { label: 'Conceptos', slug: 'instalacion/conceptos' },
            { label: 'Arquitectura', slug: 'instalacion/arquitectura' },
            { label: 'Instalación paso a paso', slug: 'instalacion/paso-a-paso' },
          ],
        },
        {
          label: 'Anexos',
          items: [
            { label: 'Harvester', slug: 'anexos/harvester' },
            { label: 'Alta de fuentes de harvesting', slug: 'anexos/alta-de-fuentes' },
            { label: 'Operación', slug: 'anexos/operacion' },
            { label: 'Scripts', slug: 'anexos/scripts' },
            { label: 'Problemas conocidos', slug: 'anexos/problemas' },
            { label: 'Registro de cambios', slug: 'anexos/cambios' },
          ],
        },
        {
          label: 'Guía de uso',
          items: [
            { label: 'Presentación', slug: 'uso' },
            { label: 'Primeros pasos', slug: 'uso/primeros-pasos' },
            { label: 'Organizaciones y temas', slug: 'uso/organizaciones-y-temas' },
            { label: 'Datasets y recursos', slug: 'uso/datasets-y-recursos' },
            { label: 'Personalización y métricas', slug: 'uso/personalizacion' },
          ],
        },
      ],
    }),
  ],
});
