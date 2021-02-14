//SELECTIONS
const timer = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');



//GLOBAL VARIABLES
var touched = true;
var timerOn = false;

var hrs = 0;
var min = 0;
var sec = 0;
var milisec = 0;


//LOOPS
setInterval(increasems, 10);
setInterval(increases, 1000);
setInterval(increasem, 60000);
setInterval(increaseh, 360000);
setInterval(showOutput, 10);


//FUNCTIONS
function zfill(value) {
		if(value < 10) {
				value = '0' + value;
		}
		return value;
}

function screenTouch() {
		if(touched) {
				startTimer();
				touched = false;
		}else {
				stopTimer();
				touched = true;
		}
}

function startTimer() {
		timerOn = true;
}

function stopTimer() {
		timerOn = false;
}

function resetTimer() {
		timerOn = false;
		hrs = 0;
		min = 0;
		sec = 0;
		milisec = 0;
		timer.innerHTML = '00:00:00:00';
}

function increaseh() {
		if(timerOn) {
				hrs++
		}
}
function increasem() {
		if(timerOn) {
				min++
				res();
		}
}
function increases() {
		if(timerOn) {
			  sec++
			  res();
		}
}
function increasems() {
		if(timerOn) {
				milisec++
				res();
		}
}

function res() {
		if(min >= 60) {
				min = 0;
		}
		if(sec >= 60) {
				sec = 0;
		}
		if(milisec > 99) {
				milisec = 0;
		}
}

function showOutput() {
		if(timerOn) {
				timer.innerHTML = zfill(hrs) + "<span>:</span>" + zfill(min) + "<span>:</span>" + zfill(sec) + "<span>:</span>" + zfill(milisec);
	 }
}
