export async function getCategories() {
  const categories = await fetch("/api/category");
  return categories.json();
}
