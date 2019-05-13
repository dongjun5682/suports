var team = team || {}

team = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, memberjs, stadiumjs, tournamentjs, homejs;

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
        let x = {
            'page': 1
        };
        team_list(x);
        $('#team_create').click(() => {
            alert('로그인 먼저 해주세요!!');
            $('#team_create').attr({
                'data-target': '#myModal',
                'data-toggle': 'modal'
            });
            home.login();
        })

    }
    let team_list = (x) => {
        $('.team-container .row .col-md-12').empty();
        $('.team-container .row nav').remove();
        $.getJSON($.ctx() + '/teams/page/' + x.page, d => {
            $.each(d.team, (i, j) => {
                $('<div class="col-md-2 col-sm-6 col-xs-6">' +
                    '<div class="course"> <a href="#" class="course-img"> <img src="resources/img/logo/' + j.emblem + '" alt="" style="width:50%;"> </a>' +
                    '<a class="course-title" href="#">' + j.name + '</a> </div>' +
                    '</div>').appendTo('.team-container .row .col-md-12').click(function() {
                    alert("team name : " + j.name + ' team index: ' + j.index);
                    $('#content').html(compo.team_detail_list());
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
                    let arr = {
                        srch: x.srch,
                        page: $(this).text()
                    };
                    team_list(arr);
                });
            });
            $('.nextBlock').click(function() {
                let arr = {
                    srch: x.srch,
                    page: d.pxy.nextBlock
                };
                team_list(arr);
            })
            $('.prevBlock').click(function() {
                let arr = {
                    srch: x.srch,
                    page: d.pxy.prevBlock
                };
                team_list(arr);
            })

        });
    }
    let team_list_after = (x) => {
        $('#content').empty();
        $('#footer').remove();
        alert($.member().teamIndex);
        if ($.member().teamIndex === 0) {
            $('#content').html(compo.team_content());
        } else {
            $('#content').html(compo.no_team_content());
        }
        $('#team_create').click(() => {
            team_create();
        })
        $('.team-container .row .col-md-12').empty();
        $('.team-container .row nav').remove();
        $.getJSON($.ctx() + '/teams/page/' + x.page, d => {
            $.each(d.team, (i, j) => {
                $('<div class="col-md-2 col-sm-6 col-xs-6">' +
                    '<div class="course"> <a href="#" class="course-img"> <img src="resources/img/logo/' + j.emblem + '" alt="" style="width:50%;"> </a>' +
                    '<a class="course-title" href="#">' + j.name + '</a> </div>' +
                    '</div>').appendTo('.team-container .row .col-md-12').click(function() {
                    alert("team name : " + j.name + ' team index: ' + j.index);
                    $('#content').html(compo.team_detail_list());
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
                    let arr = {
                        srch: x.srch,
                        page: $(this).text()
                    };
                    team_list(arr);
                });
            });
            $('.nextBlock').click(function() {
                let arr = {
                    srch: x.srch,
                    page: d.pxy.nextBlock
                };
                team_list(arr);
            })
            $('.prevBlock').click(function() {
                let arr = {
                    srch: x.srch,
                    page: d.pxy.prevBlock
                };
                team_list(arr);
            })

        });
    }

    let team_detail = () => {

    }
    let team_create = () => {
        $('#modal-content2').html(compo.team_create_1());
        $('.fieldbtn').click(() => {
            $('#modal-content2').html(compo.team_create_2());
            $('.textnext').click(() => {
                let formdata = {
                    name: $('input[name="teamName"]').val(),
                    avgage: $('input[name="teamAge"]').val(),
                    sort: $('select[name="teamSort"]').val(),
                    address: $('select[name="teamLocation"]').val(),
                    sport: $('select[name="teamSport"]').val(),
                    style: $('select[name="teamStyle"]').val(),
                    info: $('#teamInfo').val()
                };
                $('#modal-content2').html(compo.team_create_3());
                $('.textnext').click(() => {
                    let formdata2 = {
                        emblem: 'default_emblem.jpg'
                    };
                    $('#modal-content2').html(compo.team_create_4());
                    $('.textnext').click(() => {
                        $('#modal-content2').html(compo.team_create_5());
                        let formdata3 = {
                            name: formdata.name,
                            avgage: formdata.avgage,
                            sort: formdata.sort,
                            captain: $.member().memberIndex,
                            address: formdata.address,
                            sport: formdata.sport,
                            style: formdata.style,
                            info: formdata.info,
                            emblem: formdata2.emblem
                        };
                        alert(formdata3.address + '  ==  ' + formdata3.sport + '  ==  ' + formdata3.info + '  ==  ' + formdata3.emblem + "  ==  " + formdata3.name);
                        $('#team-create-btn').click(() => {
                            $.ajax({
                                url: $.ctx() + '/teams/',
                                type: 'POST',
                                data: JSON.stringify(formdata3),
                                dataType: 'json',
                                contentType: "application/json; charset=utf-8",
                                success: d => {
                                    $('#myModal').modal('hide');
                                },
                                error: e => {
                                    alert('ajax fail');
                                }
                            })
                        })
                    })
                })
            })
        })

    }
    let team_update_frame = () => {
    	$('#footer').remove();
    	$('#content').empty().html(compo.team_update_frame());
    	team_update_info();

        $('#team_members').click(() => {
        	$('#update_mid_content').empty();
        	team_members_list();
        });
        $('#team_add').click(() => {
        	$('#update_mid_content').empty();
        	team_add_memeber();
        });
        $('#team_sub').click(() => {
        	$('#update_mid_content').empty();
        	team_sub_member();
        });
        $('#team_update_info').click(() => {
        	$('#update_mid_content').empty();
        	team_update_info();
        });
        $('#team_update_emblem').click(() => {
        	$('#update_mid_content').empty();
        	team_update_emblem();
        });
        $('#team_trans').click(() => {
        	$('#update_mid_content').empty();
        	team_trans_captain();
        });
        $('#team_diss').click(() => {
        	$('#update_mid_content').empty();
            team_diss_ever();
        });
    }
    let team_members_list = () => {
    	$.getJSON($.ctx()+'/members/page/1', d => {
//        	$.getJSON($.ctx()+'/members/page/'+x.page, d => {
        		let table = '<table class="table table-striped"><tr>'
    				+'<th>No.</th>'
    				+'<th>이름</th>'
    				+'<th>스포츠</th>'
    				+'<th>포지션</th>'
    				+'<th>위치</th>'
    				+'<th> + </th>'
    				+'</tr>'
    			$.each(d.ls, (i,j) => {
        			table += '<tr>'
        	        +'<td>'+j.rnum+'</td>'
        	        +'<td>'+j.name+'</td>'
        	        +'<td>'+j.sports+'</td>'
        	        +'<td>'+j.position+'</td>'
        	        +'<td>'+j.address+'</td>'
        	        +'<td> + 수정 </td>'
        	        +'</tr>'
    			});
        		table += '</table>'
        		$('#update_mid_content').append(table);
        	})
    };
    let team_add_memeber = () => {
    	$('#update_mid_content').append(compo.team_add_memeber());
    }
    let team_sub_member = () => {
    	$('#update_mid_content').append(compo.team_sub_member());
    }
    let team_update_info = () => {
    	$('#update_mid_content').append(compo.team_update_info());
    	$('#team_update_btn').click((e)=>{
        	e.preventDefault();
        	let updateData = {
        			captain : $.member().memberIndex,
    				name : $('input[name="teamName"]').val(),
    				avgage : $('input[name="teamAvgage"]').val(),
    				sort: $('input[name="teamSort"]').val(),
    				style: $('select[name="teamStyle"]').val(),
    				sport : $('select[name="teamSport"]').val(),
    				address : $('select[name="teamLocation"]').val(),
    				emblem : $('select[name="teamEmblem"]').val(),
    				info : $('#teamInfo').val()
    		};
    		$.ajax({
    			url : $.ctx()+'/teams/'+updateData.captain,
    			type : 'PUT',
    			data : JSON.stringify(updateData),
    			dataType : 'json',
    			contentType : "application/json; charset=utf-8",
    			success : d => {
    				alert('팀 정보가 업데이트되었습니다.');
    			},
    			error : e => {
    				alert('ajax fail');
    			}
    		})
    	});
    };
    let team_update_emblem = () => {
    	$('#update_mid_content').append(compo.team_update_emblem());
    };
    let team_trans_captain = () => {
    	
    }
    let team_diss_ever = () => {
    	
    }
    return {
        onCreate: onCreate,
        team_list: team_list,
        team_list_after: team_list_after,
        team_detail: team_detail,
        team_create: team_create,
        team_update_frame: team_update_frame,
        team_members_list:team_members_list,
        team_add_memeber:team_add_memeber,
        team_sub_member:team_sub_member,
        team_update_info:team_update_info,
        team_update_emblem: team_update_emblem,
        team_trans_captain:team_trans_captain,
        team_diss_ever:team_diss_ever
    };

})();