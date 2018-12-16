export default function (offset, base) {
  const bounds = base.getBoundingClientRect();

  return {
    left: offset.clientX - bounds.left,
    top: offset.clientY - bounds.top
  };
}
