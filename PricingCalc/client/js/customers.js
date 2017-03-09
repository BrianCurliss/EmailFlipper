var getCustomers = function() {
  $.ajax({
    url: "https://sheetsu.com/apis/v1.0/b98a37bb4535/sheets/Transactions",
    type: 'GET',
    dataType: 'json',
    
    success: function(data) {
      salesGreaterThan10(data);
      addQuarterlyBatch(data);
      checkQuarterly(data);
      checkBatch(data);
    },
    error: function(data) {
      console.log(data);
    }
  });
};


var salesGreaterThan10 = function(data) {
  var totalSalesGreaterThan10 = 0;
  var numOfCompaniesWithSalesGreaterThan10 = 0;
  var customerName = 0;

  for (var i = 0; i < data.length; i += 1) {
    customerName = data[i];
    if (customerName.Amount > 10) {
      totalSalesGreaterThan10 += Number(customerName.Amount);
    }
    if (customerName.Amount >= 10) {
      numOfCompaniesWithSalesGreaterThan10 += 1;
    }
  }
  document.getElementById("salesGreaterThan10").innerHTML = "Sales greater than $10 is $" + totalSalesGreaterThan10;
  document.getElementById("numOfCompaniesWithSalesGreaterThan10").innerHTML = "# of sales > $10 = " + numOfCompaniesWithSalesGreaterThan10;
};

var addQuarterlyBatch = function(data) {
  var list = document.getElementById("customer-names");
  var uniqueCustomers = [];
  var customer;
  var html;

  for (var i = 0; i < data.length; i += 1) {
    customer = data[i];
    if (uniqueCustomers.indexOf(customer.Customer) < 0) {
      uniqueCustomers.push(customer.Customer);
      html = '<tr id="' + customer.Customer + '"><td>' + customer.Customer + '</td><td><input id="toggle-trigger-quarterly" type="checkbox" data-toggle="toggle" data-on="Quarterly" data-off="Standard" data-onstyle="success"></td><td><input id="toggle-trigger-batch" type="checkbox" data-toggle="toggle" data-on="Batch" data-off="Standard" data-onstyle="success"></td><td><button>Save</button></td></tr>';
      list.innerHTML = list.innerHTML + html;
    }
  }
  document.getElementById("totalUniqueCustomers").innerHTML = "Total unique customers is " + uniqueCustomers.length;
};

var checkQuarterly = function(data) {
  var checkedQuarterly = 0;
  var checkboxQuarterly = document.getElementsByClassName("toggle-trigger-quarterly");

  for (var i = 0; checkboxQuarterly[i]; i++) {
    if (checkboxQuarterly[i].checked) {
      checkedQuarterly = checkboxQuarterly[i].value;
    }
  }
  document.getElementById("totalQuarterly").innerHTML = "Total quarterly subscriptions: " + checkedQuarterly;
};

var checkBatch = function(data) {
  var checkedBatch = 0;
  var checkboxBatch = document.getElementsByClassName("toggle-trigger-batch");

  for (var i = 0; checkboxBatch[i]; i++) {
    if (checkboxBatch[i].checked) {
      checkedBatch = checkboxBatch[i].value;
    }
  }
  document.getElementById("totalBatch").innerHTML = "Total batch orders: " + checkedBatch;
};
