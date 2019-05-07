var team = team || {};

team = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, memberjs, stadiumjs, tournamentjs,homejs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        memberjs = js + '/member/member.js';
        stadiumjs = js + '/stadium/stadium.js';
        tournamentjs = js + '/tournament/tournament.js';
        homejs = js + '/home/home.js';
    };
    let onCreate = (d) => {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(memberjs),
            $.getScript(stadiumjs),
            $.getScript(tournamentjs),
            $.getScript(homejs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView(d);
        });
    };
    let setContentView = (d) => {
    	$('#content').empty();
    	$('#footer').remove();
    	$('#content').html(compo.team_content());
    	let x = {'page' : 1};
    	team_list(x);
    	$('#team_create').click(()=>{
    			alert('로그인 먼저 해주세요!!');
    			$('#team_create').attr({'data-target':'#myModal','data-toggle':'modal'});
    			home.login();   			    			
    	})
    	
    }
    let team_list =(x)=>{
    	$('.team-container .row .col-md-12').empty();
    	$('.team-container .row nav').remove();
    	$.getJSON($.ctx()+'/teams/page/'+x.page, d=>{
    		$.each(d.team,(i,j)=>{
    	    	$('<div class="col-md-2 col-sm-6 col-xs-6">'
    	    			+'<div class="course"> <a href="#" class="course-img"> <img src="resources/img/logo/'+j.emblem+'" alt="" style="width:50%;"> </a>' 
    	    			+'<a class="course-title" href="#">'+j.name+'</a> </div>'
    	    			+'</div>').appendTo('.team-container .row .col-md-12').click(function(){
	    		    		alert("team name : "+ j.name+' team index: ' +j.index );
    	    			})
    		});
    		let html = '<nav> <ul class="col-md-12 pagination" style="margin-left:800px;">'
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
                $('.team-container .row .col-md-12').after(html);
                
                $('.page').each(function() {
                    $(this).click(() => {
                 	   let arr = {srch :x.srch,
                 			   	  page :$(this).text()};
                 	   team_list(arr);
                    });
                });
                $('.nextBlock').click(function() {
             	   let arr = {srch :x.srch,
          			   	  page :d.pxy.nextBlock};
             	  team_list(arr);
                })
                $('.prevBlock').click(function() {
             	   let arr = {srch :x.srch,
          			   	  page :d.pxy.prevBlock};
             	  team_list(arr);
                }) 
                
    	});
    }
    let team_list_after =(x)=>{
    	$('#content').empty();
    	$('#footer').remove();
    	alert($.member().teamIndex);
    	if($.member().teamIndex === 0){
    		$('#content').html(compo.team_content());
    	}else{
    		$('#content').html(compo.no_team_content());
    	}
    	$('#team_create').click(()=>{
			team_create();    			    			
    	})
    	$('.team-container .row .col-md-12').empty();
    	$('.team-container .row nav').remove();
    	$.getJSON($.ctx()+'/teams/page/'+x.page, d=>{
    		$.each(d.team,(i,j)=>{
    	    	$('<div class="col-md-2 col-sm-6 col-xs-6">'
    	    			+'<div class="course"> <a href="#" class="course-img"> <img src="resources/img/logo/'+j.emblem+'" alt="" style="width:50%;"> </a>' 
    	    			+'<a class="course-title" href="#">'+j.name+'</a> </div>'
    	    			+'</div>').appendTo('.team-container .row .col-md-12').click(function(){
    	    		    		alert("team name : "+ j.name+' team index: ' +j.index );
    	    			})
    		});
    		let html = '<nav> <ul class="col-md-12 pagination" style="margin-left:800px;">'
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
                $('.team-container .row .col-md-12').after(html);
                
                $('.page').each(function() {
                    $(this).click(() => {
                 	   let arr = {srch :x.srch,
                 			   	  page :$(this).text()};
                 	   team_list(arr);
                    });
                });
                $('.nextBlock').click(function() {
             	   let arr = {srch :x.srch,
          			   	  page :d.pxy.nextBlock};
             	  team_list(arr);
                })
                $('.prevBlock').click(function() {
             	   let arr = {srch :x.srch,
          			   	  page :d.pxy.prevBlock};
             	  team_list(arr);
                }) 
                
    	});
    }
    
    let team_detail =()=>{
    	
    }
    let team_create =()=>{
    	$('#modal-content2').html(compo.team_create_1());
        $('.fieldbtn').click(() => {
            $('#modal-content2').html(compo.team_create_2());
            $('.textnext').click(() => {
            	let formdata = {
    					name : $('input[name="teamName"]').val(),
    					avgage : $('input[name="teamAge"]').val(),
    					sort : $('select[name="teamSort"]').val(),
    					address : $('select[name="teamLocation"]').val(),
    					sport : $('select[name="teamSport"]').val(),
    					style : $('select[name="teamStyle"]').val(),
    					info : $('#teamInfo').val()
    			};
                $('#modal-content2').html(compo.team_create_3());
                $('.textnext').click(() => {
                	let formdata2 = {
                			emblem : 'default_emblem.jpg'
        			};
                    $('#modal-content2').html(compo.team_create_4());
                    $('.textnext').click(() => {
                        $('#modal-content2').html(compo.team_create_5());
                        	let formdata3 = {
                        			name : formdata.name,
                        			avgage : formdata.avgage,
                        			sort : formdata.sort,
                        			captain: $.member().id,
                        			address : formdata.address,
                        			sport : formdata.sport,
                        			style : formdata.style,
                        			info : formdata.info,
                        			emblem : formdata2.emblem
                			};
                        	alert(formdata3.address+'  ==  '+formdata3.sport+'  ==  '+formdata3.info+'  ==  '+formdata3.emblem+"  ==  "+formdata3.name);
                        	 $('#team-create-btn').click(() => {
                            	$.ajax({
                                	url : $.ctx()+'/teams/',
                                	type : 'POST',
                                	data : JSON.stringify(formdata3),
                                	dataType : 'json',
                                	contentType : "application/json; charset=utf-8",
                                	success : d => {
                                		$('#myModal').modal('hide');
                                		},
                                		error : e => {
                                		alert('ajax fail');
                                		}
                                })
                            })
                    })
                })
            })
        })
    	
    }
    let team_update_info =()=>{
    	$('#footer').remove();
    	$('#content').empty().html(compo.team_update_info());
    
    	$('#team_update_info').click(()=>{
    		team_update_info();
    	});
    	$('#team_update_emblem').click(()=>{
    		team_update_emblem();
    	});
    	
    	$('#team_update_photo').click(()=>{
    		team_update_photo();
    	});
    	
    	$('#team_manage').click(()=>{
    		team_manage();
    	});
    	
    }
    let team_update_emblem =()=>{
    	$('#content').empty().html(compo.team_update_emblem());
    }
    let team_update_photo =()=>{
    	$('#content').empty().html(compo.team_update_picture());
    }
    let team_manage =()=>{
    	$('#content').empty().html(compo.team_manage());
    }
    return{onCreate:onCreate,
    	team_list:team_list,
    	team_detail:team_detail
    	,team_create:team_create
    	,team_update_info:team_update_info
    	,team_update_emblem:team_update_emblem
    	,team_update_photo:team_update_photo
    	,team_manage:team_manage
    	,team_list_after:team_list_after};
    
})();
    