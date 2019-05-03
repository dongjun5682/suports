"use strict";
var home = home || {};

home = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, memberjs, stadiumjs, tournamentjs, teamjs,backjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        memberjs = js + '/member/member.js';
        stadiumjs = js + '/stadium/stadium.js';
        tournamentjs = js + '/tournament/tournament.js';
        teamjs = js + '/team/team.js';
        backjs = js+'/backgroundTransition.js';

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
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView();
        });
    };
    let setContentView = () => {
        $('#content').before(compo.header());
        $('#home').after(compo.content());
        $('#myMpa').after(compo.footer());
        $('#rm_search').append(compo.srch());
        $('#content').css('margin-top', '0');
        $('#team_search').click(() => {
            $('#position').empty().attr('id', 'people').append(compo.team_search());
        });
        $('#solo_search').click(() => {
            $('#people').empty().attr('id', 'position').append(compo.solo_search());
        });
        $('#home').css('z-index','0');
        home_list();
        $('.navbar-right a').click(function(e) {
            alert('click :' + $(this).attr('id'));
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
        $('#sear-btn').click(function() {
            $.getScript(compojs, () => {
                compo.stadium_list_sidebar();
                $('#content').css('margin-top', '80px');
                $.getScript(stadiumjs, () => {
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
        $('.navbar-brand .logo').click(() => {
            $('#content').empty();
            $('#footer').empty();
            $('#header').empty();
           onCreate();
        })



    };

    let home_list = () => {
        let list_stadium_detail = '';
        $.getJSON(_ + '/stadiums', d => {
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
                            '      <span class="course-category">' + j.stadiumInfo + '</span>' +
                            '    </div>' +
                            '    <div class="course-people">' +
                            '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                            '    </div>' +
                            '  </div>' +
                            '</div> ').appendTo('.seoul_stadium').click(function() {
                            alert(j.stadiumName);
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
                            '      <span class="course-category">' + j.stadiumInfo + '</span>' +
                            '    </div>' +
                            '    <div class="course-people">' +
                            '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                            '    </div>' +
                            '  </div>' +
                            '</div> ').appendTo('.Incheon_stadium').click(function() {
                            alert(j.stadiumName);
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
                            '      <span class="course-category">' + j.stadiumInfo + '</span>' +
                            '    </div>' +
                            '    <div class="course-people">' +
                            '      <span class="course-price course-free">' + 10 + '/' + 22 + '</span>' +
                            '    </div>' +
                            '  </div>' +
                            '</div> ').appendTo('.gyeonggi_stadium').click(function() {
                            alert(j.stadiumName);
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
                    alert('ajax login : ' + d.id);
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