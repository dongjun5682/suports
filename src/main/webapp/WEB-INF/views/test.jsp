<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <title>신용카드 검사</title>
 </head>
 <body>
 <h1>신용카드 검사</h1>
 <form>
    <p> 신용카드 번호를 입력하세요:</p>
   <p><input type="text" size="20" name="cardnumber" onkeyup="validatecardnumber(this.value)"></p>
    <p id="notice">(카드 번호가 입력되지 않았습니다)</p> 
 </form>
 
 <script>
    function validatecardnumber(cardnumber) {
   
        //빈칸과 대시 제거
        cardnumber = cardnumber.replace(/[ -]/g,'');
 
        //카드 번호가 유효한지 검사
        //정규식이 캡처 그룹들 중 하나에 들어있는 숫자를 캡처
        var match = /^(?:(94[0-9]{14})|(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.exec(cardnumber);
       
        if(match) {
 
            //정규식 캡처 그룹과 같은 순서로 카드 종류 나열
            var types = ['BC', 'Visa', 'MasterCard', 'Discover', 'American Express', 'Diners Club', 'JCB'];
 
            //일치되는 캡처 그룹 검색
            //일치부 배열의 0번째 요소 (전체 일치부중 첫 일치부)를 건너뜀
            for(var i = 1; i < match.length; i++) {
                if(match[i]) {
                    //해당 그룹에 대한 카드 종류를 표시
                    document.getElementById('notice').innerHTML = types[i-1];
                    break;
                }
            }
 
        } else {
            document.getElementById('notice').innerHTML = '(잘못된 카드 번호)';
        }
    }
 </script>
 
 </body>
</html>
[출처] [자바스크립트 정규표현식] 유효성 검사 - 신용카드 번호 검사|작성자 자바킹