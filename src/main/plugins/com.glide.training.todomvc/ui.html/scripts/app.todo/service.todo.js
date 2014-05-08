
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

angular.module('todo').factory('TaskRecorder', function($resource, taskFactory){
	var that = {};
	var resource = $resource('http://localhost:8080/api/now/table/todo/:sysId', {sysId: '@sysId'}, { 
		'get':		{method:'GET'},
		'post':		{method:'POST'},
		'put':		{method:'PUT'},
		'delete':	{method:'DELETE'},
		'patch':	{method: 'PATCH'} 
	});
	
	that.getAllTasks = function(){
		return resource.get().$promise.then(function(data){
			var tasks = [];
			data.result.forEach(function(demoTask) {
				tasks.push(taskFactory.newTask(demoTask.title, demoTask.iscomplete === 'true'));
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
		return resource.post(todo);
	};
	
	that.editTask = function(task){
		var todo = {
				sys_id: task.sysId,
				title: task.title,
				iscomplete: task.complete
		};
		
		return resource.put({sysId:task.sysId}, todo).$promise.then(function(data){
			return taskFactory.newTask(data.result.title, data.result.iscomplete === 'true'); 
		});
	};
	
	//that.deleteTask
	
	return that;
});