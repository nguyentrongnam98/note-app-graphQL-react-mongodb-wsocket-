import { graphQLrequest } from "./request";
export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String) {
          folder(folderId: $folderId) {
            id,
            name,
            notes {
              id,
              content,
              updatedAt
            }
          },
         }
         `;
  // const res = await fetch("http://localhost:4000/graphql", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     query,
  //     variables: {
  //       folderId: folderId.toString(),
  //     },
  //   }),
  // });
  // const {
  //   data: { folder },
  // } = await res.json();
  // return folder;
  const {data} = await graphQLrequest({
    query,
    variables: {
      folderId: folderId.toString(),
    },
  });
  return data.folder;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String!) {
        note(noteId: $noteId) {
          id,
          content
        }
      }`;
  // const res = await fetch("http://localhost:4000/graphql", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     query,
  //     variables: {
  //       noteId: noteId.toString(),
  //     },
  //   }),
  // });
  // const {
  //   data: { note },
  // } = await res.json();
  // return note;
  const {data} = await graphQLrequest({
    query,
    variables: {
      noteId: noteId.toString(),
    },
  });
  console.log('data.note',data.note);
  return data.note;
};

export const addNewNote = async ({params,request}) => {
 const newNote = await request.formData()
 const formDataObj = {};
 newNote.forEach((value,key) => formDataObj[key] = value)
 const query = `mutation Mutation($content:String,$folderId:String!) {
  addNote(content:$content,folderId:$folderId) {
    id
    content
  }
 }`
 const addNote = await graphQLrequest({query,variables:formDataObj})
 return addNote.data.addNote;
}

export const updateNote = async ({params,request}) => {
  const updatedNote = await request.formData()
  const formDataObj = {};
  updatedNote.forEach((value,key) => formDataObj[key] = value)
  const query = `mutation Mutation($id:String!,$content:String) {
    updateNote(id:$id,content:$content) {
      id
      content
     }
  }`
  const updateNote = await graphQLrequest({query,variables:formDataObj})
  console.log('updateNote',updateNote);
  return null
}
