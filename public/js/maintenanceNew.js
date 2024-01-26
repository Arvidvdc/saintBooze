console.log("maintenanceNEW reporting");

showHiddenOptions = () => {
    let trigger     = document.getElementById("category").value,
        english     = document.getElementById("englishInput"),
        catMain     = document.getElementById("categoryMainInput");

    english.removeAttribute("style");
    catMain.removeAttribute("style");

    switch (trigger) {
        case "continent":
            english.style.display = "block"
            catMain.style.display = "none"
            break;

        case "subcategory":
            catMain.style.display = "block"
            english.style.display = "none"
            break;
    
        default:
            english.style.display = "none"
            catMain.style.display = "none"
            break;
    }
}