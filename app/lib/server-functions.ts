"use server";

export const getCommentsServerFunc = async (parentId: string | null) => {
  let url = `${process.env.NEXT_BASE_URL}/api/comments`;
  if (parentId) {
    url += `?parentId=${parentId}`;
  }
  const resp = await fetch(url);
  const respBody = await resp.json();
  return respBody.comments;
};
