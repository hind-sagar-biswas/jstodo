const spliter = "-s-";


var categories = ["Default"];
var taskList = [];

if(getStorageData(0) != null) {
	categories = getStorageData(0).split(spliter);
}
if(getStorageData(1) != null) {
	taskList = JSON.parse(getStorageData(1));
}


const container = document.getElementById("accordion");
const alertBox = document.getElementById("alertBox");
const categorySelectElement = document.getElementById("taskCategory");
const exportContainer = document.getElementById("exportCodeContainer");

const taskAdder = document.forms["taskAdder"];
const categoryAdder = document.forms["categoryAdder"];
const toDoImporter = document.forms["importForm"];

const taskInput = taskAdder["task"];
const taskCategory = taskAdder["taskCategory"];
const categoryInput = categoryAdder["categoryInput"];
const importInput = categoryAdder["importInput"];


function importToDo() {
	var importArray = JSON.parse(document.getElementById("importInput").value);
	
	importArray.forEach(data => {
		if(!categories.includes(data[1])) {
			categoryInput.value = data[1];
			addNewCategory();
		};
		taskList.push(data);
	});
	
	updateTasks();
	alertSystem("success", "Task Imported!");
	
	return false;
}

function exportToDo() {
	exportContainer.innerHTML = `<div class="form-group">
					<label for="importInput">Import Code:</label>
					<textarea class="form-control" id="exportCode"></textarea>
				    </div>`;
	document.getElementById("exportCode").value = JSON.stringify(taskList);
}

function addNewCategory() {
	if(categories.includes(categoryInput.value)) {
		alertSystem("danger", `<strong>${categoryInput.value}</strong> already exists!`);
		categoryInput.value = "";
		return false;
	}
		categories.push(categoryInput.value);
	updateCategories();
	alertSystem("success", `<strong>${categoryInput.value}</strong> category added!`);
	categoryInput.value = "";
	return false;
}

function addNewTask() {
	var taskArr = [
		taskInput.value,
		taskCategory.value,
		"undone"
	];
	taskInput.value = "";
	taskList.push(taskArr);
	updateTasks();
	alertSystem("success", "Task Added!");
	return false;
}

function updateCategories() {
	var categoryIterationIndex = 0;
	
	container.innerHTML = "";
	categorySelectElement.innerHTML = "";
	categories.forEach(category => {
		container.innerHTML += getAccordion(category, categoryIterationIndex);
		categorySelectElement.innerHTML += `<option value="${category.split(" ").join("-")}">
			${category}
		</option>`;
		categoryIterationIndex++;
	});
	updateTasks();
}

function updateTasks() {
	categories.forEach(category => {
		var categoryListId = category.split(" ").join("-") + "-tasks";
		document.getElementById(categoryListId).innerHTML = "";
	});
	setStorageData();
	if(!taskList[0]) return;
	
	var taskIterationIndex = 0;
	
	taskList.forEach(task => {
		var categoryTaskListId = task[1].split(" ").join("-") + "-tasks";
		document.getElementById(categoryTaskListId).innerHTML += getTaskList(task, taskIterationIndex);
		taskIterationIndex++;
	});
}

function getAccordion(category, categoryIndex) {
	var categoryId = category.split(" ").join("-");
	if(categoryId == "Default") {
		return `<div class="card">
    				<div class="card-header">
      				<a class="card-link" data-toggle="collapse" href="#${categoryId}">
        				${category}
      				</a>
    				</div>
    				<div id="${categoryId}" class="collapse show" data-parent="#accordion">
      				<div class="card-body">
        				<ul class="list-group" id="${categoryId}-tasks">
						
								</ul>
      				</div>
    				</div>
  				</div>`;
	}
	return `<div class="card">
    				<div class="card-header">
    					<button type="button" class="close" onclick="removeCategory(${categoryIndex})">&times;</button>
      				<a class="card-link" data-toggle="collapse" href="#${categoryId}">
        				${category}
      				</a>
    				</div>
    				<div id="${categoryId}" class="collapse show" data-parent="#accordion">
      				<div class="card-body">
        				<ul class="list-group" id="${categoryId}-tasks">
						
								</ul>
      				</div>
    				</div>
  				</div>`;
}

function getTaskList(taskArray, taskIndex) {
	var doneTemplate = `<li class="list-group-item done border-success">
		<span>
			<del>${taskArray[0]}</del>
		</span>
		<div class="btn-group">
			<button class="btn btn-success" onclick="uncheckTask(${taskIndex})">
				<i class="fas fa-check"></i>
			</button>
			<button class="btn btn-danger" onclick="removeTask(${taskIndex})">
				<i class="fas fa-trash"></i>
			</button>
		</div>
	</li>`;
	var undoneTemplate = `<li class="list-group-item">
		<span>
			${taskArray[0]}
		</span>
		<div class="btn-group">
			<button class="btn btn-success" onclick="checkTask(${taskIndex})">
				<i class="fas fa-check"></i>
			</button>
			<button class="btn btn-danger" onclick="removeTask(${taskIndex})">
				<i class="fas fa-trash"></i>
			</button>
		</div>
	</li>`;
	
	if(taskArray[2] == "done") return doneTemplate;
	return undoneTemplate;
}

function removeCategory(categoryIndex) {
	if(!confirm("Are you sure that you want to remove \"" + categories[categoryIndex] + "\" category along with all of it's tasks?")) return;
	for(var i = 0; i < taskList.length; i++){
		if(taskList[i][1] == categories[categoryIndex]) {
			removeTask(i);
		} 
	}
	alertSystem("warning", `<strong>${categories[categoryIndex]}</strong> removed!`);
		categories.splice(categoryIndex, 1);
	updateCategories();
}

function removeTask(taskIndex) {
	alertSystem("warning", `<strong>Task no.${taskIndex + 1}</strong> of <strong>${taskList[taskIndex][1]}</strong>
	removed!`);
	taskList.splice(taskIndex, 1);
	updateTasks();
}

function checkTask(taskIndex) {
	alertSystem("success", `<strong>Task no.${taskIndex + 1}</strong> of <strong>${taskList[taskIndex][1]}</strong>
	checked!`);
	taskList[taskIndex][2] = "done";
	updateTasks();
}

function uncheckTask(taskIndex) {
	alertSystem("warning", `<strong>Task no.${taskIndex + 1}</strong> of <strong>${taskList[taskIndex][1]}</strong>
	unchecked!`);
	taskList[taskIndex][2] = "undone";
	updateTasks();
}

function setStorageData() {
	var encodedCategoryData = categories.join(spliter);
	var encodedTaskData = JSON.stringify(taskList);
	
	localStorage.setItem('jsToDoCategoryData', encodedCategoryData);
	localStorage.setItem('jsToDoTaskData', encodedTaskData);
}
function getStorageData(data) {
	if(data == 0) return localStorage.getItem('jsToDoCategoryData');
	if(data == 1) return localStorage.getItem('jsToDoTaskData');
}

function alertSystem(type, message) {
	alertBox.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  ${message}
</div>`;
}


window.addEventListener("load", () => {
	updateCategories();
	updateTasks();
})
