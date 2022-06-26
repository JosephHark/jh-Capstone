let text = "";
const fruits = [1,2,3,4,5,6,7,8,9];

fruits.forEach(myFunction);
document.getElementById("demo").innerHTML = text;
 
function myFunction(item, index) {
  text += index + ": " + item + '<button class="delteBtn">&#128465</button>'+ '<button class="editBtn">&#9998</button>'+ "<br>"; 
}