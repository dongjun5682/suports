"use strict";
var home = home || {};

home = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, memberjs, stadiumjs, tournamentjs,teamjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        memberjs = js + '/member/member.js';
        stadiumjs = js + '/stadium/stadium.js';
        tournamentjs = js + '/tournament/tournament.js';
        teamjs = js+'/team/team.js';
        
    };
    let onCreate = () => {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(memberjs),
            $.getScript(stadiumjs),
            $.getScript(tournamentjs),
            $.getScript(teamjs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView();
        });
    };
    let setContentView = () => {
        $('#content').before(compo.header()).append(compo.content());
        $('.map-container').after(compo.footer());
        $('#rm_search').append(compo.srch());
        $('#content').css('margin-top', '0');
        $('#team_search').click(() => {
            $('#position').empty().attr('id', 'people').append(compo.team_search());
        });
        $('#solo_search').click(() => {
            $('#people').empty().attr('id', 'position').append(compo.solo_search());
        });
        home_list();
        $('.navbar-right a').click(function(e) {
            alert('click :' + $(this).attr('id'));
            let _this = $(this).attr('id');
            switch (_this) {
                case 'login':
                    login();
                    break;
                case 'signup':
                    signup();
                    break;
                case 'team':
                    $('#content').css('margin-top', '80px');
                    team.onCreate();
                    break;
                case 'tourment':
                    tour.onCreate();
                    break;
                case 'about':
                    $('#content').css('margin-top', '80px');
                    break;
                default:
                    break;
            }
        })
        $('#sear-btn').click(function(){
        	$.getScript(compojs,()=>{
        		compo.stadium_list_sidebar();
            $('#content').css('margin-top', '80px');
           $.getScript(stadiumjs,()=>{
        	   stadium.onCreate();
           });

        })
        });
        $('#stadium_list').click(() => {
            $('#content').css('margin-top', '80px');
            stadium.onCreate();
        })
        $('.course-img').click(() => {
            $('#content').css('margin-top', '80px');
            stadium.list_detail();
        })
        $('.navbar-brand .logo').click(()=>{
        	  $('#content').empty().append(compo.content());
        	  $('#footer').empty().append(compo.footer()).attr('style','margin');
              $('#rm_search').append(compo.srch());
              $('#content').css('margin-top', '0');
              $('#team_search').click(() => {
                  $('#position').empty().attr('id', 'people').append(compo.team_search());
              });
              $('#solo_search').click(() => {
                  $('#people').empty().attr('id', 'position').append(compo.solo_search());
              });
              home_list();
        })
        
        
        
    };

    let home_list = () => {
        let list_stadium_detail = '';
    	$.getJSON(_+'/stadiums',d=>{
    		$.each(d.home ,(i,j)=>{
    			if(j.areaName == '서울'){
    			$('.seoul_stadium').append('<div class="col-md-3 col-sm-6 col-xs-6" >'
    					+'  <div class="course">'
    					+'    <a href="#" class="course-img">'
    					+'      <img src="'+j.stadiumPhoto+'" alt="'+i+'" style="height: 220px;">'
    					+'      <i class="course-link-icon fa fa-link"></i>'
    					+'    </a>'
    					+'    <a class="course-title" href="#">'+j.stadiumName+'</a>'
    					+'    <div class="course-details">'
    					+'      <span class="course-category">'+j.stadiumInfo+'</span>'
    					+'    </div>'
    					+'    <div class="course-people">'
    					+'      <span class="course-price course-free">'+10+'/'+22+'</span>'
    					+'    </div>'
    					+'  </div>'
    					+'</div> ').click(function(){
    						alert(j.stadiumName);
    					});
    			}else if(j.areaName == '인천'){
    				$('.Incheon_stadium').append('<div class="col-md-3 col-sm-6 col-xs-6" >'
        					+'  <div class="course">'
        					+'    <a href="#" class="course-img">'
        					+'      <img src="'+j.stadiumPhoto+'" alt="'+i+'" style="height: 220px;">'
        					+'      <i class="course-link-icon fa fa-link"></i>'
        					+'    </a>'
        					+'    <a class="course-title" href="#">'+j.stadiumName+'</a>'
        					+'    <div class="course-details">'
        					+'      <span class="course-category">'+j.stadiumInfo+'</span>'
        					+'    </div>'
        					+'    <div class="course-people">'
        					+'      <span class="course-price course-free">'+10+'/'+22+'</span>'
        					+'    </div>'
        					+'  </div>'
        					+'</div> ');
    			}else if(j.areaName == '경기'){
    				$('.gyeonggi_stadium').append('<div class="col-md-3 col-sm-6 col-xs-6">'
        					+'  <div class="course">'
        					+'    <a href="#" class="course-img">'
        					+'      <img src="'+j.stadiumPhoto+'" alt="'+i+'" style="height: 220px;">'
        					+'      <i class="course-link-icon fa fa-link"></i>'
        					+'    </a>'
        					+'    <a class="course-title" href="#">'+j.stadiumName+'</a>'
        					+'    <div class="course-details">'
        					+'      <span class="course-category">'+j.stadiumInfo+'</span>'
        					+'    </div>'
        					+'    <div class="course-people">'
        					+'      <span class="course-price course-free">'+10+'/'+22+'</span>'
        					+'    </div>'
        					+'  </div>'
        					+'</div> ');
    			}
    		});
    	});
    }

    let login = () => {
        $('.modal-content').html(compo.signin());
        $('.login100-form-btn').click(e => {
        	e.preventDefault();
        	let formdata = {
					id : $('form input[name="username"]').val(),
					password : $('form input[name="pass"]').val()
			};
        	$.ajax({
				url : $.ctx()+'/members/'+formdata.id,
				type : 'POST',
				data : JSON.stringify(formdata),
				dataType : 'json',
				contentType : "application/json; charset=utf-8",
				success : d => {
						alert('ajax login : '+d.id);
						member.onCreate(d);
				},
				error : e => {
					alert('ajax fail');
				}
			})
            $('#myModal').modal('hide');
        });
        $('#signupBtn_in_signin').click(() => {
            signup();
        })
    }
    let signup = () => {
        $('.modal-content').html(compo.signup_1());
        $('.fieldbtn').click(()=> {
        	let formdata = {
					id : $('form input[name="memberId"]').val(),
					name : $('form input[name="memberName"]').val(),
					email : $('form input[name="memberEmail"]').val()
			};
            $('.modal-content').html(compo.signup_2());
            $('#datepicker').datepicker({
            	locale: 'ko-kr',
                uiLibrary: 'bootstrap4'
            });
            $('.textnext').click(() => {
              	let formdata2 = {
    					password : $('form input[name="memberPassword"]').val(),
    					birth : $('form input[name="memberBirth"]').val(),
    					address : $('form select[id="memberLocation"]').val(),
    					sports : $('form select[id="memberSports"]').val(),
    					position : $('form select[id="memberPosition"]').val(),
    					phone : $('form input[id="memberPhone"]').val()
    			};
                $('.modal-content').html(compo.signup_3());
                $('.textnext').click(() => {
                  	let formdata3 = {
                  			
        			};
                    $('.modal-content').html(compo.signup_4());
                    $('.textnext').click(() => {
                    	let formdata4 = {
                    			info : $('form input[name="memberInfo"]').val()
            			};
                        $('.modal-content').html(compo.signup_5());
                        let formdata5 = {
                        		id : formdata.id,
                        		password : formdata2.password,
                        		email : formdata.email,
            					name : formdata.name,
            					birth : formdata2.birth,
            					position : formdata2.position,
            					sports : formdata2.sports,
            					address : formdata2.address,
            					phone : formdata2.phone,
            					info : formdata4.info,
            					photo : 'default_profile.jpg'
            			};
                        $('.beginbtn').click(() => {
                        	$.ajax({
                            	url : $.ctx()+'/members/',
                            	type : 'POST',
                            	data : JSON.stringify(formdata5),
                            	dataType : 'json',
                            	contentType : "application/json; charset=utf-8",
                            	success : d => {
                            		alert('ajax signup : '+formdata.id+formdata2.password);
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

    return {
        onCreate: onCreate,
        home_list: home_list,
        login: login
    };


})();