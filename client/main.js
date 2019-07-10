import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { toDos } from '../imports/api/todos.js';


Template.toDoList.helpers({
  //get all tasks, sorted by completd status and created date.
  toDos() {
      return toDos.find({},{ sort: {completed:false, createdAt: -1 }});
    },
});

Template.toDoList.events({
  'click .toggle-checked'() {
     // Set the completed property to the opposite of its current value
     toDos.update(this._id, {
       $set: { completed : ! this.completed },
     });
   },

  'click .delete'() {
    //delete selected task from the collection
     toDos.remove(this._id);
   },
})

Template.addNew.events({
  'submit .add-new'(event){
    event.preventDefault();

    // Get value from form element
   const target = event.target;
   const text = target.text.value;

   // Insert a task into the collection
   if(text){
     toDos.insert({
       text: text,
       createdAt: new Date(), // current time
       createdBy: 1,
       completed: false,
     });
   }

   // Clear form
   target.text.value = '';
  }
});
