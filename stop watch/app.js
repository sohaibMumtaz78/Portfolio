// console.log("Stop watch")

var minhead = document.getElementById("minhead")
var sechead = document.getElementById("sechead")
var mshead = document.getElementById("mshead")
var hourhead = document.getElementById("hourhead")


// console.log("min" , min)
// console.log("sec" , sec)
// console.log("ms" , ms)

var min = 0;
var sec = 0;
var ms = 0;
var hour = 0;




function timer() {
    ms++
    // console.log("Start" , ms)
    mshead.innerHTML = ms

    if (ms === 100) {
        console.log("1 sec is completed")
        ms = sec
        sec++
        sechead.innerHTML = sec
    }

    if (sec > 59) {
        console.log("1 mint is completed")
        sec = min
        min++
        minhead.innerHTML = min
    }

    if (min > 59) {
        console.log("1 hour is completed ")
        min = hour
        hour++
        hourhead.innerHTML = hour

    }
}
var interval


function start() {
    // console.log("start")
    interval = setInterval(timer, 10)
    startbtn.disabled = true
}

function stop(){
    clearInterval(interval)
    startbtn.disabled = false
}

function reset(){
    clearInterval(interval)
    min = 0;
    sec = 0;
    ms = 0;
    hour = 0;
    minhead.innerHTML = 0
    sechead.innerHTML = 0
    mshead.innerHTML = 0
    hourhead.innerHTML = 0

    startbtn.disabled = false
}