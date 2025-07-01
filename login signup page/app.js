// console.log("Sign up page")

function signupholder(event) {
    event.preventDefault();
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var mail = document.getElementById("mail");
    var password = document.getElementById("password");

    // console.log(firstname)
    // console.log(lastname)
    // console.log(email)
    // console.log(password)

    //create user obj
    var userObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: mail.value,
        password: password.value,
    }

    // console.log(userObj)

    // get user on localstorage
    var users = localStorage.getItem("users")
    // console.log(users)

    if (users == null) {
        var arr = [userObj]
        console.log("arr", arr)
        localStorage.setItem("users", JSON.stringify(arr));
        alert("user sucessfully sign up")
        window.location.href = "./sign_in.html"

    } else {
        var userArr = JSON.parse(users)

        for (var i = 0; i < userArr.length; i++) {
            console.log(userArr[i].email)
            if (userObj.email === userArr[i].email) {
                alert("Email alraedy registered")
                return
            }
        }


        //enter new user
        userArr.push(userObj)
        console.log("user updated", userArr)

        localStorage.setItem("users", JSON.stringify(userArr))
        alert("Succefully sign up")
        window.location.href = "./sign_in.html"
    }

}

function signinholder(event) {
    event.preventDefault();
    // console.log("Hellow world")
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    // console.log(email)
    // console.log(password)

    var getUser = JSON.parse(localStorage.getItem("users"))
    // console.log(getUser)
    if (!getUser) {
        alert("Invalid Email")
    }


    for (var userObj of getUser) {
        // console.log(userObj.email)
        // console.log(userObj.password)

        if (userObj.email === email.value && userObj.password === password.value) {
            localStorage.setItem("userlogin", JSON.stringify(userObj))
            alert("successfully login")
            window.location.href = "./home.html";
            return
            // break
        }
    }
    alert("Invalid Email and password")

}

