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
        	let x = {
                    'page': 1,
                    'teamIndex' : $.member().teamIndex
                };
        	team_members_list(x);
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
    let team_members_list = (x) => {
    	$('#update_mid_content').empty();
        	$.getJSON($.ctx()+'/members/page/'+x.page+'/'+x.teamIndex, d => {
        		let listTitle = '<div class="hsubtitlepg1"><div class="texthtitle">팀 선수 목록</div></div>';
        		
        		let table = compo.member_detail_table();   
        		
    			$.each(d.members, (i,j) => {
    				let memberInfo = {
    					memberIndex : j.memberIndex
    				}
    				table += '<tr>'
        	        +'<td>'+j.rnum+'</td>'
        	        +'<td><a href="#" class="memberDetail" name="'+j.memberIndex+'">'+j.name+'</a></td>'
        	        +'<td>'+j.sports+'</td>'
        	        +'<td>'+j.position+'</td>'
        	        +'<td>'+j.address+'</td>'
        	        +'<td><button type="button" class="memberEdit" name="'+j.memberIndex+'"><i class="far fa-edit"></i></button></td>'
        	        +'</tr>'
    			});
        		table += '</table>'

        		let pageTag = '<ul class="pagination" id="member_List_Paging">';
				
				if(d.pxy.existPrev){
					pageTag += '<li class="prev-item"><a href="#" class="paging">&laquo;</a></li>';
				} else {
					pageTag += '<li class="prev-item"><a href="#">x</a></li>';
				};
				
				let i = 0;
				for(i = d.pxy.startPage; i <= d.pxy.endPage; i++){
					if (d.pxy.pageNum == i){
						pageTag += '<li class="page-item active"><a href="#" class="paging">'+i+'</a></li>';
					} else {
						pageTag += '<li class="page-item"><a href="#" class="paging">'+i+'</a></li>';
					}
				};
				
				if(d.pxy.existNext){
					pageTag += '<li class="next-item"><a href="#" class="paging">&raquo;</a></li>';
				} else {
					pageTag += '<li class="next-item"><a href="#">x</a></li>';
				};
				pageTag += '</ul>'
				
				let middleContent = listTitle + table + pageTag;
				
				$('#update_mid_content').append(middleContent);				
				
				$('.memberDetail').click(function(){
					alert($(this).memberInfo);
        		});
				$('.memberEdit').click(function(){
					team_member_edit($(this).attr('name'));
        		});
				
				$('.page-item')
				.click(function(){
					let x2 = {
						page : $(this).text(),
						teamIndex : $.member().teamIndex
					}
					team_members_list(x2);
				});
				$('.prev-item')
				.click(function(){
					let prev_item = {
							teamIndex : $.member().teamIndex,
							page : d.pxy.prevBlock
						}
					team_members_list(prev_item);
				});
				$('.next-item')
				.click(function(){
					let next_item = {
							teamIndex : $.member().teamIndex,
							page : d.pxy.nextBlock
					}
					team_members_list(next_item);
				});
        	})
    };
    let team_member_detail = (x) => {
    	let member_detail = ''
    		+'<div class="member_detail">'
    		+'    <div id="member_current_photo">'
    		+'        <img src="#" id="member_currnt_img">'
    		+'    </div>'
    		+'    <div class="hsubtitlepg1">이름</div>'
    		+'    <div class="subline">김댕청</div>'
    		+'</div>'
    		$('.modal-content').html(member_detail);
    }
    let team_member_edit = (x) => {
    	alert(x.memberIndex);
    }
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
        team_diss_ever:team_diss_ever,
        team_member_detail:team_member_detail,
        team_member_edit:team_member_edit
    };

})();