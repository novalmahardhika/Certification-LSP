export function formatDate(date: Date) {
  return new Date(date).toLocaleString('default', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
