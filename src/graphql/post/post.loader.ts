import { readDatabase } from "../../utils/load";

export async function loadAll() {
  const post = await readDatabase("posts");

  if (!post) {
    return null;
  }

  return post.reverse();
}
