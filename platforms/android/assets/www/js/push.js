function onNotification(e) {
    console.log('EVENT -> RECEIVED:' + e.event);

    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
            /*var temp = {}
            temp.regId = e.regid;
            temp.name = 'naher';
            temp.email = 'nurun.naher@dcastalia.com';
            $.ajax({
                type: "POST",
                url: 'http://dcastalia.com/projects/web/naher/gcm_server_php/register.php',
                data: temp,
                success: function(){
                    alert("Regestration successfull!")
                    setStorage('register','true');
                }
            });*/
            //if(!getStorage('register')){
                setStorage('regid',e.regid);
                if(getStorage('user-data')){
                    // check urser-data regid 
                    user_data = JSON.parse(getStorage('user-data'));
                    regInd = user_data.length-2;
                    if(user_data[regInd].name == 'gcm_regid' && user_data[regInd].value != e.regid){
                        //update
                        user_data[regInd].value = e.regid;
                        $.ajax({
                          url: serverIP + "newsportal/index.php/user/updateUser",
                          data: user_data,
                          success: function(res){
                            console.log(res);
                            if(res == "true"){                                
                                setStorage('user-data',JSON.stringify(user_data));
                            }
                          }
                        });
                    }
                }else{
                    //do nothing
                }
           // }
            //http://localhost:8080/projects/gcm_server_php/register.php
        }
    break;

    case 'message':
        console.log(JSON.stringify(e));
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            console.log('<li>--INLINE NOTIFICATION--' + '</li>');

            // on Android soundname is outside the payload.
            // On Amazon FireOS all custom attributes are contained within payload
            var soundfile = e.soundname || e.payload.sound;
            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/beep.wav");
            my_media.play();
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                console.log('<li>--COLDSTART NOTIFICATION--' + '</li>');
            }
            else
            {
                console.log('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
        }
       
    break;

    case 'error':
       alert('ERROR -> MSG:' + e.msg);
    break;

    default:
        alert('EVENT -> Unknown, an event was received and we do not know what it is');
    break;
  }
}

function tokenHandler (result) {
    $("#app-status-ul").append('<li>token: '+ result +'</li>');
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
}

function successHandler (result) {
   console.log('<li>success:'+ result +'</li>');
}

function errorHandler (error) {
    alert('error:'+ error);
}