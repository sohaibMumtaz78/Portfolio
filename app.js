var tablinks = document.getElementsByClassName("tab-links")
var tabcontents = document.getElementsByClassName("tab-contents")

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabname).classList.add("active-tab")
}
// console.log("Hello World")

var sideMenu = document.getElementById("sidemenu");

function openmenu() {
    sideMenu.style.right = "0";
}

function closemenu() {
    sideMenu.style.right = "-200px";
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbwwlU6ofjKncdWnm_NQik4gLdRqEyljiKB0_UNScX5QXIESeMe3DORYk6WHoA1K4hBfig/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(function(){
                msg.innerHTML = " "
            },1000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})