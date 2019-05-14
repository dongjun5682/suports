"use strict";
var home = home || {};

home = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, memberjs, stadiumjs, tournamentjs, teamjs, backjs, msessionjs,chatjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        memberjs = js + '/member/member.js';
        stadiumjs = js + '/stadium/stadium.js';
        tournamentjs = js + '/tournament/tournament.js';
        teamjs = js + '/team/team.js';
        backjs = js + '/backgroundTransition.js';
        msessionjs = js + '/home/membersession.js';
        chatjs = js + '/home/chat.js'
    };
    let onCreate = () => {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(memberjs),
            $.getScript(stadiumjs),
            $.getScript(tournamentjs),
            $.getScript(teamjs),
            $.getScript(backjs),
            $.getScript(msessionjs),
            $.getScript(chatjs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView();
        });
    };
    let setContentView = () => {
    
        $('#content').before(compo.header());
        $('#content').append(compo.content());
        jQuery(function($) {
            $('#home').vidbg({
                'mp4': 'resources/video/Fifa.mp4',
            }, {
                // Options
                muted: true,
                loop: true,
                overlay: true,
            });
        });
        $('#myMpa').after(compo.footer());
        $('#rm_search').append(compo.srch());
        $('#team_search').click(() => {
            $('#position').empty().attr('id', 'people').append(compo.team_search());
        });
        $('#solo_search').click(() => {
            $('#people').empty().attr('id', 'position').append(compo.solo_search());
        });
        home_list();
        $.getScript($.js()+'/compo/compo.js',()=>{
         	$.getScript($.js()+'/home/chat.js',()=>{
         		$(compo.chatbot()).appendTo('#myMpa');	
         		$('#chat_body').hide().after( '<button id="chat_ball" style="margin-left: 1373px;width: 5%;margin-bottom: 40px;"><img src="resources/img/soccer-ball.png" style="width: 101%; margin-left: 127px;"></button>' );
         			  $("#chat_ball").click(function(){
         				  alert('클릭');
         				 $('#chat_body').show();
         				 	chat.chat_bot();
         			  });
         		
          	});
        });
        $('.navbar-right a').click(function(e) {
            let _this = $(this).attr('id');
            switch (_this) {
                case 'login':
                    login();
                    break;
                case 'signup':
                    member.signup();
                    break;
                case 'team':
                    $('#content').css('margin-top', '80px');
                    $('#map').remove();
                    team.onCreate();
                    break;
                case 'tourment':
                    tour.onCreate();
                    break;
                case 'about':
                    $('#content').css('margin-top', '80px');
                    break;
            }
        })
        $('#sear-btn').click(function() {
            /*alert('addr : '+ $('.search-addr').val());
            alert('date : '+ $('.search-date').val());
            alert('time : '+ $('.search-time').val());
            alert('sport : '+ $('.search-sports').val());
            alert('position : '+ $('.search-position').val());*/
            let search = {
                p: 1,
                s: $('.search-addr').val()
            };
            if (search.s === '') {
                let arr = {
                    p: 1
                };
                stadium.list(arr);
            } else {
                stadium.srch(search);
            }
        });
        $('#stadium_list').click(() => {
            $('#content').css('margin-top', '80px');
            let arr = {
                p: 1
            };
            stadium.list(arr);
        })

        //로고 클릭시 새로 그리기
        $('.navbar-brand .logo').click(() => {
        	  $('#map').remove();
        	  $('#content').empty().append(compo.content());
              jQuery(function($){
                  $('#home').vidbg({
                      'mp4': 'resources/video/Fifa.mp4',
                  }, {
                    // Options
                    muted: true,
                    loop: true,
                    overlay: true,
                });
            });
            $('#rm_search').append(compo.srch());
            $('#footer').remove();
            $('#myMpa').after(compo.footer());
            $('#team_search').click(() => {
                $('#position').empty().attr('id', 'people').append(compo.team_search());
            });
            $('#solo_search').click(() => {
                $('#people').empty().attr('id', 'position').append(compo.solo_search());
            });
            home_list();
          /*  $.getScript($.js()+'/compo/compo.js',()=>{
             	$.getScript($.js()+'/home/chat.js',()=>{
             	$(compo.chatbot()).appendTo('#myMpa');	
                chat.init(d);
              	});
                });*/
            $('#sear-btn').click(function() {
                let search = {
                    p: 1,
                    s: ''
                }
                stadium.srch();
            });
            $('#stadium_list').click(() => {
                $('#content').css('margin-top', '80px');
                let arr = {
                    p: 1
                };
                stadium.list(arr);
            })
        
        })
    };

    let home_list = () => {
        let list_stadium_detail = '';
        $.getJSON($.ctx() + '/stadiums', d => {
            $.each(d.home, (i, j) => {
                if (j.areaName == '서울') {
                    if (i < 4) {
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
                            '</div> ').appendTo('.seoul_stadium').click(function() {
                            stadium.list_detail(j);
                        });
                    }
                } else if (j.areaName == '인천') {
                    if (i < 14) {
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
                            '</div> ').appendTo('.Incheon_stadium').click(function() {
                            stadium.list_detail(j);
                        });
                    }
                } else if (j.areaName == '경기') {
                    if (i < 20) {
                        $('<div class="col-md-3 col-sm-6 col-xs-6">' +
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
                            '</div> ').appendTo('.gyeonggi_stadium').click(function() {
                            stadium.list_detail(j);
                        });
                    }
                }
            });
        });
    }

    let login = () => {
        $('.modal-content').html(compo.signin());
        $('.login100-social-item bg1').click(e => {
        });
        $('.login100-form-btn').click(e => {
            e.preventDefault();
            let logindata = {
                id: $('form input[name="username"]').val(),
                password: $('form input[name="pass"]').val()
            };
            $.ajax({
                url: $.ctx()+'/members/'+logindata.id,
                type: 'POST',
                data: JSON.stringify(logindata),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: d => {
                   if (d.state == 'pending') {
                	   swal({
                		   title: "비활성화 계정입니다!",
                		   text: "탈퇴를 위해 비활성화된 계정입니다. 요청일("+d.disableDate+")로 부터 6일 후 계정이 삭제됩니다.",
                		   icon: "warning",
                		   buttons: ["취소","다시 활성화"],
                		   dangerMode: true,
                		 })
                		 .then((willDelete) => {
                		   if (willDelete) {
                				$.ajax({
                					url : $.ctx()+'/members/enable/'+logindata.id,
                					type : 'PUT',
                					data : JSON.stringify(logindata),
                					dataType : 'json',
                					contentType : "application/json; charset=utf-8",
                					success : d => {}
                				})
                			   swal("계정이 다시 활성화 되었습니다.", {
                		       icon: "success",
                		     });
                		   } else {
                		     swal("비활성화 상태가 계속됩니다.");
                		   }
                		 });
                   } else {
                	   $.extend(new MemberSession(d));
                	   member.onCreate(d);                	   
                   }
                },
                error: e => {
                    alert('ajax fail');
                }
            })
            $('#myModal').modal('hide');
        });
        $('#signupBtn_in_signin').click(() => {
            member.signup();
        })
    }
    return {
        onCreate: onCreate,
        home_list: home_list,
        login: login
    };
})();