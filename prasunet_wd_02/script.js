let startTime; // stores the time when the stopwatch starts
let updatedTime; // store the current time during the stopwatch's operation
let difference; // store the difference between the current time and the start time to calculate elapsed time
let timeinterval; //store the interval ID created by setInterval, allowing us to stop the interval later

let running = false; //This boolean flag indicates whether the stopwatch is currently running.

let lapcounter = 0; // This variable keeps track of the number of laps recorded.

let savedtime = 0; //This variable stores the elapsed time when the stopwatch is stopped, so it can resume correctly.

function startstop() {
    // this function handles starting and stopping the stopwatch
    const lapbutton = document.getElementById('lap'); // retrieves the lap/reset button element.
    const startbutton = document.getElementById('start'); // retrieves the start/stop button element.


  if (!running) 
    {
    // setting start time
    /* date() gets the current time 
    savedtime is subtracted from the current time to account for any previously elapsed time before the stopwatch was paused. this ensures that the stopwatch resumes from where it was paused rather than starting from zero.
    resets the start time to be the current time minus any time that had already elapsed before pausing.
    */
    startTime = new Date().getTime() - savedtime;
    timeinterval = setInterval(getshowtime , 10);
    running = true;
    startbutton.innerHTML = 'Stop';
    startbutton.style.backgroundColor = '#dc3545';
    lapbutton.innerHTML = 'Lap';
    lapbutton.disabled = false;
    lapbutton.onclick = lap;
    }
  else{
    clearInterval(timeinterval);
    savedtime = difference;
    /* savedtime = difference.......
    Elapsed Time Calculation:
To create a functional stopwatch, you need to calculate the elapsed time. This is done by recording the start time when the user begins the stopwatch and comparing it to the current time whenever the display needs to be updated. The difference between these times gives the elapsed time.
   */
    running= false;
    startbutton.innerHTML = 'Start';
    startbutton.style.backgroundColor = '#28a745';
    lapbutton.innerHTML = 'Reset'
    lapbutton.onclick = reset;

    }
}

function getshowtime(){
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10 );

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    document.getElementById('display').innerHTML = minutes + ":" + seconds + "." + milliseconds;
    

}

function lap() {
    /*
    Record Lap:

Logic:
Capture the current displayed time (lapTime = document.getElementById('display').innerHTML).
Append the lap time to the lap list in the DOM.
   */
    if (running) {
        lapcounter++;
        const laptime = document.getElementById('display').innerHTML;
        const lapentry = document.createElement('div');
        lapentry.className = 'lap_entry';
        lapentry.innerHTML = `<span>Lap ${lapcounter}</span><span>${laptime}</span>`
        document.getElementById('collectedlaps').append(lapentry);
    }
}

function reset(){
    clearInterval(timeinterval)
    savedtime  =0
    difference = 0
    running = false
    lapcounter = 0
    document.getElementById('display').innerHTML = "00:00.00"
    document.getElementById('collectedlaps').innerHTML = "";
    document.getElementById("start").innerHTML = "Start"
    document.getElementById("start").style.backgroundColor = "#28a745"
    document.getElementById('lap').innerHTML = "Lap"
    document.getElementById('lap').disabled = true
    document.getElementById('lap').onclick = lap;
}