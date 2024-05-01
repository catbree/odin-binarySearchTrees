class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = null;
    }

    buildTree(array) {
        
        array.sort( (a,b) => { return a - b});
        array = array.filter( (value, index) => array.indexOf(value) === index);
        console.log(array);
        
        let tree = [];
        array.forEach( (element) => {
            if (!tree.includes(element)) {
                const node = new Node(element);
                tree.push(node);
            }
        });

        let endIndex = tree.length - 1;
        let middleIndex = Math.floor(endIndex / 2);
        console.log(middleIndex);
        return tree[middleIndex]
    }
}


const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
