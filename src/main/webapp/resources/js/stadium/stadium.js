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
        $('#content').css('margin-top', '80px');
        $('#map').empty();
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#map_button').click(() => {
            $('#content').empty().html(compo.stadium_list_sidebar());
        });
        $('#area_srch').on('click', () => {
            let search = $('#search').val();
            if (search === '') {
                alert('검색어를 입력하십시오');
            } else {
                let arr = {
                    p: '1',
                    s: search
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
            let html = '<nav> <ul class="col-md-12 pagination" style="margin-left:500px;">'
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
        $('#map').empty();
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#map_button').click(() => {
            $('#content').empty().html(compo.stadium_list_sidebar());
        });
        $('#area_srch').on('click', () => {
            alert('검색 클릭')
            let search = $('#search').val();
            if ($.fn.nullChecker(search)) {
                alert('검색어를 입력하십시오');
            } else {
                let arr = {
                    p: '1',
                    s: search
                };
                srch_after(arr);
            }
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
                        list_detail_after(j);
                    });
            });
            let html = '<nav> <ul class="col-md-12 pagination" style="margin-left:500px;">'
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


    //드래그앤드랍 업데이트
    let list_detail = (j) => {
        $('#content').html(compo.stadium_list_detail(j));
        let html = '<div class="a-team" id="roster_100"  ondrop="drop(event)" ondragover="allowDrop(event)"> ' +
            '<img src="resources/img/football.png" draggable="false" ondragstart="drag(event)" id="roster_ball" width="50" height="50"> ' +
            '</div> ' +
            '<div class="a-team" id="GK_10" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 80px;position: absolute;bottom: -640px;"></div>' +
            '<div class="a-team" id="DF_9" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;"></div>' +
            '<div class="a-team" id="DF_8" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;bottom: -560px;"></div>' +
            '<div class="a-team" id="DF_7" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;bottom: -730px;"></div>' +
            '<div class="a-team" id="DF_6" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;bottom: -880px;"></div>' +
            '<div class="a-team" id="MF_5" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -450px;"></div>' +
            '<div class="a-team" id="MF_4" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -620px;"></div>' +
            '<div class="a-team" id="MF_3" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -800px;"></div>' +
            '<div class="a-team" id="FW_2" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -380px;"></div>' +
            '<div class="a-team" id="FW_1" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -640px;"></div>' +
            '<div class="a-team" id="FW_0" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -860px;"></div>' +
            '<div class="b-team" id="FW_11" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 670px;position: absolute;bottom: -380px;"></div>' +
            '<div class="b-team" id="FW_12" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 660px;position: absolute;bottom: -640px;"></div>' +
            '<div class="b-team" id="FW_13" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 670px;position: absolute;bottom: -900px;"></div>' +
            '<div class="b-team" id="MF_14" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 760px;position: absolute;bottom: -780px;"></div>' +
            '<div class="b-team" id="MF_15" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 760px;position: absolute;bottom: -510px;"></div>' +
            '<div class="b-team" id="MF_16" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 850px;position: absolute;bottom: -640px;"></div>' +
            '<div class="b-team" id="DF_17" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -880px;"></div>' +
            '<div class="b-team" id="DF_18" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -730px;"></div>' +
            '<div class="b-team" id="DF_19" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -560px;"></div>' +
            '<div class="b-team" id="DF_20" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;"></div>' +
            '<div class="b-team" id="GK_21" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 1100px;position: absolute;bottom: -640px;"></div>';

        $('#sta_photo').css({
            'background-image': 'url(resources/img/field.png)',
            'width': '100%',
            'margin-top': '50px',
            'margin-bottom': '100px',
            'height': '930px'
        }).html(html);
        $.getJSON($.ctx() + '/game/position/' + j.stadiumIndex, d => {
            $.each(d.position, (i, j) => {
                if (j.position === 'FW_' + i && j.memberIndex != null) {
                    $('<img src="resources/img/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="50px" height="50px" style="margin-top:15px"> ').appendTo('#FW_' + i);
                    $('#roster_' + i).attr('ondrop', 'drag(event)');
                } else if (j.position === 'MF_' + i && j.memberIndex != null) {
                    $('<img src="resources/img/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="50px" height="50px" style="margin-top:15px"> ').appendTo('#MF_' + i);
                    $('#roster_' + i).attr('ondrop', 'drag(event)');
                } else if (j.position === 'DF_' + i && j.memberIndex != null) {
                    $('<img src="resources/img/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="50px" height="50px" style="margin-top:15px"> ').appendTo('#DF_' + i);
                    $('#roster_' + i).attr('ondrop', 'drag(event)');
                } else if (j.position === 'GK_' + i && j.memberIndex != null) {
                    $('<img src="resources/img/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="50px" height="50px" style="margin-top:15px"> ').appendTo('#GK_' + i);
                    $('#roster_' + i).attr('ondrop', 'drag(event)');
                }
            });

        });
        $('#footer').css('.section', 'padding-bottom:78px;');
        $('#footer').css('.section', 'background-color: #1db91d9e;');
        $('#footer').attr('style', 'position: fixed;left: 0;bottom: 0;width: 100%;background-color: #8cff88;color: white;text-align: center;padding-bottom: 5px;padding-bottom: 34px;-top: 5px;padding-top: 0px;"')
        $('#footer').html('<div class="navbar-brand">' +
            '<div class= col-ms-1>' +
            '<a class="logo" href="index.html">' +
            '<img src="resources/img/logo/logo.png" alt="logo"></a>' +
            '<button type="button" id="pay_btn_1" class="btn hover2" data-toggle="modal" data-target="#myModal" style="width: 35%;padding: 16px;background-color: #ffffff;margin-bottom: 38px;">' +
            '<span style="color:black">예약하기</span>' +
            '</button>' +
            '</div>' +
            '<div class= col-ms-11>' +
            '</div>' +
            '</div>' +
            '</div>');
        //map 설정 ////
        $(document).ready(function() {
            initMap(j);
        });
        $('#myMpa').append(compo.map(j));
        /*$('#myMpa').after('<p style="position: absolute;top: 2577px;right: 80px;">주 소</p>'
        		+'<p style="position: absolute;top: 2601px;right: 80px;font-size: 19px;">' + j.stadiumAddr + '</p>'
        	   +'<p style="position: absolute;top: 2642px;right: 80px;">★★★★★</p>'
        	   +'<p style="position: absolute;top: 2670px;right: 80px;">02-300-8509</p>');*/
        $('#map').css({
            'width': '100%',
            'height': '400px',
            'margin-bottom': '300px'
        });
        //예약 확인 버튼
        $('#pay_btn_1').click(() => {
            alert('로그인을 하시오');
            $('#pay_btn_1').attr({
                'data-target': '#myModal',
                'data-toggle': 'modal'
            });
            home.login();
        });
        $('#a-team').click((d) => {
            alert('로그인을 하시오');
            $('#a-team').attr({
                'data-target': '#myModal',
                'data-toggle': 'modal'
            });
            home.login();
        });

    }

    let list_detail_after = (j) => {
        $('#content').html(compo.stadium_list_detail(j));
        position_map(j);
        $('#footer').css('.section', 'padding-bottom:78px;');
        $('#footer').css('.section', 'background-color: #1db91d9e;');
        $('#footer').attr('style', 'position: fixed;left: 0;bottom: 0;width: 100%;background-color: #8cff88;color: white;text-align: center;padding-bottom: 5px;padding-bottom: 34px;-top: 5px;padding-top: 0px;"')
        $('#footer').html('<div class="navbar-brand">' +
            '<div class= col-ms-1>' +
            '<a class="logo" href="index.html">' +
            '<img src="resources/img/logo/logo.png" alt="logo"></a>' +
            '<button type="button" id="pay_btn_1" class="btn hover2" style="width: 35%;padding: 16px;background-color: #ffffff;margin-bottom: 38px;">' +
            '<span style="color:black">예약하기</span>' +
            '</button>' +
            '</div>' +
            '<div class= col-ms-11>' +
            '</div>' +
            '</div>' +
            '</div>');
        //map 설정 ////
        $(document).ready(function() {
            initMap(j);
        });
        $('#myMpa').append(compo.map(j));
        $('#map').css({
            'width': '100%',
            'height': '400px',
            'margin-bottom': '300px'
        });
        //예약 확인 버튼
        $('#pay_btn_1').click(() => {
            let position = $('#roster_ball').parent().attr('id');
            let ac_code = 0;
            if (position == 'roster_100') {
                alert('포지션을 선택해주세요');
            } else {
            	sessionStorage.setItem('posi', $('#roster_ball').parent().attr('id'));
                $('#pay_btn_1').attr({
                    'data-toggle': 'modal',
                    'data-target': '#myModal'
                });
                $('.modal-content').css({
                    'border-radius': '6px',
                    'padding': '20px',
                    'margin-top': '189px',
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
                });
            }
        });
    }

    let payment = arr => {
        $('#footer').empty();
        $('#map').remove(); // 확인 및 결제 예약 맵 삭제
        $('#content').empty().html(compo.payment(arr)).css('margin-top', '100px');
        $('#payment_reservation').click(() => {
        	// 나중에 유효성 검사 하기
//        	let first_name = $('.name_1').val();
//        	let last_name = $('.name_2').val();
//        	let card_1 = $('.cardnumber_1').val();
//        	let card_2 = $('.cardnumber_2').val();
//        	let card_3 = $('.cardnumber_3').val();
//        	let card_4 = $('.cardnumber_4').val();
//        	let validThru = $('.validThru').val();
//        	let cvv = $('.cvv').val();
//        	let birthday = $('.birthday').val();
        	
            $.getJSON($.ctx() + '/reservation/payment/' + arr.stadium.timeIndex + '/' + arr.posi + '/' + $.member().memberIndex+'/'+arr.stadium.stadiumIndex
            		, d=> {
            	let message = new Array();
            	$.each(d.alram,(i,j)=>{
            		alert(j.message);
            		message[i] = j.message;
            	})
            	let res = {
                    'stadium': arr.stadium,
                    'res': d.res,
                    'messege' : message
                };
                payment_reservation(res)
            })
        })

    }
    let payment_reservation = j => {
        $('#content').empty().html(compo.payment_reservation(j));
        $('#footer').empty();
        position_map(j);
        $('#alramBtn img').attr('src','resources/img/alram_after.png');
        $.each(j.message,(i,j)=>{
        	$('	<li><h2 class="black-text" style="padding: 10px;">'+j+'<h2></li><li class="divider"></li>')
        	.appendTo('.alram_list');
        })
        $('#pay_home').click(() => {
        	$('.logo_login').remove();
        	$('.navbar-right').remove();
            member.login_after();
        });
        $('.resBtn').click(()=>{
        	stadium_res();
        });
        
    }
    let srch = x => {
        $('#footer').empty();
        $('#content').empty().html(compo.stadium_list_sidebar());
        $('#content').css('margin-top', '80px');
        alert('asdasd');
        let url = $.ctx() + '/stadiums/search/' + x.s + '/' + x.p;
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
            let html = '<nav> <ul class="col-md-12 pagination" style="margin-left:400px;">'
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
                    srch(arr);
                });
            });
            $('.nextBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.nextBlock
                };
                srch(arr);
            })
            $('.prevBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.prevBlock
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
                    s: search
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
            let html = '<nav> <ul class="col-md-12 pagination" style="margin-left:400px;">'
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
                    s: search
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
                    s: search
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
                    s: search
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
        let url = $.ctx() + '/stadiums/search/' + x.s + '/' + x.p;
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
                        list_detail_after(j);
                    });
            });
            let html = '<nav> <ul class="col-md-12 pagination" style="margin-left:400px;">'
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
                    srch_after(arr);
                });
            });
            $('.nextBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.nextBlock
                };
                srch_after(arr);
            })
            $('.prevBlock').click(function() {
                let arr = {
                    s: x.srch,
                    p: d.pxy.prevBlock
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
                    s: search
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
         $('#footer').remove();
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
        		$('        <div class="col-md-4">'
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
    let position_map =(j)=>{
    	 let html = '<div class="a-team" id="roster_100" ondrop="drop(event)" ondragover="allowDrop(event)"> ' +
         '<img src="resources/img/' + $.member().photo + '" draggable="true" ondragstart="drag(event)" id="roster_ball" width="50" height="50"> ' +
         '</div> ' +
         '<div class="a-team" id="GK_10" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 100px;position: absolute;bottom: -650px;"></div>' +
         '<div class="a-team" id="DF_9" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;"></div>' +
         '<div class="a-team" id="DF_8" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;bottom: -560px;"></div>' +
         '<div class="a-team" id="DF_7" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;bottom: -730px;"></div>' +
         '<div class="a-team" id="DF_6" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 253px;position: absolute;bottom: -880px;"></div>' +
         '<div class="a-team" id="MF_5" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -450px;"></div>' +
         '<div class="a-team" id="MF_4" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -620px;"></div>' +
         '<div class="a-team" id="MF_3" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 383px;position: absolute;bottom: -800px;"></div>' +
         '<div class="a-team" id="FW_2" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -380px;"></div>' +
         '<div class="a-team" id="FW_1" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -640px;"></div>' +
         '<div class="a-team" id="FW_0" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 515px;position: absolute;bottom: -860px;"></div>' +
         '<div class="b-team" id="FW_11" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 670px;position: absolute;bottom: -380px;"></div>' +
         '<div class="b-team" id="FW_12" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 660px;position: absolute;bottom: -640px;"></div>' +
         '<div class="b-team" id="FW_13" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 670px;position: absolute;bottom: -900px;"></div>' +
         '<div class="b-team" id="MF_14" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 760px;position: absolute;bottom: -780px;"></div>' +
         '<div class="b-team" id="MF_15" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 760px;position: absolute;bottom: -510px;"></div>' +
         '<div class="b-team" id="MF_16" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 850px;position: absolute;bottom: -640px;"></div>' +
         '<div class="b-team" id="DF_17" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -880px;"></div>' +
         '<div class="b-team" id="DF_18" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -730px;"></div>' +
         '<div class="b-team" id="DF_19" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;bottom: -560px;"></div>' +
         '<div class="b-team" id="DF_20" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 974px;position: absolute;"></div>' +
         '<div class="b-team" id="GK_21" ondrop="drop(event)" ondragover="allowDrop(event)" style="margin-left: 1100px;position: absolute;bottom: -640px;"></div>';

     $('#sta_photo').css({
         'background-image': 'url(resources/img/field.png)',
         'width': '100%',
         'margin-top': '50px',
         'margin-bottom': '100px',
         'height': '930px'
     }).html(html);
     $.getJSON($.ctx() + '/game/position/' + j.stadiumIndex, d => {
         $.each(d.position, (i, j) => {
             if (j.position === 'FW_' + i && j.memberIndex != null) {
                 $('<img src="resources/img/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="50px" height="50px" style="margin-top:15px"> ').appendTo('#FW_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             } else if (j.position === 'MF_' + i && j.memberIndex != null) {
                 $('<img src="resources/img/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="50px" height="50px" style="margin-top:15px"> ').appendTo('#MF_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             } else if (j.position === 'DF_' + i && j.memberIndex != null) {
                 $('<img src="resources/img/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="50px" height="50px" style="margin-top:15px"> ').appendTo('#DF_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             } else if (j.position === 'GK_' + i && j.memberIndex != null) {
                 $('<img src="resources/img/' + j.photo + '" draggable="false" id="' + j.memberIndex + '" width="50px" height="50px" style="margin-top:15px"> ').appendTo('#GK_' + i);
                 $('#roster_' + i).attr('ondrop', 'drag(event)');
             }
             if(j.memberIndex == $.member().memberIndex){
             	$('#footer').empty().removeAttr('style');
             }
         });

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
        position_map:position_map
    }
})();