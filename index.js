const { Book, printBooks, lendBook,User,printUsers,lendUser} = require("./my-pkg/book");
//printBooks()
const [, , ...args2] = process.argv;
let b1=new Book();
b1=lendBook(args2[0]);
b1.printBooks()

let u1=new User();
u1=lendUser(args2[1]);
u1.printUser()
if(u1.type===b1.type)
{                                                                                                                       
    console.log("it mach!");
}
if(b1.lended===true){console.log("it is lended");}
else{console.log("it is not lended");}
if(u1.lended===true){console.log("he is lend already");}
else{console.log("he is not lend already");}
