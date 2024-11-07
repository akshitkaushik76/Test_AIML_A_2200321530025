function validate(event) {
    
    event.preventDefault();

    
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    
    if (userId !== "admin" && password !== "admin") {
        alert("Invalid username or password. Please try again.");
        
       
    } 
}
