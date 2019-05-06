function validate() {
       var re = /^[a-zA-Z0-9]{6,16}$/;
       var re2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  
       var id = document.getElementById("memberId").val();
       var email = document.getElementById("memberEmail").val();
       
       if(!check(re,id,"아이디는 6~16자의 영문 대소문자와 숫자로만 입력할 수 있습니다.")) {
           return false;
       }

       if(email.value=="") {
           alert("이메일을 입력해 주세요.");
           email.focus();
           return false;
       }

       if(!check(re2, email, "적합하지 않은 이메일 형식입니다.")) {
           return false;
       }

       if(join.name.value=="") {
           alert("이름을 입력해 주세요");
           join.name.focus();
           return false;
       }
   }

   function check(re, what, message) {
       if(re.test(what.value)) {
           return true;
       }
       alert(message);
       what.value = "";
       what.focus();
   }