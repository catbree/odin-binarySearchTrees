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

    insert(value) {
        let currentNode = this.root;
        let parent = null;

        while (currentNode !== null) {
            parent = currentNode;
            if(currentNode.value > value) {
                currentNode = currentNode.left;
            }
            else if (currentNode.value < value) {
                currentNode = currentNode.right;
            } else {
                return; //If duplicate value, do nothing
            }
        }

        if (value < parent.value) {
            parent.left = new Node(value);
        } else {
            parent.right = new Node(value);
        }
    }

    delete(value) {
        
        let currentNode = this.root;
        let parent = null;
        
        //finds node that needs to be deleted
        while (currentNode.value !== value) {
            if (value < currentNode.value) {
                parent = currentNode;
                currentNode = currentNode.left;
            } else {
                parent = currentNode;
                currentNode = currentNode.right;
            }
        }

        //if node has no child
        if (currentNode.left === null && currentNode.right === null) {
            if (value < parent.value) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }
        
        //if node has only one child
        if (currentNode.left === null && currentNode.right !== null) {
            if (value < parent.value) {
                parent.left = currentNode.right;
            } else {
                parent.right = currentNode.right;
            }
        }
        
        if (currentNode.left !== null && currentNode.right === null) {
            if (value < parent.value) {
                parent.left = currentNode.left;
            } else {
                parent.right = currentNode.left;
            }
        }

        //if node has two child
        if (currentNode.left !== null && currentNode.right !== null) {
            //find node right child's extreme left node
            let minRight = currentNode.right;
            while (minRight.left !== null) {
                minRight = minRight.left;
            }
            this.delete(minRight.value);
            currentNode.value = minRight.value;
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
tree.insert(16);
console.log(`----------------------------`)
prettyPrint(tree.root);
console.log(`----------------------------`)
tree.delete(67);
prettyPrint(tree.root);
console.log(`----------------------------`)
console.log(`----------------------------`)
console.log(`----------------------------`)
const anotherArray = [50,30,70,20,40,40,60,80];
const anotherTree = new Tree();
let sortedAnotherArray = anotherTree.sortArray(anotherArray);
anotherTree.root = anotherTree.buildTree(sortedAnotherArray, 0, sortedAnotherArray.length - 1);
prettyPrint(anotherTree.root);
anotherTree.delete(50);
prettyPrint(anotherTree.root);

