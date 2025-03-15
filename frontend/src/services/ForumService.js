export const getForumPosts = async () => {
  const response = await fetch("/api/forum/posts"); // Replace with actual endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch forum posts");
  }
  return response.json();
};
