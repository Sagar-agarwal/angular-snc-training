class: center, middle, title

# Introduction to AngularJS

## Chris Tucker, Will Leingang
### ServiceNow Core (Platform) UI Team

---

# Goals of this training

* Familiarize everyone with Angular techniques and terminology
* Gain hands-on experience writing an Angular application
* Learn how to write tested Angular code
* Understand how we integrate Angular into the ServiceNow platform

---

# How this will be organized

* Combination of three styles:
	* Presented overviews of aspects of Angular
	* Live development of features
	* Paired-up implementation of features by all of you
* Testing is an integral part of the course
* Code is all in a github repo

---

# Code and Node

Clone code from Github:

```terminal
$ git clone http://github.com/ctucker/angular-snc-training
```

Install NodeJS (for the testing framework):

* http://nodejs.org/ or `brew install node`

Check instructions in README.md file for more info

???

Pause to get everyone set up

---

# Glide: Security Manager & Plugins

Disable the security manager.

```terminal
-Dglide.security.policy=none
```

Add the plugic path to angular-snc-training:

```terminal
-Dglide.plugins.directories=$PATH:<new-path>
```

* IntelliJ: Run configuration, VM options
* Eclipse: Run Configurations, Arguments, VM arguments

---

layout: true
.step-name[x-start-here]

---

# Karma test runner

We run all of our unit tests using Karma.  Verify it works like so:

```terminal
$ ./node_modules/karma/bin/karma start
<span class="aha-fg-white ">...(various output here)...</span>
<span class="aha-fg-green ">INFO [Chrome 30.0.1599 (Mac OS X 10.8.5)]: </span><span class="aha-fg-white ">Connected on socket R1mFdn9VnQW6vTRaKq9N
.
Chrome 30.0.1599 (Mac OS X 10.8.5): Executed 1 of 1</span><span class="aha-fg-green "> SUCCESS</span><span class="aha-fg-white "> (0.823 secs / 0.008 secs)
</span>
```

* Ensure you have up-to-date Chrome

???

Pause to help out with any issues in getting Karma running
Walk through getting set up with IntelliJ and Eclipse

---

# End-to-end: Selenium server

Launch selenium server in a background tab:

```terminal
$ gulp webdriver-standalone
[<span class="aha-fg-green ">gulp</span><span class="aha-fg-white ">] Using gulpfile </span><span class="aha-fg-magenta ">gulpfile.js</span><span class="aha-fg-white ">
[</span><span class="aha-fg-green ">gulp</span><span class="aha-fg-white ">]
Starting '</span><span class="aha-fg-cyan">webdriver-standalone</span><span class="aha-fg-white ">'...
<span class="aha-fg-white ">...(various output here)...</span>
17:22:50.788 INFO - Started org.openqa.jetty.jetty.Server@7c4c51
```

---

# End-to-end: Protractor

Run protractor:

```terminal
$ gulp
[<span class="aha-fg-green ">gulp</span><span class="aha-fg-white ">] Using gulpfile </span><span class="aha-fg-magenta ">/Users/ctucker/dev/js/angular-snc-2014/gulpfile.js</span><span class="aha-fg-white ">
[</span><span class="aha-fg-green ">gulp</span><span class="aha-fg-white ">] Starting '</span><span class="aha-fg-cyan ">protractor</span><span class="aha-fg-white ">'...
Using the selenium server at http://localhost:4444/wd/hub
</span><span class="aha-fg-green ">.</span>

Finished in 2.437 seconds
<span class="aha-fg-green ">1 test, 0 assertions, 0 failures</span>
```

---

# WebStorm / IntelliJ users

You can run Karma from within the IDE natively.

Install the Angular JS and Karma plugins, then right click on the
`karma.conf.js` in the root and choose "Run".

---

# On to the real work!

.middle[.center[![task0-complete](images/todolist-task0.png)]]

---

layout: true
.step-name[x-task1-step1]

---

class: center, middle, title

# A quick tour of the existing code

---

# Adding behavior, test-first

Let's add a simple feature:

