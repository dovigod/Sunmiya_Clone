export function isIncluded(src, target) {
  const regex = new RegExp(target, 'g');
  return regex.test(src);
}
