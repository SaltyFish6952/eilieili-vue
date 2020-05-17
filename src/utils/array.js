export function arrayShuffle(list) {

    const newlist = [];
    for (let i = 0; i < 10; i++) {
        let num = Math.floor(Math.random() * (list.length - 1));
        newlist.push(list[num]);
        list.splice(num, 1)
    }
    return newlist
}