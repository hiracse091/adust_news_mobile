jQuery(function() {
	jQuery('.error').hide();
	jQuery(".registerButton").click(function(){

		if(!navigator.onLine)
		{
			alert("Please check your internet connection and try again.");
			return;
		}
  		// validate and process form
		// first hide any error messages
  		jQuery('.error').hide();
  		//name
  		var name = jQuery("input#userName").val();
		if (name == "" || name == "Your Name") {
    		jQuery("span#userNameError").show();
    		jQuery("input#userName").focus();
    		return false;
    	}
    	//email
		var email = jQuery("input#userEmail").val();
		if (email == "" || email == "Your Email Address") {
			jQuery("span#userEmailError").show();
			jQuery("input#userEmail").focus();
      		return false;
    	}
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(!emailReg.test(email)) {
			jQuery("span#userEmailError2").show();
	    	jQuery("input#userEmail").focus();
      		return false;
		}
		//phone
		var phone = jQuery("input#userPhone").val();
		if(phone == "" || phone == "Your Phone Number") {
			jQuery("span#userPhoneError").show();
			jQuery("input#userPhone").focus();
			return false;
		}
		var phoneReg = /^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/;
		if(!phoneReg.test(phone)) {
			jQuery("span#userPhoneError2").show();
			jQuery("input#userPhone").focus();
			return false;
		}
		//department
		var department = jQuery("select#userDepartment").val();
		if(department == "" || department == "Your Department") {
			jQuery("span#userDepartmentError").show();
			jQuery("select#userDepartment").focus();
			return false;
		}
		var dataString = $("#registerForm").serialize();
		console.log(dataString);
		var dataArray = $("#registerForm").serializeArray();
		if(getStorage('regid')){
			regid = getStorage('regid');
		}else{
			regid = '';
		}
		dataArray.push({name: 'gcm_regid', value: regid});
		console.log(dataArray);

		$.ajax({
		  url: serverIP + "newsportal/index.php/user/registerUser",
		  data: dataArray,
		  success: function(res){
		  	console.log(res);
		  	if(res != "false"){
		  		id = parseInt(res);
		  		dataArray.push({name: 'id', value: id});
		  		//localStorage.setItem('user-data', JSON.stringify(dataArray));
		  		//localStorage.setItem('status', 'pending');
		  		setStorage('user-data', JSON.stringify(dataArray));
		  		alert('Registration Complete.');

		  		loadLatestNewsItems();

		  		$('a.toggle-nav').show();
		  		$('div#register').hide();
				$('div#home').show();
				$('div#about').hide();
				$('div#portfolio').hide();
				$('div#contact').hide();

				slider = new Swipe(document.getElementById('slider'));
		  	}
		  },
		  error:function(err){
			  console.log(JSON.stringify(err));
			  alert('Something went wrong. Check your internet connection!');
		  }
		});

	});
});
function getStorage(name) {
    var value = window.localStorage.getItem(name);
    if(!value) return undefined;
    return value;
}

function setStorage(name, value) {
    window.localStorage.setItem(name, value);
}