'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

const SinglyLinkedListNode = class {
    constructor(nodeData) {
        this.data = nodeData;
        this.next = null;
    }
};

const SinglyLinkedList = class {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertNode(nodeData) {
        const node = new SinglyLinkedListNode(nodeData);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
    }
};

function printSinglyLinkedList(node, sep, ws) {
    while (node != null) {
        ws.write(String(node.data));

        node = node.next;

        if (node != null) {
            ws.write(sep);
        }
    }
}

function findMergeNode(headA, headB) {
  var forward1=headA;
  var previous1=headA;
  var forward2=headB;
  var previous2=headB;
   while(forward1 != null || forward2 != null){
           if(forward1 != null){
            var temp1=forward1.next;
            forward1.next=previous1;
            previous1=forward1;
            forward1=temp1;
           }
           if(forward2 != null){
            var temp2=forward2.next;
            forward2.next=previous2;
            previous2=forward2;
            forward2=temp2;
           }
           
        }
        headA.next=null;
        headA=previous1;
        headB.next=null;
        headB=previous2;
    var data=0;
    while(headA != null && headB !=null){
        if(headA.data!= headB.data){
            break;
        }
        data=headA.data;
    }
    return data;
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const tests = parseInt(readLine(), 10);

    for (let testsItr = 0; testsItr < tests; testsItr++) {
        const index = parseInt(readLine(), 10);

        const llist1Count = parseInt(readLine(), 10);

        let llist1 = new SinglyLinkedList();

        for (let i = 0; i < llist1Count; i++) {
            const llist1Item = parseInt(readLine(), 10);
            llist1.insertNode(llist1Item);
        }
      
      	const llist2Count = parseInt(readLine(), 10);

        let llist2 = new SinglyLinkedList();

        for (let i = 0; i < llist2Count; i++) {
            const llist2Item = parseInt(readLine(), 10);
            llist2.insertNode(llist2Item);
        }
      
      	const ptr1 = llist1.head;
        const ptr2 = llist2.head;

        for (int i = 0; i < llist1Count; i++) {
          if (i < index) {
            ptr1 = ptr1.next;
          }
        }

        for (let i = 0; i < llist2Count; i++) {
          if (i != llist2Count-1) {
            ptr2 = ptr2.next;
          }
        }

        ptr2.next = ptr1;

        let result = findMergeNode(llist1.head, llist2.head);

        ws.write(result + "\n");
    }

    ws.end();
}
