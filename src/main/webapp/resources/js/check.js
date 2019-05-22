   function inputMoveNumber(num) {
				if(isFinite(num.value) == false) {
					 swal({
	                	 icon : 'info',
	                	 text : '카드번호는 숫자만 입력할 수 있습니다.'
	                 });
					num.value = "";
					return false;
				}
				max = num.getAttribute("maxlength");
				if(num.value.length >= max) {
					num.nextElementSibling.focus();
				}
			}
   
   
   function inputValidThru(period) {

       // replace 함수를 사용하여 슬래시( / )을 공백으로 치환한다.
       var replaceCard = period.value.replace(/\//g, "");

       // 텍스트박스의 입력값이 4~5글자 사이가 되는 경우에만 실행한다.
       if(replaceCard.length >= 4 && replaceCard.length < 5) {

           var inputMonth = replaceCard.substring(0, 2);    // 선언한 변수 month에 월의 정보값을 담는다.
           var inputYear = replaceCard.substring(2, 4);       // 선언한 변수 year에 년의 정보값을 담는다.



           // 현재 날짜 값을 구한다.

           var nowDate = new Date();

           var nowMonth = autoLeftPad(nowDate.getMonth() + 1, 2);

           var nowYear = autoLeftPad(nowDate.getFullYear().toString().substr(2, 2), 2);


           // isFinite함수를 사용하여 문자가 선언되었는지 확인한다.
           if(isFinite(inputMonth + inputYear) == false) {
        	   swal({
              	 icon : 'error',
              	 text : '문자는 입력할 수 없습니다.'
               });
               period.value = autoLeftPad((Number(nowMonth) + 1), 2) + "/" + nowYear;
               return false;
           }

           // 입력한 월이 12월 보다 큰 경우
           if(inputMonth > 12) {
        	   swal({
              	 icon : 'info',
              	 text : '1월 부터 12월 까지만 입력할 수 있습니다.'
               });
               period.value = "12/" + inputYear;
               return false;
           }



           // 입력한 유효기간을 현재날짜와 비교하여 사용 가능 여부를 판단한다.
           if((inputYear + inputMonth) <= (nowYear + nowMonth)) {
        	   swal({
              	 icon : 'error',
              	 text : '유효기간이 만료된 카드는 사용이 불가능합니다.'
               });
               period.value = inputMonth + "/" + autoLeftPad((Number(nowYear) + 1), 2);
               return false;
           }

           period.value = inputMonth + "/" + inputYear;
       }
   }



   // 1자리 문자열의 경우 앞자리에 숫자 0을 자동으로 채워 00형태로 출력하기위한 함수
   function autoLeftPad(num, digit) {
       if(String(num).length < digit) {
           num = new Array(digit - String(num).length + 1).join('0') + num;
       }
       return num;
   }