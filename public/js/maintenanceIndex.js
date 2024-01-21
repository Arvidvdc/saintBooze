console.log("maintenanceIndex reporting");

deleteItem = (id,itemName) => {
    if(confirm("Weet je zeker dat je item: " + itemName.toUpperCase() + " wilt verwijderen?")) {
        fetch("/maintenance/delete" + id, {
            method: 'DELETE',
            redirect:"follow",
        })
        .then(res => {
            window.location.href = res.url;
        }) 
        .then(res => console.log(res))
        .catch((error) => {console.log(error)});
    }
}

changeCheckbox = (chbName,id) => {
    let changedItem = document.getElementById(chbName);

    // window.location.href="/maintenance/update/" + id +"?_method=PUT&u=active&v=" + changedItem.checked

    fetch("/maintenance/update/" + id +"?u=active", {
            method: 'PUT',
            redirect:"follow",
            body: JSON.stringify({
                isActive    : changedItem.checked
                }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(res => {
                window.location.href = res.url;
            }) 
            .then(res => console.log(res))
            .catch((error) => {console.log(error);
            });

    console.log("Naam: " + chbName + "\n" + "huidige status: " + changedItem.checked);
}