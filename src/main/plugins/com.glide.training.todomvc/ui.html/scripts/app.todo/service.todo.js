
angular.module('todo').factory('taskFactory', function() {
	"use strict";
	return {
		newTask : function(title, isComplete) {
			return {
				title : title,
				complete : !!isComplete
			}
		}
	}
})

angular.module('todo').factory('taskRepository', function($resource, taskFactory){
	var that = {};
	var resource = $resource('http://localhost:8080/api/now/table/todo/:sysId', {sysId: '@sysId'}, { 
		'get':		{method:'GET', params: {sysparm_query : "ORDERBYsys_created_on"}},
		'post':		{method:'POST'},
		'put':		{method:'PUT'},
		'delete':	{method:'DELETE'} 
	});
	
	var mapTaskToTodo = function(task, todo){
		todo = todo || {};
		todo.iscomplete = task.complete;
		todo.sys_id = task.sysId;
		todo.title = task.title;
		return todo;
	}
	
	that.getAllTasks = function(){
		return resource.get().$promise.then(function(data){
			var tasks = [];
			data.result.forEach(function(todo) {
				var newTask = taskFactory.newTask(todo.title, todo.iscomplete === 'true');
				newTask.sysId = todo.sys_id;
				tasks.push(newTask);
			});
			return tasks;
		});
	};
	
	that.getTask = function(sysId){
		return resource.get({sysId:sysId}).$promise.then(function(data){
			return taskFactory.newTask(data.result.title, data.result.iscomplete === 'true'); 
		});
	};
	
	that.addTask = function(task){
		var todo = mapTaskToTodo(task);
		
		return resource.post({}, todo).$promise.then(function(data){
			var task = taskFactory.newTask(data.result.title, data.result.iscomplete === 'true');
			task.sysId = data.result.sys_id;
			return task; 
		});
	};
	
	that.editTask = function(task){
		var todo = mapTaskToTodo(task);
		
		return resource.put({sysId:task.sysId}, todo).$promise.then(function(data){
			return taskFactory.newTask(data.result.title, data.result.iscomplete === 'true'); 
		});
	};
	
	that.deleteTask = function(task){
		
		return resource.delete({sysId:task.sysId}).$promise;
	};
	
	return that;
});