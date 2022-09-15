const spliter = "-s-";
const cPrimary = "primary";
const cSecondary = "dark";
const cTertiary = "secondary";
const cRed = "danger";
const cTxtPrimary = "white";


var categories = ["Default"];
var taskList = [];

if(getStorageData(0) != null) {
	categories = getStorageData(0).split(spliter);
}
if(getStorageData(1) != null) {
	taskList = JSON.parse(getStorageData(1));
}
const spliter = "-s-";
const cPrimary = "primary";
const cSecondary = "dark";
const cTertiary = "secondary";
const cRed = "danger";
const cTxtPrimary = "white";


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
									<label class="badge badge-warning" for="importInput">Export Code</label>
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
	let categoryId = category.split(" ").join("-");
  let checkCat = categoryId.toLowerCase();
  let categoryBgColor = cPrimary;
  let categoryDelBtn = `<button type="button" class="close text-${cTxtPrimary}" onclick="removeCategory(${categoryIndex})">&times;</button>`;
  let categoryBadge = ``;
  
  if(categoryId == "Default") {
    categoryDelBtn = ``;
    categoryBgColor = cRed;
  } else if(checkCat.includes("movie")) {
    categoryBgColor = "info";
    categoryBadge = `<span class="badge badge-pill badge-success">movies</span>`;
  } else if(checkCat.includes("manga")) {
    categoryBgColor = "success";
    categoryBadge = `<span class="badge badge-pill badge-light">manga</span>`;
  } 

  if(checkCat.includes("anime")) {
    categoryBgColor = "info";
    categoryBadge = `<span class="badge badge-pill badge-warning">anime</span>`;
  }
  if(checkCat.includes("hentai") || checkCat.includes("porn")) {
    categoryBgColor = "warning";
    categoryBadge = `<span class="badge badge-pill badge-danger">18+</span>`;
  }

  
	return `<div class="card border-dark mt-1">
    				<div class="card-header bg-${categoryBgColor}">
         ${categoryDelBtn}
      				<a class="card-link text-${cTxtPrimary}" data-toggle="collapse" href="#${categoryId}">
        				${categoryBadge} ${category}
      				</a>
    				</div>
    				<div id="${categoryId}" class="collapse show bg-${cSecondary}" data-parent="#accordion">
      				<div class="card-body">
        				<ul class="list-group" id="${categoryId}-tasks">
						
								</ul>
      				</div>
    				</div>
  				</div>`;
}

function getTaskList(taskArray, taskIndex) {
alert(taskArray);

  let taskColor = cTxtPrimary;
  let task = taskArray[0];
  let doneBtnIcon = "fas fa-check"
  let status = taskArray[2];
  //let border = 'dark';
  let background = 'bg-secondary'; //`bg-${cTertiary}`;
	
	/*if(status == "done") {
    task = `<del>${task}</del>`;
    border = 'success';
    background = '';
  }*/
	let template `<li class="list-group-item ${status} ${background}">
		<span class="text-${taskColor}">
			${task}
		</span>
		<div class="btn-group">
			<button class="btn btn-success" onclick="checkTask(${taskIndex})">
				<i class="${doneBtnIcon}"></i>
			</button>
			<button class="btn btn-danger" onclick="removeTask(${taskIndex})">
				<i class="fas fa-trash"></i>
			</button>
		</div>
	</li>`;
alert(template);
  return template;
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
									<label class="badge badge-warning" for="importInput">Export Code</label>
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
	let categoryId = category.split(" ").join("-");
  let checkCat = categoryId.toLowerCase();
  let categoryBgColor = cPrimary;
  let categoryDelBtn = `<button type="button" class="close text-${cTxtPrimary}" onclick="removeCategory(${categoryIndex})">&times;</button>`;
  let categoryBadge = ``;
  
  if(categoryId == "Default") {
    categoryDelBtn = ``;
    categoryBgColor = cRed;
  } else if(checkCat.includes("movie")) {
    categoryBgColor = "info";
    categoryBadge = `<span class="badge badge-pill badge-success">movies</span>`;
  } else if(checkCat.includes("manga")) {
    categoryBgColor = "success";
    categoryBadge = `<span class="badge badge-pill badge-light">manga</span>`;
  } 

  if(checkCat.includes("anime")) {
    categoryBgColor = "info";
    categoryBadge = `<span class="badge badge-pill badge-warning">anime</span>`;
  }
  if(checkCat.includes("hentai") || checkCat.includes("porn")) {
    categoryBgColor = "warning";
    categoryBadge = `<span class="badge badge-pill badge-danger">18+</span>`;
  }

  
	return `<div class="card border-dark mt-1">
    				<div class="card-header bg-${categoryBgColor}">
         ${categoryDelBtn}
      				<a class="card-link text-${cTxtPrimary}" data-toggle="collapse" href="#${categoryId}">
        				${categoryBadge} ${category}
      				</a>
    				</div>
    				<div id="${categoryId}" class="collapse show bg-${cSecondary}" data-parent="#accordion">
      				<div class="card-body">
        				<ul class="list-group" id="${categoryId}-tasks">
						
								</ul>
      				</div>
    				</div>
  				</div>`;
}

function getTaskList(taskArray, taskIndex) {
alert(taskArray);

  let taskColor = cTxtPrimary;
  let task = taskArray[0];
  let doneBtnIcon = "fas fa-check"
  let status = taskArray[2];
  //let border = 'dark';
  let background = 'bg-secondary'; //`bg-${cTertiary}`;
	
	/*if(status == "done") {
    task = `<del>${task}</del>`;
    border = 'success';
    background = '';
  }*/
	let template `<li class="list-group-item ${status} ${background}">
		<span class="text-${taskColor}">
			${task}
		</span>
		<div class="btn-group">
			<button class="btn btn-success" onclick="checkTask(${taskIndex})">
				<i class="${doneBtnIcon}"></i>
			</button>
			<button class="btn btn-danger" onclick="removeTask(${taskIndex})">
				<i class="fas fa-trash"></i>
			</button>
		</div>
	</li>`;
alert(template);
  return template;
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
