import fakeData from '../fakeData/index.js'
import { folderModel } from '../models/index.js'
export const resolvers = {
    Query: {
      folders: async () => {
        const data = await folderModel.find()
        console.log('data',data)
        return data;
      },
      folder: (parent,args) => {  
        const folderId = args.folderId;
        return fakeData.folders.find(({id}) => id === folderId)
      },
      note: (parent,args) => {
        const noteId = args.noteId;
        return fakeData.node.find(({id}) => id === noteId)
      }
    },
    Folder: {
      author: (parent, args, context, info) => {
        const authorId = parent.authorId;
        return fakeData.author.find((i) => i.id === authorId)
      },
      notes: (parent,args) => {
        return fakeData.node.filter((i) => i.folderId === parent.id)
      }
    },
    Mutation: {
      addFolder: async (parent,args) => {
         const newFolder = new folderModel({...args,authorId:1})
         console.log('newFolder',newFolder)
         await newFolder.save();
         return newFolder;
      }
    }
};