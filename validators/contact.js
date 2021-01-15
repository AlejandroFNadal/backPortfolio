var contactValidator = function(email,message,aName){
    var emailRegExp=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if(emailRegExp.test(email)){
        return true;
    }
    else{
        return false;
    }
}

module.exports = contactValidator;