* _When_ I type into the input box and hit enter
* _Then_ the first entry in the list of todos reflects the newly
  entered task

--

To do this, we follow .red[_red_], .green[_green_], .blue[_refactor_]

* .red[Red]: Write a failing test
* .green[Green]: Make it pass
* .blue[Refactor]: Clean up our code

???

To be implemented by presenter live

---

layout: true
.step-name[x-task1-step2]

---

# Model, View, Controller

.middle[.center[![MVC](images/angular-mvc.png)]]

---

# A brief tour of Angular bindings

* `ng-model="newTask"` adds a newTask variable to the `root` scope
* `{{ newTask }}` binds that variable into the HTML
* Angular takes care of updating the bound value when the scope value
  is changed

.middle[.center[![newTask binding](images/newTask-Scope.png)]]

---

# $watch(), $apply(), and $digest()

.fullsize[![Angular Lifecycle](images/angularLifecycle.svg)]

---

layout: true
.step-name[x-task1-step3]

---

# Only add the task on enter

Right now we update the task title in place.  We want to only do
this when the user hits enter.

* At this point, we're going to need some custom JS
* This is where the *Controller* and *scope* come in

---

# Controllers

* Establishes a new scope that inherits from its parent
* Declared in JS:
```javascript
angular.module('todo').controller('CtrlName', fn)
```
* and in HTML
```html
<div ng-controller="CtrlName">...</div>
```
* All our behavior and data will go on the scope

???

Note that scope is *not* the model

---

# Scope

* Hierarchy of JS objects
* Prototypically inherit from one another
* Each new angular piece (controller, directive, etc.) creates a new
  scope
* Exact nature of inheritance relationship varies
* Consider scope as a big pinboard on which we tack all of the bits of
  data and code the View can access

---

# Adding the task on enter

Basic approach:

* Write test for initial state and build empty controller
* Write test that exercises an "add task" method and update the
  controller
* Wire it all up in the HTML

???

Going to add:
Module definition
Controller

---

layout: true
.step-name[x-task1-step4]

---

# Adding multiple tasks

The controller currently lets you add multiple tasks, but we do
nothing with them.

1. Write a unit test to confirm that calling `addTask()` adds a new
   task to the end of the task list

--

2. Write an e2e test that verifies that submitting first one task then
   another results in two tasks being added to the list

--

3. Update the HTML to make the new e2e test pass

---

layout: true
.step-name[x-task1-step5]

---

layout: true
.step-name[x-task1-step6]

---

# Multiple tasks HTML

We need to repeat elements on the page so we'll use the `ng-repeat`
directive.

Usage:
```html
<li ng-repeat="«name» in «scope variable»">
	...
	{{ «name».«property» }}
	...
</li>
```

* After making your change, run your e2e tests

---

layout: true
.step-name[x-task1-step7]

---

# A little bit about Directives

* Directives in Angular are the only thing that can manipulate the DOM
* We've already seen a few built-in directives:
  * `ng-controller`: connect a controller and set up a new scope
  * `ng-model`: bind a model value to an input
  * `ng-submit`: set a form-submission handler
  * `ng-repeat`: repeat a DOM template for every element in a list
* Directives allow us to *extend* HTML with custom markup
* Later we'll learn to write our own...

---

# Cleaning up the UI

There are still a couple of niggling UI issues:

1. We should clear the input after submitting the form
2. We should strip leading and trailing whitespace for task titles
3. We should not allow the submission of an empty or undefined task

Write tests and implementation for each of these in turn, using what we've
learned so far.

You can trust Angular, so test at the controller level.

---

# Binding flashes

* Angular loads _after_ the DOM is parsed and presented to the user
* Mustache bindings can flicker in before Angular replaces them
* Fix this with `ng-bind` and `ng-cloak`

```html
<span ng-cloak>Hello, {{ name }}</span>
<span ng-bind="greeting" />
<span ng-bind-template="Hello, {{name}}" />
```

---

layout: true
.step-name[part1-complete]

---

layout: true
.step-name[x-task1-step8]

---

# Marking tasks complete

