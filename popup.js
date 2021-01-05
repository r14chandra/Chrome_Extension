//Using jQuery for listening to the event when spend button is clicked
$(function(){
  chrome.storage.sync.get(['total','limit'],function(budget){
    $('#total').text(budget.total);   //total is already displayed whenever user opens the popup 
    $('#limit').text(budget.limit);   //limit is displayed whenever user opens the popup
  }) 
  $("#spendamount").click(function(){  //submit button with id=spendamount
      chrome.storage.sync.get(['total','limit'],function(budget){//1st browser api, expects callback function for the 2nd parameter
        //here budget is a object
        var newamount = 0;
        if(budget.total)
            newamount += parseInt(budget.total);
        //user entered value is stored in amount    
        var amount = $("#amount").val(); 
        if(amount)
            newamount += parseInt(amount);
      chrome.storage.sync.set({'total':newamount},function(){//2nd browser api, expects an object and a callback function
        if(amount && newamount>=budget.limit){
           var notifOptions = {//object
             type: 'basic', //different types of notifications are available
             iconUrl:'icon48.png',
             title: 'Limit reached!!',
             message: "You've reached your limit!"
           };
           //takes 2 parameter ,1st one is id for the notification and 2nd is object
           chrome.notifications.create('limitNOtif',notifOptions);//using chrome api to create notification
        }
      });
        $('#total').text(newamount);//update the UI
        $('#amount').val('');//clear the i/p box
      });   
  });
});