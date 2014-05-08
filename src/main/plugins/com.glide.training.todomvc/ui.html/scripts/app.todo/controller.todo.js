angular.module('todo').controller('Todo', function($scope, $location, $http, taskRepository) {
	"use strict";

	$scope.newTask = '';
	$scope.taskList = [];
	$scope.hasTasks = false;
	$scope.remainingTodos = 0;
	$scope.completedTodos = 0;
	$scope.allComplete = false;
	$scope.statusMask = {};

	$scope.addTask = function() {
		var title = $scope.newTask.trim();
		if (title)
			$scope.taskList.push(newTask(title));
		$scope.newTask = '';
	};

	$scope.deleteTask = function(task) {
		var idx = $scope.taskList.indexOf(task);
		if (idx >= 0)
			$scope.taskList.splice(idx, 1);
	};

	$scope.deleteCompleted = function() {
		for (var i = $scope.taskList.length - 1; i >= 0; i--) {
			if ($scope.taskList[i].isComplete)
				$scope.taskList.splice(i, 1);
		}
	};

	$scope.loadDemoData = function() {
		
		taskRepository.getAllTasks().then(function(tasks) {
			tasks.forEach(function(task) {
				$scope.taskList.push(task);
			});
			console.log("Result: ", tasks);
		});
		
		taskRepository.getTask("2794f421d7202100b0b044580e610398").then(function(task){
			//console.log("Task: ", result);
		});
		
		taskRepository.editTask({complete: true, title: "Make a Todo List", sysId: "2794f421d7202100b0b044580e610398"}).then(function(task){
			//console.log("Result: ", result);
		});
		
		taskRepository.addTask({complete: false, title: "Make a Todo List"}).then(function(task){
			//console.log("Result", data);
		});
		
		taskRepository.deleteTask({sysId:"4f2315b9d7202100b0b044580e610389"});
	};

	$scope.$watch('allComplete', function(newStatus) {
		$scope.taskList.forEach(function(task) {
			task.isComplete = newStatus;
		});
	});

	$scope.$watch('taskList', function(newList) {
		$scope.remainingTodos = newList.filter(function(task) {
			return !task.isComplete;
		}).length;
		$scope.completedTodos = newList.length - $scope.remainingTodos;
		$scope.hasTasks = !!$scope.taskList.length;
	}, true);

	$scope.$watch(
		function() { return $location.path() },
		function(newPath) {
			$scope.path = newPath || '/';
			if (/active/.test(newPath))
				$scope.statusMask = { isComplete : false };
			else if (/completed/.test(newPath))
				$scope.statusMask = { isComplete : true };
			else
				$scope.statusMask = {};
	});

	function newTask(title, isComplete) {
		return {
			title : title,
			isComplete : !!isComplete
		}
	}

});