Clicking the check mark next to a task should mark it completed and
set the `<li>` class to `completed`.

Conditionally set a class with the `ng-class` on the `<li>`

```javascript
ng-class="{ «class_name» : «boolean expression» }"
```

* Track completion status of each task
* Use an `ng-model` binding on checkbox to set status
* Use `ng-class` to set the class

???

e2e:
* incomplete to start
* complete on click
* incomplete on second click

unit:
* incomplete to start (redundant with e2e, but fast)
* clean up all of the equality checks etc.

html:
* add the ng-class, update to fit with new task structure

---

layout: true
.step-name[x-task1-step9]

---

# Deleting tasks

Mouse over a task to see a red X on the right.

Clicking the red X should delete the task from the list.

* Write tests for and implement a `deleteTask` function on your controller
* Invoke it using an `ng-click` directive on the delete button
* An e2e test would be nice, but leave it to the end: hover support is
  complex

???

Basic approach: deleteTask(task), indexOf to find task, splice to pull
it out

e2e:
* deleteEntry uses browser.actions and mouseMove to go the li, then
  standard click on the delete button
* webelement list #count() to get number of entries

unit:
* Just verify the simple deletion case
  * may be an entry point to discuss what tests to write


---

# Task 1: Complete!

.middle[.center[![task1-complete](images/todolist-task1.png)]]

---

layout: true
.step-name[x-task2-start]

---

# Recall $watch/$apply/$digest

.fullsize[![Angular Lifecycle](images/angularLifecycle.svg)]

---

# $scope.$watch

You can watch for changes with $scope.$watch:
```javascript
$scope.$watch('expr', function() {...}, useEquals)
```

* `expr` : any Angular expression.  It will be evaluated on each digest
  loop and, if it has changed, trigger the...
* `function() {...}` : callback function to execute when the watch
  changes
* `useEquals` : flag to indicate a reference or a deep-equality
  comparison

---

# $scope.$apply

In normal operation, Angular will automatically call `$apply` on any
DOM event.

However...if you manipulate the DOM without Angular knowing, you will
have to manually call `$scope.$apply()` for Angular to digest your
changes.

This is particularly common in tests.

---

# Conditionally hiding the footer

One of our requirements is to only show the footer when there are
entries in the todo list.

We'll implement this as before in a test-driven  fashion by:

1. Writing an e2e test to verify the footer is not visible when there
   are no entries, and is visible when there are entries
2. Adding a test and behavior to our controller to manage a flag for
   "entries are present"
3. Updating the HTML to make the e2e test pass

???

To be implemented by presenter live

* Write two parts of e2e test first
  * Look for class value of ng-hide
* Make pass with ng-hide="true" then ng-hide="taskList.length"
* Then go into using a tracking variable instead
  * TDD it all the way: hard-coded false to set in addTask
* Eventually, pull back to a $scope.$watch and demo scope.$apply() in test

---

layout: true
.step-name[x-task2-step1]

---

# Counting incomplete items

The count in the bottom left should update dynamically.

1. Write an e2e test to verify the number is correct
2. Add a scope variable to track the number of incomplete items
3. Add a watch to the task list to update the incomplete count every
   time a task is changed
4. Update the HTML to make the e2e test pass

Bonus: use `ng-pluralize` to print "item" for 1 item, "items" for
anything else (with tests, of course!)

???

* WRAP EVERYTHING IN <j2:whitespace trim="false">
* e2e: get item string, check it's 1 item left then 2 items left
* unit: on failing e2e, write tests for tracking counts
* impl: use a $watch, remember true flag at end, use
  taskList.filter().length to get at the count

---

layout: true
.step-name[x-task2-step2]

---

# Clearing completed items

Combine the previous steps:

1. Conditionally show the "Clear completed" button if there are
   completed tasks
2. Show the correct count of completed items
3. Delete the completed tasks when the button is clicked

You'll need to use the `ng-show` and `ng-click` directives, and
manipulate the existing watch.

???

* use
  `expect(todoListPage.getClearCompletedButton().isDisplayed()).toBeTruthy();`
