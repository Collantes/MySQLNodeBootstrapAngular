﻿
define({
    init: function () {
        require(['authManager','uiManager','masterPageController'], function (authManager,uiManager,masterPageController) {

            if (authManager.isUserLoggedIn()){
                masterPageController.load('dashboard');
                return;
            }


            uiManager.hideSidebar().hideTopMenu();


            var $frm =$('#frmLogin:first');
            $('#btnLogin:first').click(function () {
                console.log('here');
                if ($frm[0].checkValidity()) {

                    /// will auto navigate to dashboard on its own
                    authManager.login($('#txtEmail:first').val()
                              , $('#txtPassword:first').val()
                              , function (err, result) {
                                  if (err)
                                      uiManager.showAlert('warning', err.message);
                                  else{
                                      uiManager.showSidebar();
                                      uiManager.showTopMenu();

                                  }
                              });
                    return false;
                }
            });

            $frm.find("input").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    $frm.trigger("click");
                }
            });

            $('#forgetPassword:first').click(function(){
                masterPageController.load('forgetPassword');
            });
        });
    }
});
