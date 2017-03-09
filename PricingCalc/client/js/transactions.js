var getTransactions = function() {
  $.ajax({
    url: "https://sheetsu.com/apis/v1.0/b98a37bb4535/sheets/Transactions",
    type: 'GET',
    dataType: 'json',
    
    success: function(data) {
      showTransactions(data);
      getTotalSales(data);
    },
    error: function(data) {
      console.log(data);
    }
  });
};


var showTransactions = function(data) {
  var list = document.getElementById("customer-list");
  var customer = 0;
  
  var html;
  for (var i = 0; i < data.length; i += 1) {
    customer = data[i];
    html = "<tr id=" + customer.Customer + "><td>" + customer.Customer + "</td><td>" + customer.Date + "</td><td>" + customer.Num + "</td><td>" + customer.Amount + "</td></tr>";
    list.innerHTML = list.innerHTML + html;
  }
};

var getTotalSales = function(data) {
  var totalSales = 0;
  var customerName = 0;

  for (var index = 0; index < data.length; index += 1) {
    customerName = data[index];
    if (customerName.Amount > 0) {
      totalSales += Number(customerName.Amount);
    }
  }
  document.getElementById("totalSalesNum").innerHTML = "Total Sales: $" + totalSales;
};