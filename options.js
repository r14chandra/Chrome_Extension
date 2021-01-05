$(function(){
    chrome.storage.sync.get('limit',function(budget){
        $('#limit').val(budget.limit); //id of the limit in options page
    })
    $('#saveLimit').click(function(){
       var limit = $('#limit').val();//store value to 'limit'
       if(limit){
           chrome.storage.sync.set({'limit':limit},function(){
               close(); //close the current tab
           });
       }
    });
    $('#resetTotal').click(function(){
      chrome.storage.sync.set({'total':0},function(){
        var notifOptions = {              //object
            type: 'basic',                //different types of notifications are available
            iconUrl:'icon16.png',
            title: 'Total Reset',
            message: "Total has been reset to 0 !"
        };
        chrome.notifications.create('limitNOtif',notifOptions);
         //close the current tab
      });
    });
});