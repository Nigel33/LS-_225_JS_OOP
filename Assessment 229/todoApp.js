
var TodosCreator = (function() {
var idCounter = 1000;
var MONTHS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

function getId() {
  idCounter++;
  return idCounter;
}

 function titleValid(title) {
  if (title.length >= 3) {
    return true;
  }

  return false;
}

function monthValid(month) {
  if (MONTHS.includes(month) || month === '') {
    return true;
  }

  return false;
}

function yearValid(year) {
  if (year.length === 4 || year === '') {
    return true
  }
}

return function(title, month, year, description) {
  if (titleValid(title) && monthValid(month) && yearValid(year)) {
    this.id = getId();
    this.title = title;
    this.month = month;
    this.year = year;
    this.completed = false;
    this.description = description;
    console.log('Todo ' + this.id + ' created succesfully!');
  } else {
    console.log("One of the inputs is not valid. Please try again");
    return {notValid: true};
  }

}
})();

TodosCreator.prototype.isWithinMonthYear = function(month, year) {
var todoDate = new Date(Number(this.year), Number(this.month - 1), 1);
var dataDate = new Date(Number(year), Number(month - 1), 1);

return todoDate.getTime() <= dataDate.getTime();
}

var todoList = (function() {
function getTodo(id) {
  return this.todoSet.filter(function (todo) {
    return todo.id === id;
  })[0];
};

return {
  add: function(todo) {
    if (todo.notValid === true) {
      console.log('todo is invalid. Todo not added to collection');
    } else {
      this.todoSet.push(todo);
      console.log('todo added successfuly!');
    }
  },

  delete: function(id) {
    var todo = getTodo.call(this, id);
    if (todo) {
      var index = this.todoSet.indexOf(todo);
      this.todoSet.splice(index, 1);
      console.log('todo deleted!');
    } else {
      console.log('todo not found!');
    }

  },

  initialize: function() {
    this.todoSet = [todoData1, todoData2, todoData3, todoData4];
  },

  update: function(id, todoInformation) {
    var todo = getTodo.call(this, id);
    if (todo) {
      Object.assign(todo, todoInformation);
      console.log('Update completed!')
    } else {
      console.log('Todo not found. Update unsuccessful');
    }

  },

  displayObject: function(id) {
    var obj = {};
    return Object.assign(Object.create(TodosCreator.prototype), getTodo.call(this, id));
  },

  getAllIds: function() {
    return this.todoSet.map(function (todo) {
      return todo.id;
    });
  },
}
})();

var todoManager = (function() {
function validTodos(id) {
  return this.list.displayObject(id);
};

function completed(id) {
  return this.list.displayObject(id).completed === true;
}

return {
  list: todoList,
  displayAllTodos: function() {
    var allId = this.list.getAllIds();
    return allId.map(validTodos, this);
  },

  displayCompletedTodos: function() {
    var allId = this.list.getAllIds();
    return allId.filter(completed, this).map(validTodos, this);
  },

  displayTodosBeforeMonthYear: function(month, year) {
    var allId = this.list.getAllIds();
    var self = this;

    return allId.filter(function(id) {
      var todo = self.list.displayObject(id);

      return todo.isWithinMonthYear(month, year)
    }).map(validTodos, this);
  },

  displayCompletedTodosBeforeMonthYear: function(month, year) {
    allId = this.list.getAllIds();
    var self = this;

    return allId.filter(function(id) {
      var todo = self.list.displayObject(id);
      return todo.isWithinMonthYear(month, year) && todo.completed === true
    }).map(validTodos, this);
  },
};
})()

console.log('FULL APPLICATION TEST SUITE');
console.log('-----------------------------------');
console.log('Creating Todos');
console.log('All results below should return success...');
var todoData1 = new TodosCreator('Buy Milk', '1', '2018', 'Milk for baby');
var todoData2 = new TodosCreator('Buy Apples', '', '2017', 'An Apple a day keeps the doctor away');
var todoData3 = new TodosCreator('Buy Chocolate', '1', '', 'For the cheat day');
var todoData4 = new TodosCreator('Buy Veggies', '', '', 'For the daily fiber needs');
var todoData5 = new TodosCreator('Buy Books', '5', '2017', 'For education');
var todoData6 = new TodosCreator('Buy Pens', '', '2017', 'For writing');
console.log('All results below should return failure...');
var todoData7 = new TodosCreator('Bu', '', '', 'For the daily fiber needs');
var todoData8 = new TodosCreator('', '', '', 'For the daily fiber needs');
var todoData9 = new TodosCreator('Buy Milk', '14', '', 'For the daily fiber needs');
var todoData10 = new TodosCreator('Buy Milk', '12', '201', 'For the daily fiber needs');
console.log('');


console.log('-----------------------------------');
console.log('BEGIN TODOLIST SEQUENCE');
todoList.initialize();
console.log('All results below should return success...');
todoList.add(new TodosCreator('Buy fruits', '10', '2017', 'For Vitamins!'))
todoList.add(todoData5);
todoList.add(todoData6);
todoList.delete(1002);
console.log('All results below should return failure...');
todoList.add(todoData9);
todoList.add(todoData10);
todoList.delete(1020);
console.log(todoManager.displayAllTodos());
console.log('Should return 6 todos since one was deleted')
console.log('');

console.log('-----------------------------------')
console.log('Updating information');
console.log('All results below should return success...');
todoList.update(1001, {completed: true});
todoList.update(1003, {completed: true});
todoList.update(1005, {completed: true});
todoList.update(1006, {completed: true});
todoList.update(1004, {description: 'For extra fiber'});
console.log('All results below should return failure...');
todoList.update(1020, {completed: true});
console.log(todoManager.displayAllTodos());
console.log('');

console.log('-----------------------------------')
console.log('Displaying data integrity of todos in todoList');
console.log(todoList.displayObject(1001));
console.log('Attempting to modify data directly...');
todoList.displayObject(1001).title = 'Buy Chocolate Milk';
console.log(todoList.displayObject(1001));
console.log('No changes registered...');

console.log('-----------------------------------');
console.log('BEGIN TODOMANAGER SEQUENCE');
console.log(todoManager.displayAllTodos());
console.log(todoManager.displayCompletedTodos());
console.log(todoManager.displayTodosBeforeMonthYear('11', '2017'));
console.log(todoManager.displayCompletedTodosBeforeMonthYear('11', '2017'));
console.log('');

console.log('-----------------------------------')
console.log('Displaying data integrity of todos in todoManager');
todoManager.displayCompletedTodosBeforeMonthYear('11', '2017')[0].title = 'Buy Chocolate Milk';
console.log(todoManager.displayCompletedTodosBeforeMonthYear('11', '2017')[0]);
console.log('No changes registered...');

