exports.category = (collection, category) => {
    let categoryItems = [];
    collection.forEach(record => {
        if (record.category===category) {
            categoryItems.push(record);
        }
    });
    return categoryItems;
}
