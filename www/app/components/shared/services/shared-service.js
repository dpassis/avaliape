var app = angular.module('avaliape.sharedService',[]);

app.factory("ErrorMessage",function(){

      return{ 
            /**
             * @author dpassis
             * @description Function to retrieve a error message for Authentication user
             * @param errorCode
             * @returns a message error base in a passed errorCode
             */
            getErrorMessageAuth :  function(errorCode){

                    switch(errorCode) {
                        case 'auth/wrong-password':
                            return  'auth.loginUserForm_errorMessage_wrongPass';
                            break;
                        case 'auth/invalid-email':
                            return  'auth.loginUserForm_errorMessage_invalidEmail';
                            break;
                        case 'auth/user-disabled':
                            return  'auth.loginUserForm_errorMessage_userDisable';
                            break;
                        case 'auth/user-not-found':
                            return  'auth.loginUserForm_errorMessage_userNotFound';
                        case 'auth/email-not-verified':
                            return  'auth.loginUserForm_errorMessage_confEmail';
                            break;
                        default:
                            return 'auth.loginUserForm_errorMessage_unknownError';
                    }
                    
            },
            /**
             * @author dpassis
             * @description Function to retrieve a error message in a Creation user proccess
             * @param errorCode
             * @returns a message error base in a passed errorCode
             */
            getErrorMessageAuthCreate :  function(errorCode){
        
                    switch(errorCode) {
                        case 'auth/email-already-in-use':
                            return  'auth.createUserForm_errorMessage_emailInUse';
                            break;
                        case 'auth/invalid-email':
                            return  'auth.createUserForm_errorMessage_invalidEmail';
                            break;
                        case 'auth/operation-not-allowed':
                            return  'auth.createUserForm_errorMessage_oprNotAllowed';
                            break;
                        case 'auth/weak-password':
                            return  'auth.createUserForm_errorMessage_weakPass';
                            break;
                        case 'auth/diff-password':
                            return  'auth.createUserForm_errorMessage_diffPass';
                            break;
                        case 'auth/send-mail-error':
                            return  'auth.createUserForm_errorMessage_sendMailError';
                            break;
                        default:
                            return 'auth.createUserForm_errorMessage_unknownError';
                    }
            },

            /**
             * @author dpassis
             * @description Function to retrieve a error message when Send Email to Reset Password 
             * @param errorCode
             * @returns a message error base in a passed errorCode
             */
            getErrorMessagePswdReset :  function(errorCode){
        
                switch(errorCode) {
                    case 'auth/invalid-email':
                        return  'auth.pswdResetForm_errorMessage_invalidEmail';
                        break;
                    case 'auth/user-not-found':
                        return  'auth.pswdResetForm_errorMessage_userNotFound';
                        break;
                    default:
                        return 'auth.pswdResetForm_errorMessage_unknownError';
                }
        }
        }

    });