* standard show/hide tests first, get that working through units
* then move on to delete case, again through e2e then units

---

layout: true
.step-name[x-task2-step3]

---

# Flagging all items as completed

Clicking the chevron by the task input should mark all tasks complete

Clicking the chevron a second time should mark all tasks incomplete

* Set a model on the check-all checkbox
* When its value changes, set all tasks to complete or incomplete based
  on the chevron's state

---

# Filtering the task list

The links at the bottom of the list should filter what is shown.

In Angular:

* We use *filters* to control what `ng-repeat` shows

```html
<li ng-repeat="task in taskList.tasks | someFilter">
	...
</li>
```
A filter is just a function that takes some input (in this case a list
of tasks) and produces an output (in this case a filtered list of
tasks)

---

# The generic "filter" filter

Angular supplies a parameterizable filter called `filter` to filter
arrays.

This takes a *predicate* argument of:

* A function that returns true when a match is found
* An object that acts as a "template" for matches

Arguments are given with the `filterName:argument` syntax.

```html
<li ng-repeat="task in taskList | filter:tpl">
	...
</li>
```

---

# Filtering by object template

To match tasks by status we could use:

```javascript
$scope.statusMask = { isComplete : true | false }
```

To match all tasks we could use:

```javascript
$scope.statusMask = {}
```

And in our `ng-repeat` use:

.shrink-text[
```html
<li ng-repeat="task in taskList | filter:statusMask">
	...
</li>
```
]

---

# Identifying path changes

Use `$location` to manage the address bar

* Our routes are:
    * **#/active** - only active tasks
	* **#/complete** - only complete tasks
	* **#/** - all tasks
* Use $location.path() to get the path component after the `#` up to
the query string params
* You can watch the path by assigning `$location` to a scope variable
  and watching `location.path()`

---

layout: true
.step-name[x-task2-step7]

---

# Task 2: Complete!

.middle[.center[![task2-complete](images/todolist-task2.png)]]

---

layout: true
.step-name[x-task3-start]

---

# Loading demo data

We want to populate the list with some demo data.

When the user clicks a button, it should append to the task list
some sample data pulled from the server.

* We'll use angular's `$http` service
* We'll learn about promises and how they're awesome

---

# $http: Interacting with the server

`$http` is a simple interface for making a call to the server.

* Basic syntax for a get is `$http.get(url)`
* Returns a *promise* with HTTP-specific methods
	* `success` for when the result is a 2XX response
	* `error` otherwise (redirects are transparently followed)
* Easy(ish) to unit test with `$httpBackend`
* See the docs for examples

---

# Promises: what and why

* Cleaner alternative to callbacks

```javascript
myPromise = myService.fetchDataAsync();
myPromise.then(
   function resolve(value) { /* success */ },
   function reject(reason) { /* failure */ },
   function notify(value)  { /* status change */ }
)
```
`then` returns a promise, so you can chain them:

```javascript
myPromise.then(resolveFn, rejectFn)
         .then(resolveFn2, rejectFn2);
```

---

# Comparison to callbacks

A common pattern is to take an action when a callback resolves.  You
end up with code like:

```javascript
myService.fetchDataAsync(function cb() {
	otherService.updateUI(function cb() {
		console.log("Updated UI with new data");
	});
});
```
As the callbacks nest, you move to the right...your logic gets heavily
indented and tightly coupled to all of the callbacks it resides within.

---

# Promises: a simple example

We create a promise using the `deferred` API:

```javascript
function getUsername() {
	var deferred = $q.defer();
	if (happy)
		deferred.resolve('chris.tucker');
	else
		deferred.reject("No username available");

	return deferred.promise;
}
```

---

#  Promises: a simple example (cont.)

And we can use (and chain) promises like so:

```javascript
function getAvailableAppCount() {
	getUsername().then(function(username) {
		return getAvailableApps();
	}).then(function(availableApps) {
		return availableApps.length;
	});
}

$scope.appCount = getAvailableAppCount();
```

* See docs for a lot more about promises (`$q`)

---

# Loading default data

Table `todo_sample` can be queried with REST API:

