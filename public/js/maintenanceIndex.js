console.log("maintenanceIndex reporting");

deleteItem = (id,itemName) => {
    if(confirm("Weet je zeker dat je item: " + itemName.toUpperCase() + " wilt verwijderen?")) {
        fetch("/maintenance/" + id, {
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