<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="shortcut icon" href="resources/img/logo/favicon.ico" type="image/x-icon">
<link rel="icon" href="resources/img/logo/favicon.ico" type="image/x-icon">
<title>SUPORTS</title>

<script src='//unpkg.com/popper.js@1/dist/umd/popper.min.js'></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBAQX1xNr1pIAgaFoZIyZXHXw2WnJvlgGY&callback=initMap"></script>
<script src="resources/js/signin/signin.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

<link href="resources/css/fullscreenDemo.css" rel="stylesheet" type="text/css">

<link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet">
<link href="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css" rel="stylesheet">


<!-- default css -->
<link rel="stylesheet" href="resources/css/style.css">
<link rel="stylesheet" href="resources/css/com/myTooltip.css">
<link rel="stylesheet" href="resources/css/com/bootstrap3.css">
<link rel="stylesheet" href="resources/css/font-awesome.min.css">
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
<link rel="stylesheet" href="resources/css/team/teamupdateemblem.css">
<link rel="stylesheet" href="resources/css/team/teamupdateinfo.css">
<link rel="stylesheet" href="resources/css/team/teamupdatepicture.css">

</style>
</head>
<body>
	<div id="content">

	</div>
	<!-- Fullsize Modal -->
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
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/com/router.js"></script>
	<script src="resources/js/com/myTooltip.js"></script>
	<script src="resources/js/com/datapicker.min.js"></script>
	<script src="resources/js/com/datapicker.ko-kr.js"></script>
 	<script src="resources/js/signin/signin.js"></script> 

	<script src="resources/js/home/home.js"></script>
	<script src="resources/js/compo/compo.js"></script>
	<script src="resources/js/member/member.js"></script>
	<script src="resources/js/com/util.js"></script>
    <script src="resources/js/vidbg.js"></script>
    
    <script src="https://unpkg.com/filepond/dist/filepond.js"></script>
    <script src="https://unpkg.com/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.js"></script>
    <script src="https://unpkg.com/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.js"></script>
    <script src="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js"></script>

<script>
FilePond.registerPlugin(
        FilePondPluginImagePreview
);
const pond = FilePond.create(
		{
			allowImagePreview: true,
			imagePreviewMaxHeight: 380,
            allowFileSizeValidation: true,
            maxFileSize: '5MB',
            labelMaxFileSize: '업로드 가능한 사이즈는 {filesize}미만입니다.',
            allowFileTypeValidation: true,
            acceptedFileTypes: ['image/jpeg','image/png'],
            fileValidateTypeLabelExpectedTypes: 'JPG, PNG형식의 파일만 업로드 가능합니다.'
        });
FilePond.setOptions({
	server: {
		url: '/members/uploadImg',
		method: 'POST',
		timeout: 5000,
        process: null,
        load: './load/',
        fetch: './fetch/'
		}
});


app.run('<%=application.getContextPath()%>');

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) { ev.preventDefault(); 
var c = ev.dataTransfer.getData("text"); 
ev.target.appendChild(document.getElementById(c)); } 

</script>
</body>
</html>