```javascript
// http://localhost:8080/api/now/table/todo_sample
// =>
{ result : [
    { "title" : "Buy Milk",
      "isComplete" : true|false },
    ...
]}
```

* Use Load Demo Data button to populate the demo data
* Use the $http service to fetch the data
* Demo data should add all entries fetched to the task list

---

layout: true
.step-name[x-task3-step1]

---

# Single responsibility, Coupling, and Cohesion

* Single responsiblity: how many different things is this module doing?
* Coupling: how many dependencies there are between modules?
* Cohesion: how closely related are functions within a piece of code?

---

# Todo controller responsiblities

--

1. Managing scope for communication with view
   * Setting up data for the view to render
   * Watching for changes to data in the view

--

2. Querying and manipulating the task list
   * Adding tasks
   * Deleting tasks
   * Toggling completion state

--

3. Pulling in demo data

---

# Angular's approach to decoupling

* Separate different units of responsiblity into different _providers_
* Configure wiring between providers using modules
* Access the functionality providers offer through injection

There are many different kinds of provider:

* `provider`, `factory`, `service`, `value`, `constant`
* `controller`, `directive`, `filter`
* ...

---

layout: true
.step-name[x-task2-step4]

---

# What is dependency injection?

It's all about who has responsibility for creating the objects you use
(your *dependencies*).  Consider:

.pull-left[
```javascript
function makeCoffee() {
	var pot = new Pot();
	pot.brew();
}
makeCoffee();
```
Traditional
]

.pull-right[
```javascript
function makeCoffee(pot) {
	pot.brew();
}
var pot = new Pot();
makeCoffee(pot);
```
Injected
]

---

# DI in Angular

* Angular injects dependencies by *name*
* Dependencies are configured in *modules*
* You've already seen an injected dependency...

```javascript
angular.module('todo')
  .controller('Todo',
              function($scope) {
});
```
`$scope` is an injected dependency: when Angular calls the controller
function, it passes in a new Scope instance called `$scope` for you.

---

# Injecting your own dependency

* Register a dependency against the module
* We'll be looking at *factory* dependencies

```javascript
angular.module('todo').
	factory('demoDataLoader', function() {...});
```

This registers a factory called "demoDataLoader" that you can inject:

```javascript
controller('Todo',
           function($scope, demoDataLoader) {
  // demoDataLoader is the return value of your
  // factory function
});
```

---

# Angular dependency lifecycle

Dependencies in Angular are *singletons*.

```javascript
function($injector) {
	var a = $injector.get('demoDataLoader');
	var b = $injector.get('demoDataLoader')
	a === b; // => true
}
```

* Be aware of this if your dependency carries any state!

???

* Note the use of factories in your dependencies to stamp off new instances

---

# A factory for the demo data loader

Create a file `factory.demoDataLoader.js` to house our loader

```javascript
angular.module('todo').
	factory('demoDataLoader', function() {...})
```

* Move the `$http` behavior over into the `demoDataLoader`
* `demoDataLoader` should expose a function that gets the data and
  returns a promise
* Move unit tests for data loading out of the controller test and into
  a new `demoDataLoader` test
* Extra credit: inject the URL as a _value_ binding set in your module setup.

---

layout: true
.step-name[x-task2-step5]


---

layout: true
.step-name[x-task2-step6]

---


# Task 3: Complete!

.middle[.center[![task3-complete](images/todolist-task3.png)]]

---

layout: true
.step-name[x-task4-start]

---

# Persisting task information

This is where we tie it all back in to ServiceNow.

* Use ServiceNow instance to track todos
* Write to the `todo` table
* Use Angular's `$resource` service with REST API
* Minimize disruption to the controller

---

# ngResource and $resource

`$resource` is made available in the `ngResource` module

```javascript
angular.module('todo', []);
```

must change to:

```javascript
angular.module('todo', ['ngResource']);
```

Declares that the `todo` module wants all providers registered against
the `ngResource` module to be made available.

* `ngResource` is declared in the `angular-resource.js` file

---

# $resource usage

* Use `$resource` to construct a client for your endpoint

