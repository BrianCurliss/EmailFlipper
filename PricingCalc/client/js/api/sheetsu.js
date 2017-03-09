var updateCustomerType = function (value, q, b) {
  var column = "Customer";
  var value = value;
  var sheet = "Customers";
  var request = "PUT";

  var input = {
    Customer:  value,
    Quarterly: q,
    Batch: b
  };

  var data = putSheetsu(request, sheet, column, value, data);
}



var putSheetsu = function (request, sheet, column, value, input) {
  $.ajax({
    url: 'https://sheetsu.com/apis/v1.0/b98a37bb4535/sheets/' + sheet + '/' + column + '/' + value,
    data: input,
    dataType: 'json',
    type: request,

    success: function(data) {
      return (data);
    },
    error: function(data) {
      console.log(data);
    }
  });
};

var getSheetsu = function (sheet) {
  $.ajax({
    url: 'https://sheetsu.com/apis/v1.0/b98a37bb4535/sheets/' + sheet,
    dataType: 'json',
    type: 'GET',
    
    success: function(data) {
      return (data);
    },
    error: function(data) {
      console.log(data);
    }
  });
};

// function(){
//   var data = getSheetsu("AllTransactions");
//   nextFunction(data);
// }
