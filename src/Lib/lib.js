export function removeItemFromArray(array, itemId) {
    var index = array.findIndex(item => item.id === itemId);
    if (index !== -1) {
        array.splice(index, 1);
    }
}
export function getIdByName(array, name) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
        return array[i].id;
        }
    }
    return null; // room not found
}
