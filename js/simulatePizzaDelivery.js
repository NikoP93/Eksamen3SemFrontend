import {getIpAdress,postObjectAsJson} from "./module.js";

console.log("Jeg er i SimulatePizzaDelivery")


async function simulatePizzaOrder() {

    //Array af gade navne

    const streets = [
        "Adelgade",
        "Amaliegade",
        "Asylgade",
        "Badstuestræde",
        "Bispetorv",
        "Boldhusgade",
        "Cort Adelers Gade",
        "Delfingade",
        "Dyrkøb",
        "Esplanaden",
        "Farvergade",
        "Fredericiagade",
        "Frederiksborggade",
        "Gammel Mønt",
        "Gammeltorv",
        "Gernersgade",
        "Haregade",
        "Hyskenstræde",
        "Kattesundet",
        "Klareboderne",
        "Klareboderne",
        "Krokodillegade",
        "Laksegade",
        "Larslejsstræde",
        "Lavendelstræde",
        "Magstræde",
        "Møntergade",
        "Naboløs",
        "Ny Kongensgade",
        "Nygade",
        "Pilestræde",
        "Rævegade",
        "Rosenborggade",
        "Silkegade",
        "Skindergade",
        "Stokhusgade",
        "Tornebuskegade",
        "Valkendorfsgade",
        "Vestergade"
    ]

   //Finder en random gade fra array og et random nummer
    //Sætter det som adressen på vores delivery
    //Finder random pizza nummer mellem 1-5

    let data = {
        "adress": streets[getRandomInt(0,streets.length)] + " " + getRandomInt(1,60),
        "pizza": {
            "pizzaID": getRandomInt(1, 5)
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const url = getIpAdress() + "/deliveries/add"
    const order = await postObjectAsJson(url, data,"POST")
    console.log("Det her er den nye odre")

    //Kalder simulatePizzaOrder funktionen på et random tidspunkt mellem 1-5 min
    let nextOrder = getRandomInt(1, 5)
    setTimeout(simulatePizzaOrder, nextOrder * 60000)
}


export {simulatePizzaOrder}
