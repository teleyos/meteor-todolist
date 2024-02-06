import { Mongo } from 'meteor/mongo';

const TasksCollection = new Mongo.Collection('tasks')
TasksCollection.allow({
    insert:()=>true,
    update:()=>true,
    remove:()=>true,
})

export default TasksCollection

