export default function generateUniqueTitle(baseTitle, existingTitles) {
  let title = baseTitle;
  let counter = 1;

  while (existingTitles.has(title)) {
    title = `${baseTitle}-${counter}`;
    counter++;
  }

  return title;
}
