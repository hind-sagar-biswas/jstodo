const taskList = document.getElementById('tasks');


var tasks = [];
if(getLS() != null) {
		tasks = getLS().split('_:_');
		listTask();
}

function addTask() {
		
		var input = document.forms['taskAdder']['work'];
		
		tasks.push(input.value);
		setLS();
		listTask();
		input.value = "";
		return false;
}

function removeTask(v) {
		tasks.splice(v, 1);
		setLS();
		listTask();
}

function checkTask(v) {
		var taskToCheck = tasks[v] + ':::done';
		tasks.splice(v, 1, taskToCheck);
		setLS();
		listTask();
}

function uncheckTask(v) {
		var taskToUncheck = tasks[v].split(':::');
		tasks.splice(v, 1, taskToUncheck[0]);
		setLS();
		listTask();
}

function listTask() {
		var taskString = "";
		var i = 0;
		for(x of tasks){
				var d = x.split(':::');
				if(d[d.length -1] == 'done') {
						taskString += '<li class="list-group-item del border-success"><span><del>' + d[0] + '</del></span><div class="btn-group"><button class="btn btn-success" onclick="uncheckTask(' + i + ')"><i class="fas fa-check"></i></button><button class="btn btn-danger" onclick="removeTask(' + i + ')"><i class="fas fa-trash"></i></button></div></li>';
				}else {
						taskString += '<li class="list-group-item"><span>' + x + '</span><div class="btn-group"><button class="btn btn-success" onclick="checkTask(' + i + ')"><i class="fas fa-check"></i></button><button class="btn btn-danger" onclick="removeTask(' + i + ')"><i class="fas fa-trash"></i></button></div></li>';
				}
				i++
		}
		taskList.innerHTML = taskString;
}

function setLS() {
		var ar = tasks.join('_:_');
		localStorage.setItem('taskLS', ar);
}

function getLS() {
		return localStorage.getItem('taskLS');
}