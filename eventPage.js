var contextMenuItem = {     //object
     "id": "spendMoney",
     "title": "SpendMoney",
     "contexts":["selection"]   //different types of contexts are available
};
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create(contextMenuItem);
});
function isInt(value){
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value,10));
}
chrome.contextMenus.onClicked.addListener(function(clickData){  //clickData is an object(can use any name)
    if(clickData.menuItemId=="spendMoney" && clickData.selectionText){
       if(isInt(clickData.selectionText)){
           chrome.storage.sync.get(['total','limit'], function (budget){
               var newTotal = 0;
               if (budget.total) {
                   newTotal += parseInt(budget.total);
               }
               newTotal += parseInt(clickData.selectionText);
               chrome.storage.sync.set({'total':newTotal},function(){
                   if (newTotal>= budget.limit) {
                    var notifOptions = {              //object
                        type: 'basic',                //different types of notifications are available
                        iconUrl:'icon48.png',
                        title: 'Limit reached!',
                        message: "You've reached your limit!"
                    };
                    chrome.notifications.create('limitNOtif',notifOptions);
                   }
               });
           });
       }
    }
});
chrome.storage.onChanged.addListener(function(changes,storageName) {  //for badge
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});//'changes' contains all the 
                     //variables that have change in the storage
});