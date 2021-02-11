const taskList = document.getElementById('tasks');


var tasks = [];

function addTask() {
		
		var input = document.forms['taskAdder']['work'];
		tasks.push(input.value);
		listTask();
		input.value = "";
		return false;
}

function removeTask(v) {
		tasks.splice(v, 1);
		listTask();
}

function checkTask(v) {
		var taskToCheck = tasks[v] + ':::done';
		tasks.splice(v, 1, taskToCheck);
		listTask();
}

function uncheckTask(v) {
		var taskToUncheck = tasks[v].split(':::');
		tasks.splice(v, 1, taskToUncheck[0]);
		listTask();
}

function listTask() {
		var taskString = "";
		var i = 0;
		for(x of tasks){
				var d = x.split(':::');
				if(d[d.length -1] == 'done') {
						taskString += '<li class="list-group-item del border-success"><span><del>' + d[0] + '</del></span><button class="btn btn-warning" onclick="uncheckTask(' + i + ')"><i class="fas fa-check"></i></button><button class="btn btn-danger" onclick="removeTask(' + i + ')"><i class="fas fa-trash"></i></button></li>';
				}else {
						taskString += '<li class="list-group-item"><span>' + x + '</span><button class="btn btn-warning" onclick="checkTask(' + i + ')"><i class="fas fa-check"></i></button><button class="btn btn-danger" onclick="removeTask(' + i + ')"><i class="fas fa-trash"></i></button></li>';
				}
				i++
		}
		taskList.innerHTML = taskString;
}
