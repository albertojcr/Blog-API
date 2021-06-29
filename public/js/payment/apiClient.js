export function getAllPayment(callback) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:9200/payments", requestOptions)
        .then(response => response.json())
        .then(posts => callback(posts))
        .catch(error => console.log('error', error));
}