import {fetchAnyUrl, getIpAdress, postAnyUrl} from "./module.js";
import {simulatePizzaOrder} from "./simulatePizzaDelivery.js";

console.log("jeg er i deliverytable")

async function fetchDelivery() {
    console.log("Updated table")
    const url = getIpAdress() + "/deliveries"
    const deliveries = await fetchAnyUrl(url);
    tableBody.innerHTML = ""
    deliveries.forEach(putDataInTable)

}

function updateTable() {
    console.log("Timer starter")
    fetchDelivery()
    setTimeout(updateTable, 60000)
}

//Hvis der er en drone, så tilføjer den drone id til tabellen, ellers tilføjer den ""
//Hvis ikke delivery har en drone tilføjer den en knap, ellers tilføjer den ""
// Det er ? if true gør det ellers = : gør dette
function putDataInTable(delivery) {

    //Gemmer dagen/tiden i en variabel, som bliver brugt i stedet til at formatere til lokal tid.
    let deliveryDate = new Date(delivery.expectedDeliveryTime)

    const tr = document.createElement("tr");

    tr.innerHTML =
        "<td>" + delivery.deliveryID + "</td>" +
        "<td>" + deliveryDate.toLocaleString() + "</td>" +
        "<td>" + delivery.pizza.title + "</td>" +
        "<td>" + delivery.adress + "</td>" +
        "<td>" + (delivery.drone ? delivery.drone.droneID : " ") + "</td>" +
        "<td>" +
        (!delivery.drone ? "<button class='button' id='assignDrone" + delivery.deliveryID + "'>Tildel Drone</button>" : "") +
        "</td>"


    tableBody.appendChild(tr);

    const assignDroneBtn = document.getElementById("assignDrone" + delivery.deliveryID);

    if (assignDroneBtn) {
        assignDroneBtn.addEventListener("click", () => {
            scheduleDrone(delivery.deliveryID)
        })
    }
}


async function addDrone() {
    console.log("Im in addDrone")
    const url = getIpAdress() + "/drones/add"
    const drone = await postAnyUrl(url)
    console.log("Det her er drone objetet ", drone)
}

async function scheduleDrone(deliveryID) {
    const url = getIpAdress() + "/deliveries/schedule/" + deliveryID
    await postAnyUrl(url);
    fetchDelivery()
}

async function simulateDelivery() {
    const tableBody = document.getElementById("tableBody")
    const firstRow = tableBody.children[0]
    const firstColum = firstRow.children[0]
    const deliveryID = firstColum.innerHTML

    const url = getIpAdress() + "/deliveries/finish/" + deliveryID
    await postAnyUrl(url)
    fetchDelivery()
}

//Kalder update table og starter timeren når man går ind på siden, men ikke hver gang man bruger knapper
//Bliver kun kaldt når man loader siden
function initSetup() {


    const addDroneBtn = document.getElementById("addDroneBtn");
    addDroneBtn.addEventListener("click", () => {
        addDrone()
    })
    const simulateDeliveryBtn = document.getElementById("simulateDeliveryBtn");
    simulateDeliveryBtn.addEventListener("click", () => {
        simulateDelivery()
    })

    updateTable()

    simulatePizzaOrder()
}

initSetup()