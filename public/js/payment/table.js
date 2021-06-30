export function createPaymentRow(payment) {
    console.log(payment);
    let row = document.createElement('tr');
    row.setAttribute('id', 'payment-id-' + payment.id);
    let cell1 = document.createElement('td');
    cell1.innerText = payment.id;
    let cell2 = document.createElement('td');
    cell2.innerText = payment.amount + '€';
    let cell3 = document.createElement('td');
    cell3.innerText = payment.createdAt;
    let cell4 = document.createElement('td');
    cell4.innerText = payment.userId;
    let cell5 = document.createElement('td');
    cell5.innerText = payment.postId;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);

    return row;
}

export function renderManagePaymentTable(payments) {
    let paymentTable = document.getElementById('payment-table');
    let paymentHeadRow = paymentTable.querySelector('thead');
    let paymentTableBody = paymentTable.querySelector('tbody');

    paymentHeadRow.innerHTML = '<tr><th>ID</th><th>Amount</th><th>Created at</th><th>User ID</th><th>Post ID</th></tr>';
    paymentTableBody.innerHTML = '';

    for (let payment of payments) {
        let row = createPaymentRow(payment);
        paymentTableBody.insertBefore(row, paymentTableBody.firstChild);
    }
}