```javascript
var client = $resource(urlPattern,
                       patternArgs,
					   methods)
```

* `urlPattern`: a URL with placeholders
* `patternArgs`: object describing how to substitute in placeholders
* `methods`: object describing methods desired and mapping to HTTP verbs

---

# $resource client usage

```javascript
client.get().$promise.then(function(data) {
	// data is list of todos from server
}
client.get({id:myId}).$promise.then(function(data) {
	// data is an individual todo
}
client.post({/*...*/}); // Add a new task
client.put({id: myId},
           {/*...*/});  // Edit task
```

---

# Saving todo entries

* Create `factory.todoRepository.js` to manage saved todos
* Use `$resource` to build API that can save added todo's to
  the server
* Modify the controller to save when a todo is added

```javascript
todoRepository.saveTodo(myTodo).then(
	function(savedTodo) {
		// Update myTodo with new sysId
	}
);
```

* Use _`todo.list`_ in your instance to see your data appearing!

---

# Retrieving todo entries

* Add a `getAllTodos` method to the `todoRepository`
* Return a promise that yields a list of task entries
* Call `getAllTodos` when the controller loads to set initial todo
  list
* Two options for handling latency
  * Don't make the input box active until `getAllTodos` resolves
  * Have `getAllTodos` _prepend_ todos on the task list

---

# Marking entries complete

* Add an `updateTodo` method to the `todoRepository`
* Call `updateTodo` with a changed todo whenever a change occurs
* For now only handling completion changes
  * Will deal with editing titles later
* Use the `newValue` and `oldValue` arguments to watch to determine
  what is changing

---

# Task 4: Complete!

.middle[.center[![task4-complete](images/todolist-task4.png)]]

---

layout: true
.step-name[x-task5-start]

---

# Editing entries

Edit tasks by:

* Double-clicking on a title (`ng-dblclick`)
* Making a change to the title
* Hitting enter to submit the change

The HTML/CSS already supports this:

* Set the "editing" class on the `<li>` being edited
* Set the value of the `edit` input appropriately
* Bind it up with an `ng-model`

???

Will lead to a working UI, but one that is lacking focus.

We'll need to add focus handling in the next step.

Note that we're going to start skippng protractor tests at this point

---

layout: true
.step-name[x-task5-step1]

---

# Handling focus

Editing works, but our focus is all messed up.

Setting focus is going to require our first foray into the world of
*custom directives*

* Focus is a function of the DOM
* Recall that in Angular, only Directives may manipulate the DOM

---

# Directives

```javascript
angular.module('todo').directive('name', function() {
	return {
		restrict: 'AECM',
		link: function(scope, element, attrs) { }
		// ... lots of other options ...
	};
}
```

* "restrict" limits directive type to Attribute, Class,
  Element, or coMment
  * Class and comment directives should _not_ be used
* The "link" function takes your scope and tweaks the DOM.

???

Note that the link function is the workhorse

---

# How a directive works

1. Angular sees the directive in HTML and looks for the directive
   handler
2. Angular *compiles* the directive, to get a *link* function
3. Angular calls the `link` function with the current scope, element,
   and attributes

Separation between compile and link is to support directives
like `ng-repeat` that need to stamp out a common template and then bind
in different values.

???

Essentially a perf enhancement

---

layout: true
.step-name[x-task5-step2]

---

# Testing directives

To test a directive, we simulate Angular's sequence:

```javascript
inject(function($rootScope, $compile) {
	var scope = $rootScope.$new();
	var element = angular.element('<div my-directive>');
	var linkFn = $compile(element);
	linkFn(scope);
	scope.$apply();

	// Perform assertions
})();
```

`$compile` is a standard Angular service that will compile your
directive (steps 1 and 2 from before).

???

This is added in task5-step2 for everyone

---

# sn-edit-task

We want to create a directive that handles the task editing.  We want
to change from:

```html
<li ng-dblclick="editTask(task)" ...>
```
to
```html
<li sn-edit-task="task" ...>
```

Right now, just moving the double-click handling.

???

Presenter led: walk through a TDD on this

