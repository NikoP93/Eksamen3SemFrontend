function getIpAdress(){
    return "http://localhost:8080";
}

function fetchAnyUrl(url){
    return fetch(url).then(response => response.json());
}

//En metode til at poste i stedet for at gette.
function postAnyUrl(url){
    return fetch(url,{method:"POST"}).then(response => response.json());
}

async function postObjectAsJson(url,object,httpVerbum){
    const objectAsJsonString = JSON.stringify(object);
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions);
    return response;
}



export {fetchAnyUrl,postObjectAsJson,getIpAdress,postAnyUrl}