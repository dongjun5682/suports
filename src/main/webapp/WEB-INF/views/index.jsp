<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

<link rel="shortcut icon" href="resources/img/logo/favicon.ico" type="image/x-icon">
<link rel="icon" href="resources/img/logo/favicon.ico" type="image/x-icon">
<title>SUPORTS</title>
<!-- Cookie Consent -->
<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js"></script>
<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css" />

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBAQX1xNr1pIAgaFoZIyZXHXw2WnJvlgGY&callback=initMap"></script>
<script src="resources/js/com/popper.min.js"></script>
<!-- <script src="resources/js/com/jquery.min.3.3.1.js"></script> -->
<script src="resources/js/com/jquery.min.3.4.1.js"></script>

<!-- 아임포트 -->
<script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script>
<link rel="stylesheet" href="resources/css/import.css">

<!-- 챗봇 -->
<!-- <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> -->
<!--  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script> 
<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">  -->
<!-- <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet"> -->
<!-- 챗봇 -->
<link href="resources/css/fullscreenDemo.css" rel="stylesheet" type="text/css">

<!-- default css -->
<link rel="stylesheet" href="resources/css/style.css">
<link rel="stylesheet" href="resources/css/com/myTooltip.css">
<link rel="stylesheet" href="resources/css/com/bootstrap3.css">
<link rel="stylesheet" href="resources/css/com/animate.min.css">
<link rel="stylesheet" href="resources/css/com/datapicker.min.css">
<link rel="stylesheet" href="resources/css/com/summernote-lite.css">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/chatbot.css"> 
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<!-- modal css -->
<link rel="stylesheet" href="resources/css/modal.css">

<!-- signin css -->
<link rel="stylesheet" href="resources/css/signin/util.css">
<link rel="stylesheet" href="resources/css/signin/main.css">

<!-- player css -->
<link rel="stylesheet" href="resources/css/playersignuppg1.css">

<!-- team css -->
<link rel="stylesheet" href="resources/css/team/teamcreatepg1.css">

</head>
<body>
<div id="content"></div>
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content"></div>
		</div>
	</div>
	<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content2"></div>
		</div>
	</div>
	<div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content3"></div>
		</div>
	</div>
	<div class="modal fade" id="myModal_tour" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div id="modal-content3"></div>
		</div>
	</div>
<div id="myMpa">

</div>
	<script src="resources/js/app.js"></script>
	<script src="resources/js/check.js"></script>
	<script src="resources/js/bootstrap3.min.js"></script>
	<script src="resources/js/com/router.js"></script>
	<script src="resources/js/com/myTooltip.js"></script>
	<script src="resources/js/com/sweetalert.min.js"></script>
	<script src="resources/js/com/datepicker.min.js"></script>
	<script src="resources/js/com/datepicker.ko-kr.js"></script>
	<script src="resources/js/com/fileupload.js"></script>
	<script src="resources/js/com/summernote-lite.min.js"></script>
	<script src="resources/js/com/summernote-ko-KR.js"></script>
	<script src="resources/js/compo/compo.js"></script>
	<script src="resources/js/com/util.js"></script>
	<script src="resources/js/home/home.js"></script>
    <script src="resources/js/home/chat.js"></script>
	<script src="resources/js/member/member.js"></script>
    <script src="resources/js/vidbg.js"></script>
	<!-- <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script> -->
   
<script>
app.run('<%=application.getContextPath()%>');

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drag2(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) { ev.preventDefault(); 
	var c = ev.dataTransfer.getData("text"); 
	ev.target.appendChild(document.getElementById(c));
} 

window.addEventListener("load", function(){
	window.cookieconsent.initialise({
		 "palette": {
			    "popup": {
			      "background": "#ffffff",
			      "text": "#495a61"
			    },
			    "button": {
			      "background": "#22c781",
			      "text": "#ffffff"
	    }
	  },
	  "showLink": false,
	  "theme": "classic",
	  "position": "bottom-left",
	  "content": {
	    "message": "이 웹 사이트는 귀하가 당사 웹 사이트에서 최상의 경험을 할 수 있도록 쿠키를 사용합니다.",
	    "dismiss": "알겠습니다!"
	  }
	});
});

</script>

</body>
</html>