---

# Focus!

Now we can attack the DOM to `focus()` the edit box.

* Update the test HTML to:

```html
<div sn-edit-task="task">
	<input class="edit">
</div>
```

* Use `spyOn` to spy on the focus method of the edit input
* `$digest` to show the input before calling `focus()`
* `ng-blur` to remove focus (when editing is done)
* Use `document.querySelector()` to get edit input

---

layout: true
.step-name[x-task5-step3]

---

# Adding an element

We can go further.  Let's break the task list itself into a directive.

We want to change our index.html from:
.shrink-text[
```html
<li ng-repeat="..." ng-class="..." sn-edit-task="...">
    ...
</li>
```
]
to:
```html
<todo-list />
```

---

layout: true
.step-name[x-task5-step4]

---

# Templates and element directives

* `restrict: 'E'` for element directive
* HTML template file with `template`

```javascript
{
	restrict: 'E',
	template: 'string_containing_template'
}
```

* In production code, use `templateUrl`

---

# The todo-list directive

* Create `directive.todoList.js`
* Extract `#todo-list` element and use as template
* All tests should continue to pass

---

layout: true
.step-name[x-task5-step5]

---

# Scopes and isolation

Although the `<todo-list>` directive works, it's still heavily coupled
to the `tasks` controller.

In particular, consider the repeat:
```html
<li ng-repeat="task in taskList | filter:statusMask"
```

and the function calls we make to the controller
```html
<button class="destroy" ng-click="deleteTask(task)">...
<form ng-submit="finishEditing()">...
<input class="edit" ... ng-blur="finishEditing()">...
```

---

# Isolating the scope

We want to prevent the todo-list from directly seeing anything about
the tasks controller.

Isolate using the `scope` argument to DDO:

```javascript
{
  restrict: 'E',
  template: '<li ng-repeat="task in tasks"> ... </li>',
  scope: { ??? }
}
```

The `scope` argument takes a few forms, which we'll talk about now...

---

class: large-code

# scope : { ... }

Basic syntax:

`varName` : `bindTypeChar` [`attributeName`] 
Where:

`bindTypeChar` is:

* `@` - Bind string value of attribute (1-way)
* `=` - Two way bind to variable specified in attributeName
* `&` - Bind to the expression in attributeName

---

# An example...

Create a local scope variable called "tasks" that holds a list of
tasks, specified by the list-of-tasks attribute.

```javascript
scope : { 'tasks' : '=listOfTasks' }
```

```html
>> index.html
<my-directive list-of-tasks="taskList" />
```

```html
>> template contents
<li ng-repeat="task in tasks"> ... </li>
```

---

# Isolation

* `scope : {...}` declaration *isolates* the scope
* Now the directive can't see any values from the parent scope
* Have to explicitly declare any linkages you want, and set them in
  the attributes
* Use Batarang to help visualize this
	* ng-repeat establishes an isolate scope, so you can already see
      this in action

---

# Isolating down: part 1

Isolate the scope for the `<todo-list>` directive.

You'll need to isolate down:

* The repeat variables (`taskList` and `statusMask`)
* The `deleteTask` expression

You'll need to isolate *up* the argument to `deleteTask`:
```html
<button ng-click="deleteTask({todoItem : task})">
```
(passing up uses similar syntax to scope isolation object)

Editing tasks *won't work* yet, so don't worry about that for now.

---

layout: true
.step-name[x-task5-step6]

---

# Isolating down: part 2

Editing doesn't work because we were accessing `scope.editTask()` from
our `sn-edit-task` directive

* `scope.editTask()` is defined on the `Todo` controller
* ... but we only care about which task is edited for the list
* ... and the list is now owned by the `todo-list` directive
* so let's move the editing management down on to a controller for the
  `todo-list` directive!

---

layout:true
.step-name[training-ams]

---

# All done...for now

* Plenty more to learn
* Come chat to me, email me (chris.tucker@servicenow.com), etc. if you
  have questions/comments/suggestions
* Final code can be pulled from github branch training-ams
* You can see this presentation by checking out the `doc` branch