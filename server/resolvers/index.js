
import { folderModel, authorModel, noteModel } from '../models/index.js'
import { GraphQLScalarType } from 'graphql'
import { PubSub } from 'graphql-subscriptions';
import notificationModel from '../models/NotificationModel.js';
const pubSub = new PubSub()
export const resolvers = {
    Date: new GraphQLScalarType({
      name:'Date',
      parseValue: (value) => {
        return new Date(value)
      },
      serialize: (value) => {
         return value.toISOString()
      }
    }),
    Query: {
      folders: async (parent,args,context) => {
        const data = await folderModel.find({
          authorId:context.uid
        }).sort({updatedAt:'desc'})
        return data;
      },
      folder: async (parent,args) => {  
        const folderId = args.folderId;
        const foundFolder = await folderModel.findById(folderId)
        return foundFolder;
      },
      note: async (parent,args) => {
        const noteId = args.noteId;
        const note = await noteModel.findById(noteId)
        return note;
      }
    },
    Folder: {
      author: async (parent, args, context, info) => {
        const authorId = parent.authorId;
        const author = await authorModel.findOne({uid:authorId})
        return author
      },
      notes: async (parent,args) => {
        const notes = await noteModel.find({folderId:parent.id}).sort({updatedAt:"desc"})
        return notes
      }
    },
    Mutation: {
      addFolder: async (parent,args,context) => {
         const newFolder = new folderModel({...args,authorId:context.uid})
         pubSub.publish('folder_created',{
          folderCreated: {
            message: 'A new folder created'
          }
         })
         await newFolder.save();
         return newFolder;
      },
      addNote: async (parent,args) => {
        const newNote = new noteModel(args)
        await newNote.save()
        return newNote;
      },
      updateNote: async (parent,args) => {
        const noteId = args.id;
        const note = await noteModel.findByIdAndUpdate(noteId,args)
        return note;
      },
      register: async (parent,args) => {
        const foundAuthor = await authorModel.findOne({uid:args.uid})
        if (!foundAuthor) {
          const newAuthor = new authorModel(args)
          await newAuthor.save()
          return newAuthor;
        }
        return foundAuthor;
      },
      pushNotification: async (parent,args) => {
        const newNotification = new notificationModel(args)
        pubSub.publish('push_notification',{
          notification: {
            message: args.content
          }
         })
        await newNotification.save()
        return {message:"Success"}
      }
    },
    Subscription: {
      folderCreated: {
        subscribe: () => pubSub.asyncIterator(['folder_created'])
      },
      notification: {
        subscribe: () => pubSub.asyncIterator(['push_notification'])
      }
    }
};