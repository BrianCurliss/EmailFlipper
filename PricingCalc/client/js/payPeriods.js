var startDate;
var endDate;

function setDateRange(value) {
    if (value == "Custom") {
        startDate = new Date(document.getElementById('payPeriodStartDate').value);
        endDate = new Date(document.getElementById('payPeriodEndDate').value);
        value = "Custom range for " + startDate + " through " + startDate;
    }
    else if (value == "CurrentPayPeriod") {
        startDate = new Date("2016-08-19");
        endDate = new Date("2016-09-02");
    }
    else if (value == "LastPayPeriod") {
        startDate = new Date("2016-08-05");
        endDate = new Date("2016-08-18");
    }
    else if (value == "ThisQuarter") {}
    else if (value == "LastQuarter") {}
    else if (value == "YeartoDate") {}
    else {
        console.log("error");
    }
    console.log(value + ": ");
    getData(startDate, endDate);
}

function getData(startDate, endDate) {
    $.ajax({
        url: "https://sheetsu.com/apis/v1.0/b98a37bb4535/sheets/AllTransactions",
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var transactionList = filterTransactions(data, startDate, endDate);
            var customerList = filterCustomers(transactionList);
            var payPeriodData = filterData(customerList, transactionList);
            showTotalCommission(payPeriodData);
            return showPayPeriodData(payPeriodData, customerList);
        },
        error: function(data) {
            console.log(data);
        }
    });
}

var filterTransactions = function(allTransactions, startDate, endDate) {
    var transactionDate;
    var listTransactions = [];

    allTransactions.forEach(function(transaction) {
        // the dates weren't going through correctly
        transactionDate = new Date(transaction.Date);

        if (startDate <= transactionDate && transactionDate <= endDate) {
            // add transaction to listTransactions array
            listTransactions.push(transaction);
        }
    });
    return listTransactions;
};

var filterCustomers = function(transactionList) {
    var customerList = [];

    transactionList.forEach(function(transaction) {
        if (customerList.map(function(e) {
                return e.Customer;
            }).indexOf(transaction.Name) === -1) {
            customerList.push({
                Customer: transaction.Name
            });
        }
    });
    return customerList;
};

//     for (var i = 0; i <= transactionList.length; i += 1) {
//         if (customerList.map(function(e) {
//                 return e.Customer;
//             }).indexOf(transactionList.Name) === -1) {
//             customerList.push({
//                 Customer: transactionList.Name
//             });
//         }
//     }
//     return customerList;
// };

var filterData = function(customerList, transactionList) {

    customerList.forEach(function(customer) {
        transactionList.forEach(function(transaction) {
            if (transaction.Name == customer.Customer) {
                if (typeof customer.Amount === 'undefined') {
                    customer.Amount = 0;
                }
                customer.Amount += parseFloat(transaction.Amount);
            }
        });
    });
    return customerList;
};

//     for (var i = 0; i <= customerList.length; i += 1) {
//         if (customerList.Customer == transactionList.Name) {
//             if (typeof customerList.Amount === 'undefined') {
//                 customerList.Amount = 0;
//             }
//             customerList.Amount += parseFloat(transactionList.Amount);
//         }
//     }
//     return customerList;
// };



var showPayPeriodData = function(payPeriodData, customerList) {
    var html = "";
    var list = document.getElementById("customer-period");
    list.innerHTML = html; // empty if populated

    payPeriodData.forEach(function(name) {
        html = "<tr id=" + name.Customer + "><td>" + name.Customer + "</td><td></td><td>$" + name.Amount.toFixed(2) + "</td><td></td><td></td></tr>";
        list.innerHTML = list.innerHTML + html;
    });
    console.log(payPeriodData);
};

var showTotalCommission = function(payPeriodData) {
    var html = 0;
    var list = document.getElementById("Total");

    payPeriodData.forEach(function(amount) {
        html += parseFloat(amount.Amount);
    });
    list.innerHTML = "$" + (html * .01).toFixed(2);
};