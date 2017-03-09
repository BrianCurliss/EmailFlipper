// COMMISSION STRUCTURE

var commMBO = 100; // Minimum 1st Batch Order	100 
var commNDBBO = 10; // Number of Days Between Orders (Batch)	10
var commNDBQO = 10; // Number of Days Between Orders (Quarterly)	80
var commRCNO = 2; // Define Return Customer (# of orders)	2
var commDIPP = 14; // Days In Pay Period	14
var commBCAS = .01; // Base Commission on All Sales	1%
var commACRBO = .01; // Additional Commission on Repeat Batch Order	1%
var commACQR = .02; // Additional Commission on Quarterly Renewals	2%
var commACMR = 0; // Additional Commission on Monthly Renewals	0%

var commissionStructure = [commMBO, commNDBBO, commNDBQO, commRCNO, commDIPP, commBCAS, commACRBO, commACQR, commACMR];


