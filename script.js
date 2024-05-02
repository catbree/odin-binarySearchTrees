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

    sortArray(array) {
        array.sort( (a,b) => { return a - b});
        array = array.filter( (value, index) => array.indexOf(value) === index);
        return array;
    }

    buildTree(arr, start, end) {

        if (start > end) {
            return null;
        } else {
            let mid = Math.floor((start + end) / 2);
            const node = new Node(arr[mid]);
            node.left = this.buildTree(arr, start, mid - 1);
            node.right = this.buildTree(arr, mid + 1, end)
            return node;
        }
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


const tree = new Tree();
const givenArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let sortedArray = tree.sortArray(givenArray);
tree.root = tree.buildTree(sortedArray, 0, sortedArray.length - 1);

prettyPrint(tree.root);
