var stadium = stadium || {}


stadium = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, memberjs, msessionjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        homejs = js + '/home/home.js';
        msessionjs = js + '/home/membersession.js'
        chatjs = js + '/home/chat.js'
    };
    let onCreate = (d) => {

        init();
        $.when(
            $.getScript(compojs),
            $.getScript(homejs),
            $.getScript(memberjs),

            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView(d);
        });
    };

    let setContentView = () => {
        let arr = {
            p: 1
        };
        list(arr);
    }
    let list = (x) => {
    	$('#chat_main').remove();
        $('#content').css('margin-top', '80px');
        $('#map').empty();
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#map_button').click(() =>{
            $('#content').empty().html(compo.stadium_list_sidebar());
            $('.col-md-9').append(compo.map());
            var locations = new Array();
            $(document).ready(function initialize(d) {
            	$.getJSON($.ctx() + '/map',d => {
            	$.each(d.map_lo, (i, j) => {
            		let date = new Object();
            		date.name = j.stadiumName;
            		date.addr = j.stadiumAddr;
            		date.latitude = j.latitude;
            		date.hardness = j.hardness;
            		date.photo = j.stadiumPhoto;
            		date.date = j.date;
            		date.time = j.time;
            		locations.push(date);
          });
             	$('#map').css({
                    'width': '100%',
                    'height': '716px'
                    
                });
             	var map = new google.maps.Map(document.getElementById('map'), {
          		    zoom: 12,
          		    center: new google.maps.LatLng(37.549012, 126.988546),
          		    mapTypeId: google.maps.MapTypeId.ROADMAP
          		   });
            $.each(locations,(i,j)=>{
            		
          		   var infowindow = new google.maps.InfoWindow();
          		   var marker,i;
          			 marker = new google.maps.Marker
          			 ({id:i,
          		     position: new google.maps.LatLng(j.latitude,j.hardness), 
          		     map: map
          		     });
          		    
          		     google.maps.event.addListener(marker, 'click', (function(marker, i) {
          		       return function() {
          		    	   infowindow.setContent('<div class="map_se">'
          		        		 				+'<h3>' + j.name +'</h3>'
          		        		 				+ '<p>' + j.addr +'</p>'
          		        		 				+ '<img src="' + j.photo +'">' 
          		        		 				+ '<p>디테일을 보시려면 더블클릭 하세요.</p>'
          		        		 				+ '<a id="map_select" style="font-size: 26px;">Go to Stadium</a></div>');
          		         					infowindow.open(map, marker);
          		         					$('#map_select').click(function(e){
          		         						let arr={stadiumName:j.name,stadiumAddr:j.addr,stadiumPhoto:j.photo,date:j.date,time:j.time,latitude:j.latitude,hardness:j.hardness};
          		         						$('#chat_main').remove();
          		         						list_field_position(arr);
          		         					});
          		       		}
          		     })(marker, i));
          		     {if(marker)
          		       marker.addListener('click', function() {
          		         map.setZoom(15);
          		         map.setCenter(this.getPosition());
          		       });
          		       };
            });
        });
        });
     });       
        $('#search').on('keydown',function(event){
    	    if(event.keyCode ==13){
    	    $('#area_srch').click();
    	    }
    	    });
        $('#area_srch').on('click', () => {
            let search = $('#search').val();
            if (search === '') {
                alert('검색어를 입력하십시오');
            } else {
                let arr = {
                    p: '1',
                    s: search,
                    t:$('#recipient-time').val(),
                    d:$('#recipient-date').val()
                };
                srch(arr);
            }
        });
        $(document).ready(function() {
            $("#selectBox").on("change", function() {
                console.log($(this).find("option[value='" + $(this).val() + "']").text())
                if ($(this).val() == 'inc') {
                	srch_incheon(x);
                } else if ($(this).val() == 'seo') {
                    srch_seoul(x);
                } else if ($(this).val() == 'gy') {
                    srch_gyeonggi(x);
                }
            });
        });

        $.getJSON($.ctx() + '/stadiums/page/' + x.p, d => {
            $('<div id="asearch" class="contianer"></div>').appendTo('.stadium-list');
            $.each(d.ls, (i, j) => {
                $('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                        '  <div class="course">' +
                        '    <a href="#" class="course-img">' +
                        '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                        '      <i class="course-link-icon fa fa-link"></i>' +
                        '    </a>' +
                        '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                        '    <div class="course-time">' +
                        '      <span class="course-time course-free">' + j.time + '</span>' +
                        '    </div>' +
                        '    <div class="course-details">' +
                        '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                        '    </div>' +
                        '    <div class="course-people">' +
                        '      <span class="course-people course-free">' +j.people + '/' + 22 + '</span>' +
                        '    </div>' +
                        '  </div>' +
                        '</div> ')
                    .appendTo('#asearch')
                    .click(function() {
                        $('#map').empty();
                        $('#footer').empty();
                        list_detail(j);
                    });
            });
            let html = '<nav> <ul class="col-md-12 pagination">'
            if (d.pxy.existPrev) {
                html += '<li class="prevBlock"><a href="#">&laquo;</a></li>';
            }
            let i = 0;
            for (i = d.pxy.startPage; i <= d.pxy.endPage; i++) {
                if (x == i) {
                    html += '<li class="active"><a href="#" class="page">' + i + '</a></li>';
                } else {

                    html += '<li><a href="#" class="page">' + i + '</a></li>';
                }
            }
            if (d.pxy.existNext) {
                html += '<li class="nextBlock"><a href="#">&raquo;</a></li>';
            }
            $('.col-md-9').append(html);

            $('.page').each(function() {
                $(this).click(() => {
                	 
                    let arr = {
                        s: x.srch,
                        p: $(this).text()
                    };
                    list(arr);
                });
            });
            $('.nextBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.nextBlock
                };
                list(arr);
            })
            $('.prevBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.prevBlock
                };
                list(arr);
            })
        });
    }
    let list_after = (x) => {
    	$('#chat_main').remove();
    	$('#map').empty();
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#content').css('margin-top','80px');
        $('#map_button').click(() => {
            $('#content').empty().html(compo.stadium_list_sidebar());
            $('.col-md-9').append(compo.map());
            var locations = new Array();
            $(document).ready(function initialize(d) {
            	$.getJSON($.ctx() + '/map',d => {
            	$.each(d.map_lo, (i, j) => {
            		let date = new Object();
            		date.name = j.stadiumName;
            		date.addr = j.stadiumAddr;
            		date.latitude = j.latitude;
            		date.hardness = j.hardness;
            		date.photo = j.stadiumPhoto;
            		date.date = j.date;
            		date.time = j.time;
            		locations.push(date);
          });
             	$('#map').css({
                    'width': '100%',
                    'height': '716px'
                    
                });
             	var map = new google.maps.Map(document.getElementById('map'), {
          		    zoom: 12,
          		    center: new google.maps.LatLng(37.549012, 126.988546),
          		    mapTypeId: google.maps.MapTypeId.ROADMAP
          		   });
            $.each(locations,(i,j)=>{
            		
          		   var infowindow = new google.maps.InfoWindow();
          		   var marker,i;
          			 marker = new google.maps.Marker
          			 ({id:i,
          		     position: new google.maps.LatLng(j.latitude,j.hardness), 
          		     map: map
          		     });
          		    
          		     google.maps.event.addListener(marker, 'click', (function(marker, i) {
          		       return function() {
          		    	   infowindow.setContent('<div class="map_se">'
          		        		 				+'<h3>' + j.name +'</h3>'
          		        		 				+ '<p>' + j.addr +'</p>'
          		        		 				+ '<img src="' + j.photo +'">' 
          		        		 				+ '<p>디테일을 보시려면 더블클릭 하세요.</p>'
          		        		 				+ '<a id="map_select" style="font-size: 26px;">Go to Stadium</a></div>');
          		         					infowindow.open(map, marker);
          		         					$('#map_select').click(function(e){
          		         						let arr={stadiumName:j.name,stadiumAddr:j.addr,stadiumPhoto:j.photo,date:j.date,time:j.time,latitude:j.latitude,hardness:j.hardness};
          		         						$('#chat_main').remove();
          		         						list_field_position(arr);
          		         					});
          		       		}
          		     })(marker, i));
          		     {if(marker)
          		       marker.addListener('click', function() {
          		         map.setZoom(15);
          		         map.setCenter(this.getPosition());
          		       });
          		       };
            });
        });
        });
        });
        $('#search').on('keydown',function(event){
    	    if(event.keyCode ==13){
    	    $('#area_srch').click();
    	    }
    	    });
        $('#area_srch').on('click', () => {
            let search = $('#search').val();
            if ($.fn.nullChecker(search)) {
                alert('검색어를 입력하십시오');
            } else {
                let arr = {
                    p: '1',
                    s: search,
                    t:$('#recipient-time').val(),
                    d:$('#recipient-date').val()
                };
                srch_after(arr);
            }
        });
        $(document).ready(function() {
            $("#selectBox").on("change", function() {
                console.log($(this).find("option[value='" + $(this).val() + "']").text())
                if ($(this).val() == 'inc') {
                	srch_incheon(x);
                } else if ($(this).val() == 'seo') {
                    srch_seoul(x);
                } else if ($(this).val() == 'gy') {
                    srch_gyeonggi(x);
                }
            });
        });
        $.getJSON($.ctx() + '/stadiums/page/' + x.p, d => {
            $('<div id="asearch" class="contianer"></div>').appendTo('.stadium-list');
            $.each(d.ls, (i, j) => {
            	$('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                        '  <div class="course">' +
                        '    <a href="#" class="course-img">' +
                        '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                        '      <i class="course-link-icon fa fa-link"></i>' +
                        '    </a>' +
                        '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                        '    <div class="course-time">' +
                        '      <span class="course-time course-free">' + j.time + '</span>' +
                        '    </div>' +
                        '    <div class="course-details">' +
                        '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                        '    </div>' +
                        '    <div class="course-people">' +
                        '      <span class="course-people course-free">'+j.people+ '/' + 22 + '</span>' +
                        '    </div>' +
                        '  </div>' +
                        '</div> ')
                    .appendTo('#asearch')
                    .click(function() {
                        $('#map').empty();
                        $('#footer').empty();
                        list_detail_after(j);
                    });
            });
            let html = '<nav> <ul class="col-md-12 pagination">'
            if (d.pxy.existPrev) {
                html += '<li class="prevBlock"><a href="#">&laquo;</a></li>';
            }
            let i = 0;
            for (i = d.pxy.startPage; i <= d.pxy.endPage; i++) {
                if (x == i) {
                    html += '<li class="active"><a href="#" class="page">' + i + '</a></li>';
                } else {

                    html += '<li><a href="#" class="page">' + i + '</a></li>';
                }
            }
            if (d.pxy.existNext) {
                html += '<li class="nextBlock"><a href="#">&raquo;</a></li>';
            }
            $('.col-md-9').append(html);

            $('.page').each(function() {
                $(this).click(() => {
                    let arr = {
                        s: x.srch,
                        p: $(this).text()
                    };
                    list_after(arr);
                });
            });
            $('.nextBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.nextBlock
                };
                list_after(arr);
            })
            $('.prevBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.prevBlock
                };
                list_after(arr);
            })

        });

    }


    let list_detail = (j) => {
        $('#chat_main').remove();
    	$('#content').html(compo.stadium_list_detail(j));
        let html = '<div class="a-team" id="roster_100"  ondrop="drop(event)" ondragover="allowDrop(event)"> ' +
            '<img class="posimage" src="resources/img/football.png" draggable="false" ondragstart="drag(event)" id="roster_ball" width="75" height="75"> ' +
            '</div> ' +
            '<div class="a-team" id="GK_10" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 80px;position: absolute; margin-top: 180px;"></div>' +
            '<div class="a-team" id="DF_9" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;"></div>' +
            '<div class="a-team" id="DF_8" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;margin-top:130px"></div>' +
            '<div class="a-team" id="DF_7" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;margin-top:240px"></div>' +
            '<div class="a-team" id="DF_6" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;margin-top:360px"></div>' +
            '<div class="a-team" id="MF_5" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;margin-top:320px"></div>' +
            '<div class="a-team" id="MF_4" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;margin-top:180px"></div>' +
            '<div class="a-team" id="MF_3" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;margin-top:50px"></div>' +
            '<div class="a-team" id="FW_2" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;margin-top:350px"></div>' +
            '<div class="a-team" id="FW_1" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;margin-top:180px"></div>' +
            '<div class="a-team" id="FW_0" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;"></div>' +
            '<div class="b-team" id="FW_11" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 670px;position: absolute;"></div>' +
            '<div class="b-team" id="FW_12" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 670px;position: absolute;margin-top:180px;"></div>' +
            '<div class="b-team" id="FW_13" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 675px;position: absolute;margin-top:350px"></div>' +
            '<div class="b-team" id="MF_14" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 760px;position: absolute;margin-top:100px;"></div>' +
            '<div class="b-team" id="MF_15" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 760px;position: absolute;margin-top:270px;"></div>' +
            '<div class="b-team" id="MF_16" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 850px;position: absolute;margin-top:190px;"></div>' +
            '<div class="b-team" id="DF_17" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 935px;position: absolute;"></div>' +
            '<div class="b-team" id="DF_18" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 935px;position: absolute;margin-top:130px;"></div>' +
            '<div class="b-team" id="DF_19" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 935px;position: absolute;margin-top:240px;"></div>' +
            '<div class="b-team" id="DF_20" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 935px;position: absolute;margin-top:350px;"></div>' +
            '<div class="b-team" id="GK_21" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 1100px;position: absolute;margin-top: 180px;"></div>';

        $('#sta_photo').css({
            'background-image': 'url(resources/img/field.png)',
            'width': '100%',
            'margin-top': '110px',
            'height': '720px'
        }).html(html);
        $.getJSON($.ctx() + '/game/position/' + j.timeIndex, d => {
            $.each(d.position, (i, j) => {
                if (j.position === 'FW_' + i && j.memberIndex != null) {
                    $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="75px" height="75px">').appendTo('#FW_' + i);
                    $('#roster_' + i).attr('ondrop', 'drag(event)');
                } else if (j.position === 'MF_' + i && j.memberIndex != null) {
                    $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="75px" height="75px">').appendTo('#MF_' + i);
                    $('#roster_' + i).attr('ondrop', 'drag(event)');
                } else if (j.position === 'DF_' + i && j.memberIndex != null) {
                    $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="75px" height="75px">').appendTo('#DF_' + i);
                    $('#roster_' + i).attr('ondrop', 'drag(event)');
                } else if (j.position === 'GK_' + i && j.memberIndex != null) {
                    $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="75px" height="75px">').appendTo('#GK_' + i);
                    $('#roster_' + i).attr('ondrop', 'drag(event)');
                }
            });

        });
        $('#footer').css('.section', 'padding-bottom:78px;');
        $('#footer').attr('style', 'position: fixed;left: 0;bottom: 0;width: 100%;background-color: #00A86B;color: white;text-align: center;padding-bottom: 5px;padding-bottom: 34px;-top: 5px;padding-top: 0px;"')
        $('#footer').html('<div class="navbar-brand">' +
            '<div class= col-ms-1>' +
            '<a class="logo" href="index.html" style="margin-right: 1230px;">' +
            '<img src="resources/img/logo/logo.png" alt="logo"></a>' +
            '<button type="button" id="pay_btn_1" class="btn hover2" data-toggle="modal" data-target="#myModal" style="width: 9%;padding: 16px;background-color: #ffffff;margin-bottom: 46px;">' +
            '<span style="color:black">예약하기</span>' +
            '</button>' +
            '</div>'+
            '</div>' +
            '</div>');
        // map 설정 ////
        $(document).ready(function() {
            initMap(j);
        });
        $('#sta_photo').append('		<div class="col-md-4">'
        		+'			<h1> 위치 </h1>'
        		+'			<span>대한민국 '+j.stadiumAddr+'</span>'
        		+'		</div>');
        $('#myMpa').append(compo.map(j));
       
        $('#map').css({
            'height': '480px'
        });
        
        // 예약 확인 버튼
        $('#pay_btn_1').click(() => {
            $('#pay_btn_1').attr({
                'data-target': '#myModal',
                'data-toggle': 'modal'
            });
            $('#content').css('margin-top','0px');
            home.login();
        });
        $('#a-team').click((d) => {
            $('#a-team').attr({
                'data-target': '#myModal',
                'data-toggle': 'modal'
            });
            $('#content').css('margin-top','0px');
            home.login();
        });

    }
    
    let list_field_position = (j) => {
        $('#chat_main').remove();
    	$('#content').html(compo.stadium_list_detail(j));
        
    	$('#sta_photo').append(compo.field_position_form());
    	let fp_members = ''
            +'<div class="field_position_member_1">'
            +'    <div class="fp_img_form">'
            +'        <img src="" alt="Member Name">'
            +'    </div>'
            +'    <div class="fp_name_form">'
            +'        <div class="fp_names"></div>'
            +'    </div>'
            +'    <div class="fp_mark_form">'
            +'        <div class="fp_positions"></div>'	
            +'    </div>'
            +'</div>';
    	$('.field_position_a_team').append(fp_members);
    	
        // map 설정 ////
        $(document).ready(function() {
            initMap(j);
        });
        $('#real_container').append('<div class="col-md-4">'
        		+'			<h1> 위치 </h1>'
        		+'			<span>대한민국 '+j.stadiumAddr+'</span>'
        		+'		</div>');
        $('#myMpa').append(compo.map(j));
       
        $('#map').css({
        	'height': '480px'
        });
    
    }

    let list_detail_after = (j) => {
    	$('#chat_main').remove();
        $('#content').html(compo.stadium_list_detail(j));
        position_map(j);
        $('#footer').css('.section', 'padding-bottom:78px;');
        $('#footer').attr('style', 'position: fixed;left: 0;bottom: 0;width: 100%;background-color: #00A86B;color: white;text-align: center;padding-bottom: 5px;padding-bottom: 34px;-top: 5px;padding-top: 0px;"')
        $('#footer').html('<div class="navbar-brand">' +
            '<div class= col-ms-1>' +
            '<a class="logo" href="index.html" style="margin-right: 1230px;">' +
            '<img src="resources/img/logo/logo.png" alt="logo"></a>' +
            '<button type="button" id="pay_btn_1" class="btn hover2"style="width: 9%;padding: 16px;background-color: #ffffff;margin-bottom: 46px;">' +
            '<span style="color:black">예약하기</span>' +
            '</button>' +
            '</div>' +
            '<div class= col-ms-11>' +
            '</div>' +
            '</div>' +
            '</div>');
        // map 설정 ////
        $(document).ready(function() {
            initMap(j);
        });
        $('#myMpa').append(compo.map(j));
        $('#map').css({
        	'height': '480px'
        });
        $('#sta_photo').append('		<div class="col-md-4 wich">'
        		+'			<h1> 위치 </h1>'
        		+'			<span>대한민국 '+j.stadiumAddr+'</span>'
        		+'		</div>');
        // 예약 확인 버튼
        $('#pay_btn_1').click(() => {
            let position = $('#roster_ball').parent().attr('id');
            let ac_code = 0;
            if (position == 'roster_100') {
            	swal('포지션을 선택해주세요');
            } else {
            	sessionStorage.setItem('posi', $('#roster_ball').parent().attr('id'));
                $('#pay_btn_1').attr({
                    'data-toggle': 'modal',
                    'data-target': '#myModal'
                });
                $('.modal-content').css({
                    'border-radius': '6px',
                    'padding': '20px',
                    'margin-top': '160px',
                    'border': '5px solid #468044'
                }).html(compo.pay_btn(j));
                $('.btn-primary').css({
                    'background-color': '#116441',
                    'border-color': '#116441'
                })
                $('#pay_next').click(() => {
                    $('#myModal').modal('hide');
                    $('#footer').remove();
                    $('#content').empty();
                    let arr = {
                        'stadium': j,
                        'posi': sessionStorage.getItem('posi')
                    };
                    payment(arr);
                    $('.col-md-4').remove();
// payment_page(arr);
                });
            }
        });
    }

    let payment = arr => {
        $('#footer').empty();
        $('#myMpa').after(compo.footer());
        $('#map').remove();
        $('#content').empty().html(compo.payment(arr)).css('margin-top', '100px');
        $('<div class="row">'
    		    +'<div class="col-md-12 paybtn">'
    		    +'<button type="button" class="btn btn-primary" id="payment_btn" style="background-color: rgb(17, 100, 65); border-color: rgb(17, 100, 65);">결제 하기</button>'
    		    +'</div>'
    		    +'</div>').appendTo('.payt')
        $('#payment_btn').click(e=> {
			 payment_page(arr);
//        	 $.getJSON($.ctx() + '/reservation/payment/' + arr.stadium.timeIndex + '/' + arr.posi + '/' + $.member().memberIndex+'/'+arr.stadium.stadiumIndex
//              		, d=> {
//              	let message = new Array();
//              	$.each(d.alram,(i,j)=>{
//              		message[i] = j.message;
//              	})
//              	let res = {
//                      'stadium': arr.stadium,
//                      'res': d.res,
//                      'messege' : message
//                  };
//                  payment_reservation(res)
//              })
        })

    }
    let payment_reservation = j => {
        $('#content').empty().html(compo.payment_reservation(j));
        $('#footer').empty();
        position_map_res(j.stadium);
        $('#alramBtn img').attr('src','resources/img/alram_after.png');
        $.each(j.message,(i,j)=>{
        	$('	<li><h2 class="black-text" style="padding: 10px;">'+j+'<h2></li><li class="divider"></li>')
        	.appendTo('.alram_list');
        })
        $('#pay_home').click(() => {
        	$('.logo_login').remove();
        	$('.navbar-right').remove();
        	$('#content').css('margin-top','0px');
            member.login_after();
        });
        $('.resBtn').click(()=>{
        	stadium_res();
        });
        $('.teambtn').click(()=>{
        	let x = {
                    'page': 1
                };
        	team.team_list_after(x);
        })
        
    }
    let srch = x => {
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#content').css('margin-top', '80px');
        $.getJSON($.ctx()+'/stadiums/search/'+x.s+'/'+x.p+'/'+x.d+'/'+x.t, d => {
            $('<div id="asearch" class="contianer"></div>').appendTo('.stadium-list');
            $.each(d.srch, (i, j) => {
            	$('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                        '  <div class="course">' +
                        '    <a href="#" class="course-img">' +
                        '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                        '      <i class="course-link-icon fa fa-link"></i>' +
                        '    </a>' +
                        '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                        '    <div class="course-time">' +
                        '      <span class="course-time course-free">' + j.time + '</span>' +
                        '    </div>' +
                        '    <div class="course-details">' +
                        '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                        '    </div>' +
                        '    <div class="course-people">' +
                        '      <span class="course-people course-free">' + j.people + '/' + 22 + '</span>' +
                        '    </div>' +
                        '  </div>' +
                        '</div> ')
                    .appendTo('#asearch')
                    .click(function() {
                        $('#map').empty();
                        $('#footer').empty();
                        list_detail(j);
                    });
            });
            let html = '<nav> <ul class="col-md-12 pagination">'
            if (d.pxy.existPrev) {
                html += '<li class="prevBlock"><a href="#">&laquo;</a></li>';
            }
            let i = 0;
            for (i = d.pxy.startPage; i <= d.pxy.endPage; i++) {
                if (x == i) {
                    html += '<li class="active"><a href="#" class="page">' + i + '</a></li>';
                } else {

                    html += '<li><a href="#" class="page">' + i + '</a></li>';
                }
            }
            if (d.pxy.existNext) {
                html += '<li class="nextBlock"><a href="#">&raquo;</a></li>';
            }
            $('.col-md-9').append(html);

            $('.page').each(function() {
                $(this).click(() => {
                    let arr = {
                        s: x.s,
                        p: $(this).text(),
                        d: x.d,
                        t: x.t
                    };
                    srch(arr);
                });
            });
            $('.nextBlock').click(function() {
                let arr = {
                    s: x.s,
                    p: d.pxy.nextBlock,
                    d: x.d,
                    t: x.t
                };
                srch(arr);
            })
            $('.prevBlock').click(function() {
                let arr = {
                    s: x.s,
                    p: d.pxy.prevBlock,
                    d: x.d,
                    t: x.t
                };
                srch(arr);
            })
        });
        $('#area_srch').on('click', () => {
            let search = $('#search').val();
            if ($.fn.nullChecker(search)) {
                alert('검색어를 입력하십시오');
            } else {
                let arr = {
                    p: '1',
                    s: search,
                    t:$('#recipient-time').val(),
                    d:$('#recipient-date').val()
                };
                srch(arr);
            }
        });

    };
    let srch_seoul = x => {
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#content').css('margin-top', '80px');
        let url = $.ctx() + '/seoul/search/' + x.s + '/' + x.p;
        $.getJSON(url, d => {
            $('<div id="asearch" class="contianer"></div>').appendTo('.stadium-list');
            $.each(d.srch, (i, j) => {
                $('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                        '  <div class="course">' +
                        '    <a href="#" class="course-img">' +
                        '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                        '      <i class="course-link-icon fa fa-link"></i>' +
                        '    </a>' +
                        '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                        '    <div class="course-details">' +
                        '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                        '    </div>' +
                        '    <div class="course-people">' +
                        '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                        '    </div>' +
                        '  </div>' +
                        '</div> ')
                    .appendTo('#asearch')
                    .click(function() {
                        $('#map').empty();
                        $('#footer').empty();
                        list_detail(j);
                    });
            });
            let html = '<nav> <ul class="col-md-12 pagination">'
            if (d.pxy.existPrev) {
                html += '<li class="prevBlock"><a href="#">&laquo;</a></li>';
            }
            let i = 0;
            for (i = d.pxy.startPage; i <= d.pxy.endPage; i++) {
                if (x == i) {
                    html += '<li class="active"><a href="#" class="page">' + i + '</a></li>';
                } else {

                    html += '<li><a href="#" class="page">' + i + '</a></li>';
                }
            }
            if (d.pxy.existNext) {
                html += '<li class="nextBlock"><a href="#">&raquo;</a></li>';
            }
            $('.col-md-9').append(html);

            $('.page').each(function() {
                $(this).click(() => {
                    let arr = {
                        s: x.srch,
                        p: $(this).text()
                    };
                    srch_seoul(arr);
                });
            });
            $('.nextBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.nextBlock
                };
                srch_seoul(arr);
            })
            $('.prevBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.prevBlock
                };
                srch_seoul(arr);
            })
        });
        $('#area_srch').on('click', () => {
            let search = $('#search').val();
            if ($.fn.nullChecker(search)) {
                alert('검색어를 입력하십시오');
            } else {
                let arr = {
                    p: '1',
                    s: search,
                    t:$('#recipient-time').val(),
                    d:$('#recipient-date').val()
                };
                srch_seoul(arr);
            }
        });
        $(document).ready(function() {
            $("#selectBox").on("change", function() {
                console.log($(this).find("option[value='" + $(this).val() + "']").text())
                if ($(this).val() == 'inc') {
                    srch_incheon(x);
                } else if ($(this).val() == 'seo') {
                    srch_seoul(x);
                } else if ($(this).val() == 'gy') {
                    srch_gyeonggi(x);

                }
            });
        });
    };
    let srch_incheon = x => {
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#content').css('margin-top', '80px');
        let url = $.ctx() + '/incheon/search/' + x.s + '/' + x.p;
        $.getJSON(url, d => {
            $('<div id="asearch" class="contianer"></div>').appendTo('.stadium-list');
            $.each(d.srch, (i, j) => {
                $('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                        '  <div class="course">' +
                        '    <a href="#" class="course-img">' +
                        '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                        '      <i class="course-link-icon fa fa-link"></i>' +
                        '    </a>' +
                        '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                        '    <div class="course-details">' +
                        '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                        '    </div>' +
                        '    <div class="course-people">' +
                        '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                        '    </div>' +
                        '  </div>' +
                        '</div> ')
                    .appendTo('#asearch')
                    .click(function() {
                        $('#map').empty();
                        $('#footer').empty();
                        list_detail(j);
                    });
            });
        });
        $('#area_srch').on('click', () => {
            let search = $('#search').val();
            if ($.fn.nullChecker(search)) {
                alert('검색어를 입력하십시오');
            } else {
                let arr = {
                    p: '1',
                    s: search,
                    t:$('#recipient-time').val(),
                    d:$('#recipient-date').val()
                };
                srch(arr);
            }
        });
        $(document).ready(function() {
            $("#selectBox").on("change", function() {
                console.log($(this).find("option[value='" + $(this).val() + "']").text())
                if ($(this).val() == 'inc') {
                    srch_incheon(x);
                } else if ($(this).val() == 'seo') {
                    srch_seoul(x);
                } else if ($(this).val() == 'gy') {
                    srch_gyeonggi(x);

                }
            });
        });
    };
    let srch_gyeonggi = x => {
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#content').css('margin-top', '80px');
        let url = $.ctx() + '/gyeonggi/search/' + x.s + '/' + x.p;
        $.getJSON(url, d => {
            $('<div id="asearch" class="contianer"></div>').appendTo('.stadium-list');
            $.each(d.srch, (i, j) => {
                $('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                        '  <div class="course">' +
                        '    <a href="#" class="course-img">' +
                        '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                        '      <i class="course-link-icon fa fa-link"></i>' +
                        '    </a>' +
                        '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                        '    <div class="course-details">' +
                        '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                        '    </div>' +
                        '    <div class="course-people">' +
                        '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                        '    </div>' +
                        '  </div>' +
                        '</div> ')
                    .appendTo('#asearch')
                    .click(function() {
                        $('#map').empty();
                        $('#footer').empty();
                        list_detail(j);
                    });
            });
        });
        $('#area_srch').on('click', () => {
            let search = $('#search').val();
            if ($.fn.nullChecker(search)) {
                alert('검색어를 입력하십시오');
            } else {
                let arr = {
                    p: '1',
                    s: search,
                    t:$('#recipient-time').val(),
                    d:$('#recipient-date').val()
                };
                srch(arr);
            }
        });
        $(document).ready(function() {
            $("#selectBox").on("change", function() {
                console.log($(this).find("option[value='" + $(this).val() + "']").text())
                if ($(this).val() == 'inc') {
                    srch_incheon(x);
                } else if ($(this).val() == 'seo') {
                    srch_seoul(x);
                } else if ($(this).val() == 'gy') {
                    srch_gyeonggi(x);

                }
            });
        });
    };

    let srch_after = x => {
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#content').css('margin-top', '80px');
        $.getJSON($.ctx()+'/stadiums/search/'+x.s+'/'+x.p+'/'+x.d+'/'+x.t, d => {
            $('<div id="asearch" class="contianer"></div>').appendTo('.stadium-list');
            $.each(d.srch, (i, j) => {
            	$('<div class="col-md-3 col-sm-6 col-xs-6" >' +
                        '  <div class="course">' +
                        '    <a href="#" class="course-img">' +
                        '      <img src="' + j.stadiumPhoto + '" alt="' + i + '" style="height: 220px;">' +
                        '      <i class="course-link-icon fa fa-link"></i>' +
                        '    </a>' +
                        '    <a class="course-title" href="#">' + j.stadiumName + '</a>' +
                        '    <div class="course-time">' +
                        '      <span class="course-time course-free">' + j.time + '</span>' +
                        '    </div>' +
                        '    <div class="course-details">' +
                        '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                        '    </div>' +
                        '    <div class="course-people">' +
                        '      <span class="course-people course-free">' + j.people + '/' + 22 + '</span>' +
                        '    </div>' +
                        '  </div>' +
                        '</div> ')
                    .appendTo('#asearch')
                    .click(function() {
                        $('#map').empty();
                        $('#footer').empty();
                        list_detail_after(j);
                    });
            });
            let html = '<nav> <ul class="col-md-12 pagination">'
            if (d.pxy.existPrev) {
                html += '<li class="prevBlock"><a href="#">&laquo;</a></li>';
            }
            let i = 0;
            for (i = d.pxy.startPage; i <= d.pxy.endPage; i++) {
                if (x == i) {
                    html += '<li class="active"><a href="#" class="page">' + i + '</a></li>';
                } else {

                    html += '<li><a href="#" class="page">' + i + '</a></li>';
                }
            }
            if (d.pxy.existNext) {
                html += '<li class="nextBlock"><a href="#">&raquo;</a></li>';
            }
            $('.col-md-9').append(html);

            $('.page').each(function() {
                $(this).click(() => {
                    let arr = {
                        s: x.s,
                        p: $(this).text(),
                        d: x.d,
                        t: x.t
                    };
                    srch_after(arr);
                });
            });
            $('.nextBlock').click(function() {
                let arr = {
                    s: x.s,
                    p: d.pxy.nextBlock,
                    d: x.d,
                    t: x.t
                };
                srch_after(arr);
            })
            $('.prevBlock').click(function() {
                let arr = {
                    s: x.s,
                    p: d.pxy.prevBlock,
                    d: x.d,
                    t: x.t
                };
                srch_after(arr);
            })
        });
        $('#area_srch').on('click', () => {
            let search = $('#search').val();
            if ($.fn.nullChecker(search)) {
                alert('검색어를 입력하십시오');
            } else {
                let arr = {
                    p: '1',
                    s: search,
                    t:$('#recipient-time').val(),
                    d:$('#recipient-date').val()
                };
                srch_after(arr);
            }
        });

    };

    function initMap(j) {
        j.latitude = parseFloat(j.latitude);
        j.hardness = parseFloat(j.hardness);
        var uluru = {
            lat: j.latitude,
            lng: j.hardness
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
    let stadium_res =()=>{
    	 $('#content').css('margin-top', '80px');
         $('#content').empty();
         let access = '';
         $('  <div class="container">'
            		+'    <div class="row" style="margin: 20px;">'
              		+'      <div class="col-md-5">'
              		+'        <div class="res_header">'
              		+'          <h2> 결제 예약 목록</h2>'
              		+'        </div>'
              		+'      </div>'
              		+'      <div class="col-md-12 res_list" style="margin-top: 70px;">'
              		+'      </div>'
              		+'    </div>'
              		+'  </div>').appendTo('#content');
         $.getJSON($.ctx()+'/reservation/list/'+$.member().memberIndex,d=>{
        	 $.each(d.res,(i,j)=>{
        		 if(j.accessCode == 0){
        			 access = '결제 예약 대기중 입니다.';
        		 }else{
        			 access = '결제 완료 되었습니다.'
        		 }
        		$('<div class="col-md-4">'
        	              +'          <div class="res_img">'
        	              +'            <img src="'+j.photo+'" style="width: 370px;">'
        	              +'          </div>'
        	              +'        </div>'
        	              +'        <div class="col-md-2" style="margin-top: 30px;">'
        	                +'<h3>'+j.stadiumName+'</h3>'
        	               +' <div class="course-details"> '
        	                   +' <span class="course-date">날짜 : '+j.date+'</span> '
        	                   +' </div>'
        	                   +' <div class="course-details"> '
        	                      +' <span class="course-time">시간 : '+j.time+'</span> '
        	                      +' </div>'
        	                    +' <div class="course-details"> '
        	                      +' <span class="course-res">예약번호 : '+j.resNumber+'</span> '
        	                      +' </div>'
        	                    +' <div class="course-details"> '
        	                      +' <span class="course-resdate">예약날짜 : '+j.resDate+'</span> '
        	                      +' </div>'
        	                    +' <div class="course-details"> '
        	                      +' <span class="course-respeople"> ' +access+ ' </span> '
        	                      +' </div>'
        	              +'        </div>').appendTo('.res_list');
        	 })
        	 if(d.res == ''){
        		 $('<h1>예약된 목록이 없습니다</h1>').appendTo('.res_list');
             }
         })
        
         
    }
    
    let team_stadium_list =()=>{
    	 $('#content').css('margin-top', '80px');
         $('#content').empty();
         $('#footer').css('padding','0px');
         let access = '';
         $('  <div class="container">'
            		+'    <div class="row" style="margin: 20px;">'
              		+'      <div class="col-md-5">'
              		+'        <div class="res_header">'
              		+'          <h2> 팀 경기 목록</h2>'
              		+'        </div>'
              		+'      </div>'
              		+'      <div class="col-md-12 res_list" style="margin-top: 70px;">'
              		+'      </div>'
              		+'    </div>'
              		+'  </div>').appendTo('#content');
         $('<div class="col-md-4">'
	              +'          <div class="res_img">'
	              +'            <img src="https://mblogthumb-phinf.pstatic.net/20150511_147/zuckcorp_1431352794678WGHz1_JPEG/DSC03789.JPG?type=w2" style="width: 370px;">'
	              +'          </div>'
	              +'        </div>'
	              +'        <div class="col-md-2" style="margin-top: 30px;">'
	                +'<h3>서울 시립 창동운동장</h3>'
	               +' <div class="course-details"> '
	                   +' <span class="course-date">날짜 :2019년05월21일</span> '
	                   +' </div>'
	                   +' <div class="course-details"> '
	                      +' <span class="course-time">시간 : 09:00</span> '
	                      +' </div>'
	                    +' <div class="course-details"> '
	                      +' <span class="course-res">예약번호 : 5867364</span> '
	                      +' </div>'
	                    +' <div class="course-details"> '
	                      +' <span class="course-resdate">예약날짜 : 2019년05월10일</span> '
	                      +' </div>'
	              +'        </div>').appendTo('.res_list');
         $('<div class="col-md-4">'
	              +'          <div class="res_img">'
	              +'            <img src="https://iamground.kr/img/facility/soc/6a1a1f9e0fbb994a17f743c412a74ceb/b7c7157ceadc5f8d68658758687c796d.jpg" style="width: 370px;">'
	              +'          </div>'
	              +'        </div>'
	              +'        <div class="col-md-2" style="margin-top: 30px;">'
	                +'<h3>손기정 체육공원 인조잔디 축구장</h3>'
	               +' <div class="course-details"> '
	                   +' <span class="course-date">날짜 :2019년05월24일</span> '
	                   +' </div>'
	                   +' <div class="course-details"> '
	                      +' <span class="course-time">시간 : 09:00</span> '
	                      +' </div>'
	                    +' <div class="course-details"> '
	                      +' <span class="course-res">예약번호 : 4737283</span> '
	                      +' </div>'
	                    +' <div class="course-details"> '
	                      +' <span class="course-resdate">예약날짜 : 2019년05월11일</span> '
	                      +' </div>'
	              +'        </div>').appendTo('.res_list');
         $('<div class="col-md-4">'
	              +'          <div class="res_img">'
	              +'            <img src="http://img.hani.co.kr/imgdb/resize/2018/0525/152713893764_20180525.JPG" style="width: 370px;height:246px;">'
	              +'          </div>'
	              +'        </div>'
	              +'        <div class="col-md-2" style="margin-top: 30px;">'
	                +'<h3>잠실 종합운동장 보조 경기장</h3>'
	               +' <div class="course-details"> '
	                   +' <span class="course-date">날짜 :2019년05월25일</span> '
	                   +' </div>'
	                   +' <div class="course-details"> '
	                      +' <span class="course-time">시간 : 09:00</span> '
	                      +' </div>'
	                    +' <div class="course-details"> '
	                      +' <span class="course-res">예약번호 : 5867384</span> '
	                      +' </div>'
	                    +' <div class="course-details"> '
	                      +' <span class="course-resdate">예약날짜 : 2019년05월09일</span> '
	                      +' </div>'
	              +'        </div>').appendTo('.res_list');
         $('<div class="col-md-4">'
	              +'          <div class="res_img">'
	              +'            <img src="https://iamground.kr/img/facility/soc/6a1a1f9e0fbb994a17f743c412a74ceb/c8e41e67028b4581353601f0f8b1770c.jpg" style="width: 370px;">'
	              +'          </div>'
	              +'        </div>'
	              +'        <div class="col-md-2" style="margin-top: 30px;">'
	                +'<h3>효창 운동장</h3>'
	               +' <div class="course-details"> '
	                   +' <span class="course-date">날짜 :2019년05월30일</span> '
	                   +' </div>'
	                   +' <div class="course-details"> '
	                      +' <span class="course-time">시간 : 09:00</span> '
	                      +' </div>'
	                    +' <div class="course-details"> '
	                      +' <span class="course-res">예약번호 : 3498584</span> '
	                      +' </div>'
	                    +' <div class="course-details"> '
	                      +' <span class="course-resdate">예약날짜 : 2019년05월08일</span> '
	                      +' </div>'
	              +'        </div>').appendTo('.res_list');
    }
    let position_map =(j)=>{
    	 let html = '<div class="a-team" id="roster_100" ondrop="drop(event)" ondragover="allowDrop(event)"> ' +
         '<img class="posimage" src="resources/img/members_photo/' + $.member().photo + '" draggable="true" ondragstart="drag(event)" id="roster_ball" width="75" height="75"> ' +
         '</div> ' +
         '<div class="a-team" id="GK_10" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 80px;position: absolute; margin-top: 180px;"></div>' +
         '<div class="a-team" id="DF_9" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;"></div>' +
         '<div class="a-team" id="DF_8" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;margin-top:130px"></div>' +
         '<div class="a-team" id="DF_7" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;margin-top:240px"></div>' +
         '<div class="a-team" id="DF_6" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;margin-top:360px"></div>' +
         '<div class="a-team" id="MF_5" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;margin-top:320px"></div>' +
         '<div class="a-team" id="MF_4" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;margin-top:180px"></div>' +
         '<div class="a-team" id="MF_3" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;margin-top:50px"></div>' +
         '<div class="a-team" id="FW_2" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;margin-top:350px"></div>' +
         '<div class="a-team" id="FW_1" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;margin-top:180px"></div>' +
         '<div class="a-team" id="FW_0" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;"></div>' +
         '<div class="b-team" id="FW_11" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 670px;position: absolute;"></div>' +
         '<div class="b-team" id="FW_12" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 670px;position: absolute;margin-top:180px;"></div>' +
         '<div class="b-team" id="FW_13" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 675px;position: absolute;margin-top:350px"></div>' +
         '<div class="b-team" id="MF_14" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 760px;position: absolute;margin-top:100px;"></div>' +
         '<div class="b-team" id="MF_15" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 760px;position: absolute;margin-top:270px;"></div>' +
         '<div class="b-team" id="MF_16" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 850px;position: absolute;margin-top:190px;"></div>' +
         '<div class="b-team" id="DF_17" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 935px;position: absolute;"></div>' +
         '<div class="b-team" id="DF_18" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 935px;position: absolute;margin-top:130px;"></div>' +
         '<div class="b-team" id="DF_19" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 935px;position: absolute;margin-top:240px;"></div>' +
         '<div class="b-team" id="DF_20" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 935px;position: absolute;margin-top:350px;"></div>' +
         '<div class="b-team" id="GK_21" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 1100px;position: absolute;margin-top: 180px;"></div>';

     $('#sta_photo').css({
         'background-image': 'url(resources/img/field.png)',
         'width': '100%',
         'margin-top': '110px',
         'height': '720px'
     }).html(html);
     $.getJSON($.ctx() + '/game/position/' + j.timeIndex, d => {
         $.each(d.position, (i, j) => {
             if (j.position === 'FW_' + i && j.memberIndex != null) {
                 $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="75px" height="75px"> ').appendTo('#FW_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             } else if (j.position === 'MF_' + i && j.memberIndex != null) {
                 $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="75px" height="75px"> ').appendTo('#MF_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             } else if (j.position === 'DF_' + i && j.memberIndex != null) {
                 $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="75px" height="75px"> ').appendTo('#DF_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             } else if (j.position === 'GK_' + i && j.memberIndex != null) {
                 $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="75px" height="75px"> ').appendTo('#GK_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             }
             if(j.memberIndex == $.member().memberIndex){
             	$('#footer').empty().removeAttr('style');
             }
         });

     });
    }
    let position_map_res =(j)=>{
    	 let html = '<div class="empty" style="width:50px; height:100px;"> ' +
         '</div> ' +
         '<div class="res_team_a" id="GK_10" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 60px;position: absolute; margin-top: 180px;"></div>' +
         '<div class="res_team_a" id="DF_9" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 180px;position: absolute;"></div>' +
         '<div class="res_team_a" id="DF_8" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 180px;position: absolute;margin-top:130px"></div>' +
         '<div class="res_team_a" id="DF_7" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 180px;position: absolute;margin-top:240px"></div>' +
         '<div class="res_team_a" id="DF_6" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 180px;position: absolute;margin-top:360px"></div>' +
         '<div class="res_team_a" id="MF_5" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 280px;position: absolute;margin-top:320px"></div>' +
         '<div class="res_team_a" id="MF_4" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 280px;position: absolute;margin-top:180px"></div>' +
         '<div class="res_team_a" id="MF_3" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 280px;position: absolute;margin-top:50px"></div>' +
         '<div class="res_team_a" id="FW_2" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 380px;position: absolute;margin-top:350px"></div>' +
         '<div class="res_team_a" id="FW_1" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 380px;position: absolute;margin-top:180px"></div>' +
         '<div class="res_team_a" id="FW_0" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 380px;position: absolute;"></div>' +
         '<div class="res_team_b" id="FW_11" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 520px;position: absolute;"></div>' +
         '<div class="res_team_b" id="FW_12" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 520px;position: absolute;margin-top:180px;"></div>' +
         '<div class="res_team_b" id="FW_13" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 520px;position: absolute;margin-top:350px"></div>' +
         '<div class="res_team_b" id="MF_14" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 600px;position: absolute;margin-top:100px;"></div>' +
         '<div class="res_team_b" id="MF_15" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 600px;position: absolute;margin-top:270px;"></div>' +
         '<div class="res_team_b" id="MF_16" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 650px;position: absolute;margin-top:190px;"></div>' +
         '<div class="res_team_b" id="DF_17" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 720px;position: absolute;"></div>' +
         '<div class="res_team_b" id="DF_18" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 720px;position: absolute;margin-top:130px;"></div>' +
         '<div class="res_team_b" id="DF_19" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 720px;position: absolute;margin-top:240px;"></div>' +
         '<div class="res_team_b" id="DF_20" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 720px;position: absolute;margin-top:350px;"></div>' +
         '<div class="res_team_b" id="GK_21" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 850px;position: absolute;margin-top: 180px;"></div>';

     $('#sta_photo').css({
         'background-image': 'url(resources/img/field_2.png)',
         'width': '94%',
         'margin-top': '110px',
         'height': '640px'
     }).html(html);
     $.getJSON($.ctx() + '/game/position/'+ j.timeIndex, d => {
         $.each(d.position, (i, j) => {
             if (j.position === 'FW_' + i && j.memberIndex != null) {
                 $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="55px" height="55px"> ').appendTo('#FW_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             } else if (j.position === 'MF_' + i && j.memberIndex != null) {
                 $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="55px" height="55px"> ').appendTo('#MF_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             } else if (j.position === 'DF_' + i && j.memberIndex != null) {
                 $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="55px" height="55px"> ').appendTo('#DF_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             } else if (j.position === 'GK_' + i && j.memberIndex != null) {
                 $('<img class="posimage" src="resources/img/members_photo/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="55px" height="55px"> ').appendTo('#GK_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             }
             if(j.memberIndex == $.member().memberIndex){
             	$('#footer').empty().removeAttr('style');
             }
         });

     });
    }
    function sMap() {
        var uluru = {
            lat: 37.549074,
            lng: 126.982150
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
    let payment_page =(arr)=>{
    	IMP.init('imp41361307');
    	IMP.request_pay({
    	    pg : 'html5_inicis', // version 1.1.0부터 지원.
    	    pay_method : 'card',
    	    merchant_uid : 'merchant_' + new Date().getTime(),
    	    name : '주문명:결제테스트',
    	    amount : 100,
    	    buyer_email : 'iamport@siot.do',
    	    buyer_name : '서동준',
    	    buyer_tel : '010-1234-5678',
    	    buyer_addr : '서울특별시 강남구 삼성동',
    	    buyer_postcode : '123-456',
    	}, function(rsp) {
    	    if ( rsp.success ) {
    	        var msg = '결제가 완료되었습니다.';
    	        msg += '고유ID : ' + rsp.imp_uid;
    	        msg += '상점 거래ID : ' + rsp.merchant_uid;
    	        msg += '결제 금액 : ' + rsp.paid_amount;
    	        msg += '카드 승인번호 : ' + rsp.apply_num;
    	    } else {
    	        var msg = '결제에 실패하였습니다.';
    	        msg += '에러내용 : ' + rsp.error_msg;
    	    }
            $.getJSON($.ctx() + '/reservation/payment/' + arr.stadium.timeIndex + '/' + arr.posi + '/' + $.member().memberIndex+'/'+arr.stadium.stadiumIndex
            		, d=> {
            	let message = new Array();
            	$.each(d.alram,(i,j)=>{
            		message[i] = j.message;
            	})
            	let res = {
                    'stadium': arr.stadium,
                    'res': d.res,
                    'messege' : message
                };
                payment_reservation(res)
            })
    	});
		
    }
    return {
        onCreate: onCreate,
        list: list,
        list_detail: list_detail,
        payment: payment,
        payment_reservation: payment_reservation,
        srch: srch,
        list_detail_after: list_detail_after,
        list_after: list_after,
        srch_after: srch_after,
        initMap: initMap,
        srch_seoul: srch_seoul,
        srch_incheon: srch_incheon,
        srch_gyeonggi: srch_gyeonggi,
        stadium_res:stadium_res,
        position_map:position_map,
        position_map_res:position_map_res,
        payment_page:payment_page,
        list_field_position:list_field_position,
        team_stadium_list:team_stadium_list
    }
})();
