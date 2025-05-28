    
       function accountsave() { 
            var accountfieldValue = 
                document.getElementById('accounttext').value; 
  
            localStorage.setItem('accounttext2', accountfieldValue); 
        } 


        function pwdsave() { 
            var  pwdfieldValue = 
                document.getElementById('pwdtext').value; 
  
            localStorage.setItem('pwdtext2',  pwdfieldValue); 
        } 


        //reading data 
        function get() { 



            var accountstoredValue = localStorage.getItem('accounttext2'); 

            var pwdstoredValue = localStorage.getItem('pwdtext2'); 

            if (accountstoredValue) { 
  
                document.getElementById( 
                    'accounttext').value = accountstoredValue; 
                document.getElementById('accounttextfield2').innerHTML = accountstoredValue; 
            } 



         
            if (pwdstoredValue) { 

  
                document.getElementById( 
                    'pwdtext').value = pwdstoredValue; 
                document.getElementById('pwdtextfield2').innerHTML = pwdstoredValue; 
            } 




        } 
  
        //removing stored data 
        function remove() { 
            document.getElementById( 
                'textfield').value = ''; 
  
            localStorage.removeItem('text'); 
        } 