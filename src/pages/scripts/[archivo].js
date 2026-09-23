// Sirve cada script de /scripts como archivo descargable en /scripts/<archivo>.sh
const archivos = import.meta.glob('../../../scripts/*.sh', { query: '?raw', import: 'default', eager: true });

export const getStaticPaths = () =>
  Object.entries(archivos).map(([ruta, codigo]) => ({ params: { archivo: ruta.split('/').pop() }, props: { codigo } }));

export const GET = ({ props }) =>
  new Response(props.codigo, { headers: { 'Content-Type': 'text/x-shellscript; charset=utf-8' } });
