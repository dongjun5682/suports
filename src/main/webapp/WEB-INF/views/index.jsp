<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Document</title>
<script src='//unpkg.com/popper.js@1/dist/umd/popper.min.js'></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBAQX1xNr1pIAgaFoZIyZXHXw2WnJvlgGY&callback=initMap"></script>

<!-- <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c3c4beaf10eac4d6d6910770fdc4d4bb"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=APIKEY&libraries=LIBRARY"></script> -->


<link href="resources/css/fullscreenDemo.css" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>


<link rel="stylesheet" href="resources/css/datepicker/datapicker.min.css">
<script src="resources/js/com/datapicker.min.js"></script>
<script src="resources/js/com/datapicker.ko-kr.js"></script>

<!-- default css -->
<link rel="stylesheet" href="resources/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/style.css">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">

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
<link rel="stylesheet" href="resources/css/team/teamupdateemblem.css">
<link rel="stylesheet" href="resources/css/team/teamupdateinfo.css">
<link rel="stylesheet" href="resources/css/team/teamupdatepicture.css">

</head>
<body>
	<div id="content">
	<div id="home" class="hero-area"> ></div>
	</div>
	
	<!-- Fullsize Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content"></div>
		</div>
	</div>
		<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div id="modal-content2"></div>
		</div>
	</div>
		<div class="modal fade" id="myModal_tour" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div id="modal-content3"></div>
		</div>
	</div>
	<div id="myMpa">
	</div>
<script 
	src="<%=application.getContextPath()%>/resources/js/app.js"></script>
<script
	src="<%=application.getContextPath()%>/resources/js/com/router.js"></script>
<script
	src="<%=application.getContextPath()%>/resources/js/home/home.js"></script>
<script
	src="<%=application.getContextPath()%>/resources/js/compo/compo.js"></script>
<script
	src="<%=application.getContextPath()%>/resources/js/member/member.js"></script>	
<script
	src="<%=application.getContextPath()%>/resources/js/bootstrap.min.js"></script>
<script
	src="<%=application.getContextPath()%>/resources/js/com/util.js"></script>
  <script src="resources/js/vidbg.js"></script>
  
<script type="text/javascript">
jQuery(function($){
    $('#home').vidbg({
        'mp4': 'resources/video/Fifa.mp4',
        'poster': 'resources/video/Fifa.jpg',
    }, {
      // Options
      muted: true,
      loop: true,
	  overlay: true,
    });
});
</script>
 <script>
 app.run('<%=application.getContextPath()%>');
</script>
	<script>
	function allowDrop(ev) { ev.preventDefault(); } 
	function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); } 
	function drop(ev) { ev.preventDefault(); 
	var c = ev.dataTransfer.getData("text"); 
	ev.target.appendChild(document.getElementById(c)); } 
	</script>
</body>
</html>