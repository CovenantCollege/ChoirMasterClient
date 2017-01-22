export function addSinger(singer) {
  console.log(singer);
  return { type: 'SINGER_ADDED', payload: { singer }};
}