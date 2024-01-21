console.log("maintenanceNEW reporting");

showHideEnglish = () => {
let trigger         = document.getElementById("category").value,
    englishDisplay  = document.getElementById("english"),
    englishLabel    = document.getElementById("englishTrigger");
    
    englishDisplay.removeAttribute("style");
    englishDisplay.removeAttribute("style");
    if(trigger=="continent") {
        englishDisplay.style.display = "block";
        englishLabel.style.display = "block";
    } else {
        englishDisplay.style.display = "none";
        englishLabel.style.display = "none";
    }
}
