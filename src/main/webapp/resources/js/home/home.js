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

        $('#content').before(compo.header()).append(compo.content()).after(compo.footer());
        $('#rm_search').append(compo.srch());
        $('#content').css('margin-top', '0');
        $('#team_search').click(() => {
            $('#position').empty().attr('id', 'people').append(compo.team_search());
        });
        $('#solo_search').click(() => {
            $('#people').empty().attr('id', 'position').append(compo.solo_search());
        });
        list();
      
    };

    let list = () => {
        let list_stadium_detail = '';
        let list_stadium_city = '<div id="best_stadium" class="section">' +
            '        <!-- container -->' +
            '        <div class="container">' +
            '            <!-- row -->' +
            '            <div class="row" >' +
            '                <div class="col-md-3">' +
            '                    <div class="section-header">' +
            '                        <h2>Best Stadium</h2>' +
            '                    </div>' +
            '                </div>' +
            '                <div id="courses-wrapper" class="col-md-12">' +
            '                    <!-- row -->' +
            '                    <div class="row">' +
            '                        <!-- single course -->' +
            ' 					<div class="col-md-3 col-sm-6 col-xs-6" id="best_list">' +
            '       				 <div class="course">' +
            '       				     <a href="#" class="course-img"> ' +
            '        				        <img src="resources/img/stadium/stadium_1.jpg" alt=""> ' +
            '         					       <i class="course-link-icon fa fa-link"></i>' +
            '           				 </a>' +
            '          			   <a class="course-title" href="#">PHP Tips, Tricks, and Techniques</a>' +
            '       			     <div class="course-details">' +
            '       				         <span class="course-category">Web Development</span> ' +
            '           				     <span class="course-price course-free">Free</span>' +
            '          		  </div>' +
            '        			</div>' +
            '    			</div>' +
            '                        <!-- /single course -->' +
            '                    </div>' +
            '                    <!-- /row -->' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '        <!-- row -->' +
            '    </div>' +
            '    <!-- container -->';

        
        let city = [{
            txt: 'Seoul Stadium',
            id: 'seoul_stadium'
        }, {
            txt: 'Incheon Stadium',
            id: 'incheon_stadium'
        }, {
            txt: 'Busan Stadium',
            id: 'busan_stadium'
        }]
        let area = ['Sinchon', 'Bupyeong', 'Haeundae', 'Bucheon']


        $.each(city, (i, j) => {
            list_stadium_city += '    <div id="' + j.id + '" class="section">' +
                '        <!-- container -->' +
                '        <div class="container">' +
                '            <!-- row -->' +
                '            <div class="row" >' +
                '                <div class="col-md-3">' +
                '                    <div class="section-header">' +
                '                        <h2>' + j.txt + '</h2>' +
                '                    </div>' +
                '                </div>' +
                '                <div id="courses-wrapper" class="col-md-12">' +
                '                    <!-- row -->' +
                '                    <div class="row">' +
                '                        <!-- single course -->' +
                ' 					<div class="col-md-3 col-sm-6 col-xs-6" id="best_list">' +
                '       				 <div class="course">' +
                '       				     <a href="#" class="course-img"> ' +
                '        				        <img src="resources/img/stadium/stadium_1.jpg" alt=""> ' +
                '         					       <i class="course-link-icon fa fa-link"></i>' +
                '           				 </a>' +
                '          			   <a class="course-title" href="#">PHP Tips, Tricks, and Techniques</a>' +
                '       			     <div class="course-details">' +
                '       				         <span class="course-category">Web Development</span> ' +
                '           				     <span class="course-price course-free">Free</span>' +
                '          		  </div>' +
                '        			</div>' +
                '    			</div>' +
                '                        <!-- /single course -->' +
                '                    </div>' +
                '                    <!-- /row -->' +
                '                </div>' +
                '            </div>' +
                '        </div>' +
                '        <!-- row -->' +
                '    </div>' +
                '    <!-- container -->';
        })
        $('#ev_list').after(list_stadium_city);

        $.each(area, (i, j) => {
            let photo = i + 1;
            list_stadium_detail += '<!-- single course -->' +
                ' <div class="col-md-3 col-sm-6 col-xs-6">' +
                '        <div class="course">' +
                '            <a href="#" class="course-img"> ' +
                '                <img src="resources/img/stadium/stadium_' + photo + '.jpg" alt=""> ' +
                '                <i class="course-link-icon fa fa-link"></i>' +
                '            </a>' +
                '             <a class="course-title" href="#">' + j + '</a>' +
                '            <div class="course-details">' +
                '                <span class="course-category">Reservation</span> ' +
                '                <span class="course-price course-free">Free</span>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '<!-- /single course -->';
        });
        $('#courses-wrapper .row').empty().html(list_stadium_detail);

        $('#busan_stadium').after('<div class="container">' +
            ' <div class="row" >' +
            '<a class="course-title" href="#">더보기(300개 이상)</a></div></div>')

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
        $('#sear-btn').click(() => {
            $('#content').css('margin-top', '80px');
        
            stadium.onCreate();
        })
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
        	  $('#footer').empty().after(compo.footer());
              $('#rm_search').append(compo.srch());
              $('#content').css('margin-top', '0');
              $('#team_search').click(() => {
                  $('#position').empty().attr('id', 'people').append(compo.team_search());
              });
              $('#solo_search').click(() => {
                  $('#people').empty().attr('id', 'position').append(compo.solo_search());
              });
              list();
        })
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
        	alert('test')
            $('.modal-content').html(compo.signup_2());
            $('.textnext').click(() => {
                $('.modal-content').html(compo.signup_3());
                $('.textnext').click(() => {
                    $('.modal-content').html(compo.signup_4());
                    $('.textnext').click(() => {
                        $('.modal-content').html(compo.signup_5());
                        $('.beginbtn').click(() => {
                            $('#myModal').modal('hide');
                        })
                    })
                })
            })
        })
    }
    let signup = () => {
        alert('signup');
        $('.modal-content').html(compo.signup_1());
        $('.fieldbtn').click(() => {
            $('.modal-content').html(compo.signup_2());
            $('.textnext').click(() => {
                $('.modal-content').html(compo.signup_3());
                $('.textnext').click(() => {
                    $('.modal-content').html(compo.signup_4());
                    $('.textnext').click(() => {
                        $('.modal-content').html(compo.signup_5());
                        $('.beginbtn').click(() => {
                            $('#myModal').modal('hide');
                        })
                    })
                })
            })
        })
    }
    return {
        onCreate: onCreate,
        list: list,
        login: login
    };


})();