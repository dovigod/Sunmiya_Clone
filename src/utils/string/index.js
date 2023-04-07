export function isIncluded(src, target) {
  const regex = new RegExp(target, 'g');
  return regex.test(src);
}

export function popTokenIdFromName(item) {
  return Number(item.name.split('#')[1]);
}
