export function download(url: string) {
  const ent = document.createElement("a");
  ent.href = url;
  ent.style.display = "none";
  document.body.appendChild(ent);
  ent.click();
  document.body.removeChild(ent);
}
