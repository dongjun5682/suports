var stadium = stadium || {}

stadium = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, memberjs,msessionjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        homejs = js+ '/home/home.js';
        msessionjs = js+'/home/membersession.js'
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

    let setContentView = (d) => {
       list(1);
    }
    let list =(x)=> {
    	$('#map').empty();
    	$('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#map_button').click(()=>{
        	alert('지도 클릭');
        	$('#content').empty().html(compo.stadium_list_sidebar());
        });
        $('#area_srch').on('click',()=>{
        	alert('검색 클릭')
			let search = $('#search').val();
			if($.fn.nullChecker(search)){
				alert('검색어를 입력하십시오');
			}else{
				alert('검색중 ');
				let arr = {p:'1', s:search};
				srch(arr);
			}
		});
    	$.getJSON(_+'/stadiums/page/'+x,d=>{
    		$('<div id="asearch" class="row stadium-row"></div>').appendTo('.stadium-list');
	    	$.each(d.ls,(i,j)=>{
	    		$('<div class="col-md-4">'
	  		  			+'    <div class="w3-card" id="content_2"><img src="'+j.stadiumPhoto+'" style="width:208px">'
	  		  			+'      <div class="w3-container">'
	  		  			+'        <h5 style=" margin-top: 25px;">'+j.stadiumName+'</h5>'
	  		  			+'        <h5>'+j.stadiumInfo+'</h5>'
	  		  			+'      </div>'
	  		  			+'    </div>'
	  		  			+'  </div>')
	  		  			.appendTo('#asearch')
	  		  			.click(function() {
	  		  				$('#map').empty();
	  		  				$('#footer').empty();
	  			    		list_detail(j);
	  					});
	    	});
	    	
	    	$('<div style="height: 50px"></div>').appendTo('.col-md-4');
	    	$('<div class="pagination"></div>').appendTo('.col-md-9');
	    	if(d.pxy.existPrev){
	    		$('<li><a>&laquo;</a></li>')
	    		.appendTo('.pagination')
	    		.click(function(){
	    			alert($(this).text());
	    			list(d.pxy.prevBlock);
	    		});
	    	}
	    	let i =0;
	    	for(i=d.pxy.startPage; i<=d.pxy.endPage; i++){
	    		if(d.pxy.pageNum == i){
	    			$('<li><a class="page active">'+i+'</a></li>')
	    			.attr('href',$.ctx()+'/stadiums/page/'+i)
	    			.appendTo('.pagination')
	    			.click(function(){
	    				
	    				alert($(this).text());
	    				list($(this).text());
	    			});
	    		}else{
	    			$('<li><a class="page">'+i+'</a></li>')
	    			.attr('href',$.ctx()+'/stadiums/page/'+i)
	    			.appendTo('.pagination')
	    			.click(function(){
	    				alert($(this).text());
	    				list($(this).text());
	    			});
	    		}
	    	}
    		if(d.pxy.existnext){
    			$('<li><a>&raquo;</a></li>')
    			.appendTo('.pagination')
    			.click(function(){
    				alert($(this).text());
    				list(d.pxy.nextBlock);
    				});
    			};
    			
    	});

    }
    //드래그앤드랍 업데이트
    let list_detail = (j) => {
    	/*function loadElement(){ 
    		if(!storageSupport()){ 
    			return null;  
    		}
    		return window.sessionStorage.getItem('id'); 
    	}*/
    	$('#content').html(compo.stadium_list_detail(j));
    	$('#sta_photo').css({'background-image':'url(resources/img/stadium/field.jpg)','width':'100%','margin-top':'50px','margin-bottom':'100px','height':'947px'})
    			.html('<div id="a-team" ondrop="drop(event)" ondragover="allowDrop(event)"> '
    			+'<img src="resources/img/soccer-ball.png" draggable="true" ondragstart="drag(event)" id="roster_ball" width="72" height="72"> '
    			+'</div> '
    			////왼쪽 팀
    			+'<div id="a-team" class="roster_1" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 159px;position: absolute;bottom: -527px;"></div>'
    			+'<div id="a-team" class="roster_2" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;bottom: -334px;"></div>'
    			+'<div id="a-team" class="roster_3" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 252px;position: absolute;bottom: -441px;"></div>'
    			+'<div id="a-team" class="roster_4" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 252px;position: absolute;bottom: -592px;"></div>'
    			+'<div id="a-team" class="roster_5" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 252px;position: absolute;bottom: -706px;"></div>'
    			+'<div id="a-team" class="roster_6" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;margin-top: -60px;position: absolute;bottom: -380px;"></div>'
    			+'<div id="a-team" class="roster_7" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -527px;"></div>'
    			+'<div id="a-team" class="roster_8" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -675px;"></div>'
    			+'<div id="a-team" class="roster_9" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -380px;"></div>'
    			+'<div id="a-team" class="roster_10" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -527px;"></div>'
    			+'<div id="a-team" class="roster_11" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -675px;"></div>'
    			////오른쪽 팀
    			+'<div id="b-team" class="roster_12" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 703px;position: absolute;bottom: -527px;"></div>'
    			+'<div id="b-team" class="roster_13" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 703px;position: absolute;bottom: -380px;"></div>'
    			+'<div id="b-team" class="roster_14" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 703px;position: absolute;bottom: -675px;"></div>'
    			+'<div id="b-team" class="roster_15" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 804px;position: absolute;bottom: -601px;"></div>'
    			+'<div id="b-team" class="roster_16" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 803px;position: absolute;bottom: -449px;"></div>'
    			+'<div id="b-team" class="roster_17" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 895px;margin-top: -60px;position: absolute;bottom: -524px;"></div>'
    			+'<div id="b-team" class="roster_18" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -706px;"></div>'
    			+'<div id="b-team" class="roster_19" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -592px;"></div>'
    			+'<div id="b-team" class="roster_20" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -441px;"></div>'
    			+'<div id="b-team" class="roster_21" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -334px;"></div>'
    			+'<div id="b-team" class="roster_22" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 1055px;position: absolute;bottom: -527px;"></div>'
    			+'<button type="button" id="roster_save" class="btn hover2" style="bottom: -890px; right: 500px;background-color: white; padding: 16px; width: 6%;position: absolute;">'
    			+'<span>저장</span>'
    			+'</button>')
    		
    	$('#footer').css('.section','padding-bottom:78px;');
    	$('#footer').css('.section','background-color: #1db91d9e;');
    	$('#footer').attr('style','position: fixed;left: 0;bottom: 0;width: 100%;background-color: #8cff88;color: white;text-align: center;padding-bottom: 5px;padding-bottom: 34px;-top: 5px;padding-top: 0px;"')
    	$('#footer').html('<div class="navbar-brand">'
    			+'<div class= col-ms-1>'
    	    	+'<a class="logo" href="index.html">'
    	    	+'<img src="resources/img/logo/logo.png" alt="logo"></a>'
    	    	+'<button type="button" id="pay_btn_1" class="btn hover2" data-toggle="modal" data-target="#myModal" style="width: 32%;padding: 16px;background-color: #337ab7;margin-bottom: 38px;">'
    	    	+'<span style="color:white">예약하기</span>'
    	    	+'</button>'
    	    	+'</div>'
    	    	+'<div class= col-ms-11>'
    	    	+'</div>'
    	    	+'</div>'
    	    	+'</div>');
    	//map 설정 ////
    	
//    	$(document).ready(function() {
//            initMap();
//        });
//     	$('#myMpa').append(compo.map());
     	$('#map').css({'width':'100%','height':'400px','margin-bottom':'300px'});  
    	//예약 확인 버튼
        $('#pay_btn_1').click(()=>{
        	if(sessionStorage.getItem('member')!=null){
        		alert('모달로 확인창 뜨고 결제 예약으로 이동');
        		$('.modal-content').css({'border-radius':'6px','padding': '20px'}).html(compo.pay_btn());
        		$('#pay_next').click((e)=>{
        			alert('결제창 이동');
        			$('#myModal').modal('hide');
        			$('#footer').remove();
        			$('#content').empty();
        			payment();
        		});
        		}else{
        		alert('로그인을 하시오');	
        		$('#pay_btn_1').attr({'data-target':'#myModal','data-toggle':'modal'});
        		home.login();
        		list(1);
        		}
        });
    	$('#roster_save').click(()=>{
			alert('저장 클릭');
			});
    	$('#a-team').click((d)=>{
    		if(sessionStorage.getItem('member')!=null){
    		alert('세션 유지');	
    		}else{
    		alert('로그인을 하시오');	
    		$('#a-team').attr({'data-target':'#myModal','data-toggle':'modal'});
    		home.login();
    		}
		});
    	
    }
    let payment = () => {
    	$('#footer').empty();
    	$('#map').remove();  // 확인 및 결제 예약 맵 삭제
        $('#content').empty().html(compo.payment());
        $('#payment_reservation').click(()=>{
        	payment_reservation();
        })

    }
    let payment_reservation = () => {
        $('#content').empty().html(compo.payment_reservation());
        $('#footer').empty();
    }
    let srch =x=>{
    	$('#map').empty();
    	$('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
    	let url = _+'/stadiums/search/'+ x.s+'/'+x.p;
    	$.getJSON(url,d=>{
    		$('<div id="asearch" class="row stadium-row"></div>').appendTo('.stadium-list');
	    	$.each(d.srch,(i,j)=>{
	    		$('<div class="col-md-4">'
	  		  			+'    <div class="w3-card" id="content_2"><img src="'+j.stadiumPhoto+'" style="width:208px">'
	  		  			+'      <div class="w3-container">'
	  		  			+'        <h5 style=" margin-top: 25px;">'+j.stadiumName+'</h5>'
	  		  			+'        <h5>'+j.stadiumInfo+'</h5>'
	  		  			+'    </div>'
	  		  			+'    </div>'
	  		  			+'  </div>')
	  		  		.appendTo('#asearch')
  		  			.click(function() {
  		  				$('#footer').empty();
  			    		alert(j.stadiumName);
  			    		list_detail(j);
  					});
	    	});
	    	$('<div style="height: 50px"></div>').appendTo('.col-md-4');
	    	$('<div class="pagination"></div>').appendTo('.col-md-9');
	    	
	    	if(d.pxy.existPrev){
				$('<li><a>&laquo;</a></li>')
				.appendTo('.pagination')
				.click(function(){
					let arr = {p:d.pxy.prevBlock, s:x.s};
					srch(arr);
				});
			}
	    	let i =0;
			for(i=d.pxy.startPage; i<=d.pxy.endPage; i++){
				if(d.pxy.pageNum == i){
					$('<li><a class="page active">'+i+'</a></li>')
					.attr('href',$.ctx()+'/stadiums/search/'+i)
					.appendTo('.pagination')
					.click(function(){
						let arr = {p:$(this).text(), s:x.s};
						srch(arr);
					});
				}else{
					$('<li><a class="page">'+i+'</a></li>')
					.attr('href',$.ctx()+'/stadiums/search/'+i)
					.appendTo('.pagination')
					.click(function(){
						let arr = {p:$(this).text(), s:x.s};
						srch(arr);
					});
				  }
				}
				if(d.pxy.existnext){
					$('<li><a>&raquo;</a></li>')
					.appendTo('.pagination')
					.click(function(){
						alert($(this).text());
						let arr = {p:d.pxy.nextBlock, s:x.s};
						srch(arr);
						});
					};
    		});
    	
    	 $('#area_srch').on('click',()=>{
         	alert('검색 클릭')
 			let search = $('#search').val();
 			if($.fn.nullChecker(search)){
 				alert('검색어를 입력하십시오');
 			}else{
 				alert('검색중 ');
 				let arr = {p:'1', s:search};
 				srch(arr);
 			}
 		});
    	
    };
    let login = () => {
    	alert('로그인 진입');
        $('.modal-content').html(compo.signin());
        $('.login100-form-btn').click(e => {
            e.preventDefault();
            let logindata = {
                id: $('form input[name="username"]').val(),
                password: $('form input[name="pass"]').val()
            };
            $.ajax({
                url: $.ctx() + '/members/' + logindata.id,
                type: 'POST',
                data: JSON.stringify(logindata),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: d => {
                    alert('ajax login : ' + d.id);
                    //멤버세션을 사용해서 어디서든 아이디를 호출 가능
                    $.extend(new MemberSession(d));
                    member.onCreate(d);
                },
                error: e => {
                    alert('ajax fail');
                }
            })
            $('#myModal').modal('hide');
        });
        $('#signupBtn_in_signin').click(() => {
            signup();
        })
    }
//    function initMap() {
//        // The location of Uluru
//        var uluru = {lat: 37.552378, lng: 126.937635};
//        // The map, centered at Uluru
//        var map = new google.maps.Map(
//            document.getElementById('map'), {zoom: 15, center: uluru});
//        // The marker, positioned at Uluru
//        var marker = new google.maps.Marker({position: uluru, map: map});
//    }  
    return {
        onCreate: onCreate,
        list:list,
        list_detail: list_detail,
        payment: payment,
        payment_reservation: payment_reservation,
    	srch: srch,
    	login : login}
})();