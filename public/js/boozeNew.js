console.log("boozeNew reporting");

openSite = (givenSite,e) => {
    e.preventDefault(); // default submit routine bypass
    
    let gotoWebsite, url;
    gotoWebsite = document.getElementById(givenSite).value;
    if(gotoWebsite.length>0) {
        url = gotoWebsite
        window.open(url, "_blank");
    } else {
        alert("Vul eerst een website in!")
    }
}

enterImage = (e) => {
    e.preventDefault(); // default submit routine bypass

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

selectCountry = (countries) => {
    let selectedContinent   = document.getElementById("continent").value,
        selectCountry       = document.getElementById("country"),
        selectOrigin        = document.getElementById("origin"),
        labelOrigin         = document.getElementById("labelOrigin"),
        selectSource        = '<option selected=""></option>';
    let countryList
        try {
            countryList = JSON.parse(countries);
        }
        catch(error) {
            console.log("Error parsing:\n" + error.message + "\n" + countries);
        }

    let countertje = 0;
    countryList.forEach(country => {
        if(selectedContinent=="all") {
            let item = country.split("-");
            let waarde = item[1].replace(/^\s+|\s+$/gm,'');
            countertje += 1
            selectSource += '<option value="' + waarde + '">' + waarde + '</option>';
        } else if(country.startsWith(selectedContinent)) {
            let item = country.split("-");
            let waarde = item[1].replace(/^\s+|\s+$/gm,'');
            countertje += 1
            selectSource += '<option value="' + waarde + '">' + waarde + '</option>';
        }
    });
    labelOrigin.innerText = "Land van herkomst [" + countertje + "]"
    selectOrigin.innerHTML = selectSource;
}

