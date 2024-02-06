import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import TasksCollection from '/imports/api/tasks';

const SEED_USERNAME = "meteorite"
const SEED_PASSWORD = "password"

Meteor.publish('tasks', (userID) => { 
    return TasksCollection.find({userID}) 
})

async function insertTask({ text, user }) {
    await TasksCollection.insertAsync({
        text,
        userId: user._id,
        createdAt: new Date()
    });
}


Meteor.startup(async () => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        })
    }

    const user = Accounts.findUserByUsername(SEED_USERNAME)

    if (await TasksCollection.find().countAsync() === 0) {
        [
            'test 1',
            'test 2',
            'test 3',
            'test 4',
            'test 5',
            'test 6',
            'test 7',
            'test 8',
        ].forEach(task => insertTask(task, user))
    }
});
