export function removeItemFromArray(array, itemId) {
    var index = array.findIndex(item => item.id === itemId);
    if (index !== -1) {
        array.splice(index, 1);
    }
}
export function getIdByName(array, name) {
    /* console.log(array[0].name)
    console.log(name) */

    for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
            return array[i].id;
        }
    }
    return "Room With that Name not Found"; // room not found
}
