$('#toggleCustomers').click(function() {
    $('#transactionsDiv').hide();
    $('#homeDiv').hide();
    $('#closeioDiv').hide();
    $('#payPeriodsDiv').hide();
    $('#customersDiv').toggle();
    getCustomers();
});

$('#toggleTransactions').click(function() {
    $('#homeDiv').hide();
    $('#customersDiv').hide();
    $('#closeioDiv').hide();
    $('#payPeriodsDiv').hide();
    $('#transactionsDiv').toggle();
    getTransactions();
});

$('#togglePayPeriods').click(function() {
    $('#homeDiv').hide();
    $('#customersDiv').hide();
    $('#closeioDiv').hide();
    $('#transactionsDiv').hide();
    $('#payPeriodsDiv').toggle();
    getData(startDate, endDate);
});
