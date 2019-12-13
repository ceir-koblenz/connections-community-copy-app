export async function asyncForEach(array, callback) {
    if (array === undefined) { return null }
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}