'use strict';

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
      //if the existing node does not have any left child, 
      //meaning that if the `left` pointer is empty 
      //then we can just instantiate and insert the new node 
      //as the left child of that node, passing `this` as the parent.  
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      //if the node has an existing left child, 
      //then we recursively call the `insert` method 
      //so the node is added further down the tree.
      else {
        this.left.insert(key, value);
      }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    //if the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }



}





function main(){
//   const myBST = new BinarySearchTree();

  //   myBST.insert(3);
  //   myBST.insert(1);
  //   myBST.insert(4);
  //   myBST.insert(6);
  //   myBST.insert(9);
  //   myBST.insert(2);
  //   myBST.insert(5);
  //   myBST.insert(7);

  // myBST.insert('E');
  //   myBST.insert('A');
  //   myBST.insert('S');
  //   myBST.insert('Y');
  //   myBST.insert('Q');
  //   myBST.insert('U');
  //   myBST.insert('E');
  //   myBST.insert('S');

//   console.log(myBST);

}



const dummyBST = new BinarySearchTree();
dummyBST.insert(4);
dummyBST.insert(2);
dummyBST.insert(6);
dummyBST.insert(1);
dummyBST.insert(3);
dummyBST.insert(5);
dummyBST.insert(7);


 



// console.log(BSTheight(dummyBST));


function findHeight(node){
  console.log(node);
  if(node.key === null){
    return 0;
  }
  else if(node.right === null && node.left === null){
    return 1; //maybe -1 if height at root is zero
  }else if(node.right === null){
    return 1+ findHeight(node.left);
  }else if (node.left === null){
    return 1+ findHeight(node.right);
  }
  else{
    return 1+  Math.max(findHeight(node.right), findHeight(node.left));
    ///return max of bigger left aor right 
  }
}


function isBST(node){

//first check if the left value is less than the value of the current node
//check the right value to see if it's greather than the the value of the current node
//if not true, then return false
  if(node ===null){
    return true;
  }

  if(node.left !==null && node.key < node.left.key){
    return false;
  }

  if(node.right !==null && node.key > node.right.key ){
    return false;
  }

  return isBST(node.left) && isBST(node.right);

}


console.log('IS BST',isBST(dummyBST));


//THIRD LARGEST NODE

//the largest value is the most right

//check left of the largest first

//check left children if they exist

//check parent / check if our parent has left child

//if it has left child, check the child that is the most right

//if the parent doesnt have a child, go to the parents parent


const nthLargest = (tree, state) => {
  console.log(state.n);
  if (tree.right) {
    nthLargest(tree.right, state);
  }
  --state.n;
  if (!state.n) { 
    state.result = tree.key;
    return;
  }
  if (tree.left) {
    nthLargest(tree.left, state);
  } 
}; 

const thirdLargest = (tree) => {
  if (!tree.key) {
    return null;
  }
  let state = {n: 3, result: null};
  nthLargest(tree, state);
  return state.result;
};





console.log('THIRD LARGEST',thirdLargest(dummyBST));
