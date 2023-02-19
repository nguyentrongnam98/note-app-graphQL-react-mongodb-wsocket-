export const foldersLoader = async () => {
  const query = `query Query {
          folders {
            id,
            name,
            author {
              id,
              name
            }
          }
        }`;
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  return data;
};
