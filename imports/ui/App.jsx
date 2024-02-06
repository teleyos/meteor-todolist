import React, { useState } from 'react';
import { useTracker } from "meteor/react-meteor-data"
import { Task } from './Task';
import TasksCollection from '/imports/api/tasks';
import TaskForm from './TaskForm';
import { Meteor } from 'meteor/meteor';
import { LoginForm } from './LoginForm';
import useAsyncEffect from 'use-async-effect';

export const App = () => {
    const user = useTracker(() => Meteor.user(),[])
    const [subscription,setSubscription] = useState(null)

    useAsyncEffect(async ()=>{
        if (user) {
            setSubscription(Meteor.subscribe('tasks',user._id))
            return
        }
        return subscription?.stop()
    },[user])

    const tasks = useTracker(() => user ? TasksCollection
        .find({ userID: user._id }, { sort: { createdAt: -1 } })
        .fetch()
        : [])

    const toggleChecked = ({ _id, isChecked }) => {
        TasksCollection.update(_id, {
            $set: {
                isChecked: !isChecked
            }
        })
    }

    const deleteTask = ({ _id }) => {
        TasksCollection.remove(_id)
    }

    const logout = async () => {
        Meteor.logout()
    }

    return (
        <div className='main'>
            <h1>Welcome to Meteor!</h1>
            {
                user ? <>
                    <div className='user' onClick={logout}>{user.username}</div>

                    <TaskForm user={user} />
                    <ul>
                        {tasks.map(task => (
                            <Task
                                key={task._id}
                                task={task}
                                onCheckboxClick={toggleChecked}
                                onDeleteClick={deleteTask}
                            />)
                        )}
                    </ul>
                </> : <>
                    <LoginForm />
                </>

            }
        </div>
    );
}
