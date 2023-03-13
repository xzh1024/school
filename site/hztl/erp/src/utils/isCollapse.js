export function loadIsCollapse(localIsCollapse, name) {
  const isCollapse = localStorage[`${name}IsCollapse`]
    ? JSON.parse(localStorage[`${name}IsCollapse`]).isCollapse
    : localIsCollapse;
  return isCollapse;
}

export function cacheIsCollapse(isCollapse, name) {
  if (
    localStorage[`${name}IsCollapse`] &&
    JSON.parse(localStorage[`${name}IsCollapse`]).isCollapse === isCollapse
  )
    return;
  const localParams = { isCollapse };
  localStorage[`${name}IsCollapse`] = JSON.stringify(localParams);
}
