angular.module('todo').controller('Todo', function($scope, $location, $http, TaskRecorder) {
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
		/*$http.get('/api/now/table/todo_sample').
			success(function(data) {
				var result = data.result;
				result.forEach(function(demoTask) {
					var task = newTask(demoTask.title, demoTask.iscomplete === 'true');
					$scope.taskList.push(task);
				});
			});*/
		
		TaskRecorder.getAllTasks().then(function(result) {
			console.log("Result: ", result);
		});
		
		//console.log(Todo.getAllTasks());
		TaskRecorder.getTask("2794f421d7202100b0b044580e610398").then(function(result){
			console.log("Result: ", result);
		});
		
		TaskRecorder.editTask({complete: true, title: "Make a Todo List", sysId: "2794f421d7202100b0b044580e610398"}).then(function(result){
			console.log("Result: ", result);
		});
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