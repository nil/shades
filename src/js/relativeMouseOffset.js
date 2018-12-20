export default function (offset, base) {
  const bounds = base.getBoundingClientRect();

  return offset.clientX - bounds.left;
}
