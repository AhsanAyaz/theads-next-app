"use server";

export const getCommentsServerFunc = async (parentId: string | null) => {
  let url = `http://localhost:3000/api/comments`;
  if (parentId) {
    url += `?parentId=${parentId}`;
  }
  const resp = await fetch(url);
  const respBody = await resp.json();
  return respBody.comments;
};
