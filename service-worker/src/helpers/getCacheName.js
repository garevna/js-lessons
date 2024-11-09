export const getCacheName = () => location.port
  ? 'localhost'
  : location.pathname.replace('/service-worker.js', '').replaceAll('/', '') || 'js-lessons'
