console.log("boozeNew reporting");

openSite = (givenSite) => {

    let gotoWebsite, url;
    gotoWebsite = document.getElementById(givenSite).value;
    if(gotoWebsite.length>0) {
        url = gotoWebsite
        window.open(url, "_blank");
    } else {
        alert("Vul eerst een website in!")
    }
}

enterImage = () => {
    let url,  isNum, target;
    target = document.getElementById("image");

    if(target.value.length>0) {
        window.open(target.value, "_blank");
    } else {
        url = prompt("Plak de url naar de afbeelding");
        isNum = !isNaN(Number(url));
        if(!isNum) {
            target.value=url;
        } else {
            alert("Geen URL opgegevn!");
        }
    }
}