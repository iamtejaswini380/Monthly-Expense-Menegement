const MENU = [{
  name: "JAN",
  id: 0
},
{
  name: "FEB",
  id: 1
},
{
  name: "MARCH",
  id: 2
},
{
  name: "APRIL",
  id: 3
},
{
  name: "MAY",
  id: 4
},
{
  name: "JUNE",
  id: 5
},
{
  name: "JULY",
  id: 6
},
{
  name: "AUG",
  id: 7
},
{
  name: "SEPT",
  id: 8
},
{
  name: "OCT",
  id: 9
},
{
  name: "NOV",
  id: 10
},
{
  name: "DEC",
  id: 11
}]
window.onload = function () {
  initialStorageSetup();
}
let container = document.querySelector(".container")
for (let i = 0; i < MENU.length; i++) {
  let { name, id } = MENU[i];
  monthElement = document.createElement("button");
  monthElement.className = "w-1/2 bg-slate-100 p-2 my-2 rounded-lg";
  monthElement.innerHTML = name;
  monthElement.id = id;
  container.append(monthElement);
  monthElement.addEventListener("click", () => {
    navigateToMonth(name, id);
  });
}
function navigateToMonth(name, id) {
  //Navigate to details page by passing name and id as 
  // query paramter to the URL
  window.location.href = `./page.html?name=${name}&id=${id}`;
}
function initialStorageSetup() {
  let myObject = {};
  for (let i = 0; i <= 11; i++) {
    myObject[i] = null;
  }

  if (localDataUtils.isEmptyByKey("data")) {
    localDataUtils.set("data", myObject)
  }

}



