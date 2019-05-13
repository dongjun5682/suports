<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="shortcut icon" href="resources/img/logo/favicon.ico" type="image/x-icon">
<link rel="icon" href="resources/img/logo/favicon.ico" type="image/x-icon">
<title>SUPORTS</title>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBAQX1xNr1pIAgaFoZIyZXHXw2WnJvlgGY&callback=initMap"></script>
<script src="resources/js/signin/signin.js"></script>
<script src="resources/js/com/popper.min.js"></script>
<!-- <script src="resources/js/com/jquery.min.3.3.1.js"></script> -->
<script src="resources/js/com/jquery.min.3.4.0.js"></script>
<!-- 챗봇 -->
<!-- <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script> 
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script> 
<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"> -->
<!-- <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">
 --><!-- 챗봇 -->
<link href="resources/css/fullscreenDemo.css" rel="stylesheet" type="text/css">


<!-- default css -->
<link rel="stylesheet" href="resources/css/style.css">
<link rel="stylesheet" href="resources/css/com/myTooltip.css">
<link rel="stylesheet" href="resources/css/com/bootstrap3.css">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
<!-- <link rel="stylesheet" href="resources/css/chatbot.css"> -->
<link rel="stylesheet" href="resources/css/datepicker/datapicker.min.css">

<!-- modal css -->
<link rel="stylesheet" href="resources/css/modal.css">

<!-- signin css -->
<link rel="stylesheet" href="resources/css/signin/util.css">
<link rel="stylesheet" href="resources/css/signin/main.css">

<!-- player css -->
<link rel="stylesheet" href="resources/css/playersignuppg1.css">
<link rel="stylesheet" href="resources/css/playersignuppg2.css">
<link rel="stylesheet" href="resources/css/playersignuppg3.css">
<link rel="stylesheet" href="resources/css/playersignuppg4.css">
<link rel="stylesheet" href="resources/css/playersignuppg5.css">
<link rel="stylesheet" href="resources/css/playerupdateinfo.css">
<link rel="stylesheet" href="resources/css/playerupdatepicture.css">

<!-- team css -->
<link rel="stylesheet" href="resources/css/team/teamcreatepg1.css">
<link rel="stylesheet" href="resources/css/team/teamcreatepg2.css">
<link rel="stylesheet" href="resources/css/team/teamcreatepg3.css">
<link rel="stylesheet" href="resources/css/team/teamcreatepg4.css">
<link rel="stylesheet" href="resources/css/team/teamcreatepg5.css">
<link rel="stylesheet" href="resources/css/team/teammanageplayers.css">
<link rel="stylesheet" href="resources/css/team/team_detail_list.css">

</head>
<body>

<div id="content">
	</div>
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content"></div>
		</div>
	</div>
	<div class="modal fade" id="myModal2" tabindex="-1" role="dialog"
		aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div id="modal-content2"></div>
		</div>
	</div>
	<div class="modal fade" id="myModal_tour" tabindex="-1" role="dialog"
		aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div id="modal-content3"></div>
		</div>
</div>

<div id="myMpa">

</div>
	<script src="resources/js/app.js"></script>
	<script src="resources/js/check.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/com/router.js"></script>
	<script src="resources/js/com/myTooltip.js"></script>
	<script src="resources/js/com/sweetalert.min.js"></script>
	<script src="resources/js/com/datapicker.min.js"></script>
	<script src="resources/js/com/datapicker.ko-kr.js"></script>
	<script src="resources/js/com/fileupload.js"></script>
 	<script src="resources/js/signin/signin.js"></script> 

	<script src="resources/js/home/home.js"></script>
	<script src="resources/js/compo/compo.js"></script>
	<script src="resources/js/member/member.js"></script>
	<script src="resources/js/com/util.js"></script>
    <script src="resources/js/vidbg.js"></script>
    <script src="resources/js/home/chat.js"></script>
    
<script>
app.run('<%=application.getContextPath()%>');

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drag2(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) { ev.preventDefault(); 
	var c = ev.dataTransfer.getData("text"); 
	ev.target.appendChild(document.getElementById(c));
} 

/* window.fbAsyncInit = function() {
  FB.init({
    appId      : '359128634725982',
    xfbml      : true,
    version    : 'v3.3'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk')); */
</script>

</body>
</html>