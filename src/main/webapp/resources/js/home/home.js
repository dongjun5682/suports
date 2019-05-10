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
        $('#content').css('margin-top', '0');
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
        chat.init();
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
        	  $('#myMpa').remove();
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
            $('#content').css('margin-top', '0');
            $('#footer').remove();
            $('#myMpa').after(compo.footer());
            $('#team_search').click(() => {
                $('#position').empty().attr('id', 'people').append(compo.team_search());
            });
            $('#solo_search').click(() => {
                $('#people').empty().attr('id', 'position').append(compo.solo_search());
            });
            home_list();
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
    	/*$('#map').remove();
    	$('#myMpa').remove();*/
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
    return {
        onCreate: onCreate,
        home_list: home_list,
        login: login
    };
})();