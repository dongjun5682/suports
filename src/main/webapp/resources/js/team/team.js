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
        $(document).ready(function() {
            $('#areateam').on('change', function() {
                let area = $(this).val();
                if (area == '서울') {
                	team_area_srch(area);
                } else if (area == '인천') {
                	team_area_srch(area);
                } else if (area == '경기') {
                	team_area_srch(area);
                }else if (area == '모두보기') {
                	let x = {
                            'page': 1
                        };
                	team_list(x);
                }
            });
        });
    }
    let team_area_srch =(d)=>{
    	$('.team-container .row .col-md-12').empty();
    	 $('.team-container .row nav').remove();
    	$.getJSON($.ctx()+'/teams/'+d,d=>{
    	
    	 $.each(d.team, (i, j) => {
             $('<div class="col-md-2 col-sm-6 col-xs-6">' 
              +'		<div class="course">'
              +'			<a href="#" class="course-img"> <img src="resources/img/logo/' + j.emblem + '" alt="" style="width:50%;"> </a>' 
              +'			<a class="course-title" href="#">' + j.name + '</a>'
              +'		</div>'
              +'</div>')
              .appendTo('.team-container .row .col-md-12').click(function() {
             	 team_detail(j);
             })
         });
    	})
    }
    
    let team_list = (x) => {
        $('.team-container .row .col-md-12').empty();
        $('.team-container .row nav').remove();
        $.getJSON($.ctx() + '/teams/page/' + x.page, d => {
            $.each(d.team, (i, j) => {
                $('<div class="col-md-2 col-sm-6 col-xs-6">' 
                 +'		<div class="course">'
                 +'			<a href="#" class="course-img"> <img src="resources/img/logo/' + j.emblem + '" alt="" style="width:50%;"> </a>' 
                 +'			<a class="course-title" href="#">' + j.name + '</a>'
                 +'		</div>'
                 +'</div>')
                 .appendTo('.team-container .row .col-md-12').click(function() {
                	 team_detail(j);
                })
            });
            let html = '<nav> <ul class="col-md-12 pagination">'
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
        if ($.member().teamIndex == 0) {
            $('#content').html(compo.team_content());
        } else {
            $('#content').html(compo.no_team_content());
        }
        $('#team_create').click(() => {
            team_create();
        })
        $('.team-container .row .col-md-12').empty();
        $('.team-container .row nav').remove();
        $(document).ready(function() {
            $('#areateam').on('change', function() {
                let area = $(this).val();
                if (area == '서울') {
                	team_area_srch(area);
                } else if (area == '인천') {
                	team_area_srch(area);
                } else if (area == '경기') {
                	team_area_srch(area);
                }else if (area == '모두보기') {
                	let x = {
                            'page': 1
                        };
                	team_list(x);
                }
            });
        });
        $.getJSON($.ctx() + '/teams/page/' + x.page, d => {
            $.each(d.team, (i, j) => {
                $('<div class="col-md-2 col-sm-6 col-xs-6">' +
                    '<div class="course"> <a href="#" class="course-img"> <img src="resources/img/logo/' + j.emblem + '" alt="" style="width:50%;"> </a>' +
                    '<a class="course-title" href="#">' + j.name + '</a> </div>' +
                    '</div>').appendTo('.team-container .row .col-md-12').click(function() {
                    team_detail(j);
                })
            });
            let html = '<nav> <ul class="col-md-12 pagination">'
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

    let team_detail = (x) => {
    	$('#footer').remove();
    	$('.team_member_details').remove();
    	$('#content').html(compo.team_detail_page(x));
    	   	
    	let oter_members = ''; 
    	let leader_no = '';
    	
    	$.getJSON($.ctx() + '/members/details/'+x.teamIndex, d => {
    		$.each(d.members, (i,j) => {
    			oter_members += ''
    				+'<div class="row voffset" id="'+j.memberIndex+'">'
    				+'	<div class="list_detail">'
    				+'        <div class="list_detail_form">'
    				+'            <div class="detail_title" name="member_name">이름</div>'
    				+'            <div class="detail_text">'+j.name+'</div>'
    				+'        </div>'
    				+'        <div class="list_detail_form">'
    				+'            <div class="detail_title">포지션</div>'
    				+'            <div class="detail_text">'+j.position+'</div>'
    				+'        </div>'
    				+'        <div class="list_detail_form">'
    				+'            <div class="detail_title">지역</div>'
    				+'            <div class="detail_text">'+j.address+'</div>'
    				+'        </div>'
    				+'        <div class="list_detail_form">'
    				+'            <div class="detail_title">생년월일</div>'
    				+'            <div class="detail_text">'+j.birth+'</div>'
    				+'        </div>'
    				+'	</div>'
    				+'	<div class="list_detail_mem_img">'
    				+'			<img src="resources/img/members_photo/'+j.photo+'" class="img-fluid rounded-circle animated pulse-hvr teamlist_current_img" />'
    				+'	</div>'
    				+'</div>'
    				if(x.captain == j.memberIndex){
    					leader_no = j.memberIndex
    				}
    		})
    		$('.team_member_details').append(compo.team_detail_list());
    		$('.row_sets').append(oter_members);
    		if(x.captain == leader_no){
    			$('div[id="'+leader_no+'"]').attr('class','row leaderset');
    			$('div[id="'+leader_no+'"]').attr('id','leader_no');
    			$('#leader_no div[name="member_name"]').text('팀 장');
    			$('#leader_no div[class="list_detail"]').attr('class','list_detail_leader');
    			$('#leader_no div[class="list_detail_form"]').attr('class','list_detail_leader_form');
    			$('#leader_no img').attr('class','list_leader_img');
    		}	
    	})
    	if(sessionStorage['member']) {
    		if($.member().teamIndex == 0){
	    		
	    		let join_btn = '<div class="mem_team_join">'
	    			+'<button type="button" class="team_join_btn">팀 가입신청</button>'
	    	        +'</div>';
	    	    $('.mem_up_right_content').append(join_btn);
	    	    $('.team_join_btn').click(()=>{;
	    	    	swal({
	    	    		title: '가입요청',
	    	    		text: '팀에 참가하시겠습니까?',
	    	    		icon: 'info',
	    	    		button: '참가!',
	    	    	})
	    	    	.then((join) => {
	    	    		let joinData = {
	    	    				memberIndex : $.member().memberIndex,
	    	    				teamIndex : x.teamIndex,
	    	    				name : $.member().name
	    	    		}
	    	    		$.ajax({
	                        url: $.ctx() + '/member/'+joinData.memberIndex,
	                        type: 'PUT',
	                        data: JSON.stringify(joinData),
	                        dataType: 'json',
	                        contentType: "application/json; charset=utf-8",
	                        success: d => {
	                            swal({
	                            	title: '가입성공',
	                            	icon: 'success',
	                            	button: '확인',
	                            })
	                            team_detail(x);
	                            $('.mem_team_join').remove();
	                        },
	                        error: e => {
	                        	
	                        }
	                    })
	    	    	});
	    	    });
    		}
		} else {
				
		}
    };
    let team_create = () => {
        $('#modal-content2').html(compo.team_create_1());
        $('.fieldbtn').click(() => {
            $('#modal-content2').html(compo.team_create_2());
            $('.team_create_next_btn').click(() => {
                let formdata = {
                    name: $('input[name="teamName"]').val(),
                    avgage: $('select[name="teamAvgage"]').val(),
                    sort: $('select[name="teamSort"]').val(),
                    address: $('select[name="teamLocation"]').val(),
                    sport: $('select[name="teamSport"]').val(),
                    style: $('select[name="teamStyle"]').val(),
                    info: $('#teamInfo').val()
                };
                $('#modal-content2').html(compo.team_create_3());
                emblem_carousel();
                $('.team_create_next_btn').click(() => {
                    let formdata2 = {
                        emblem: $('.carousel-inner div.active').attr('name')
                    };
                    $('#modal-content2').html(compo.team_create_4());
                    $('.team_create_next_btn').click(() => {
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
    	$('#content').html(compo.team_update_frame());
    	team_update_info();

        $('#team_members').click(() => {
        	$('#update_mid_content').empty();
        	let x = {
                    page: 1,
                    teamIndex : $.member().teamIndex
                };
        	team_members_list(x);
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
            team_diss_ever();
        });
    }
    let team_members_list = (x) => {
    	$('#update_mid_content').empty();
        	$.getJSON($.ctx()+'/members/page/'+x.page+'/'+x.teamIndex, d => {
        		let listTitle = '<div class="hsubtitlepg1"><div class="texthtitle">팀 선수 목록</div></div>';
        	
        		let addAMember = compo.team_add_memeber_input();
        		let table = compo.member_detail_table();   
        		
    			$.each(d.members, (i,j) => {
    				table += '<tr>'
        	        +'<td>'+j.rnum+'</td>'
        	        +'<td><button type="button" class="memberDetail" name="'+j.memberIndex+'" data-toggle="modal" data-target="#myModal">'+j.name+'</button></td>'
        	        +'<td>'+j.sports+'</td>'
        	        +'<td>'+j.position+'</td>'
        	        +'<td>'+j.address+'</td>'
        	        +'<td><button type="button" class="memberEdit" name="'+j.memberIndex+'"><i class="far fa-edit"></i></button></td>'
        	        +'</tr>'
    			});
        		table += '</table>'

        		let pagination = '<ul class="pagination" id="member_List_Paging">'
				
				let i = 0;
				for(i = d.pxy.startPage; i <= d.pxy.endPage; i++){
					if (d.pxy.pageNum == i){
						pagination += '<li class="page-item active"><a href="#" class="paging">'+i+'</a></li>';
					} else {
						pagination += '<li class="page-item"><a href="#" class="paging">'+i+'</a></li>';
					}
				};
				pagination += '</ul>'
				
				let middleContent = listTitle + addAMember + table + pagination;
				$('#update_mid_content').append(middleContent);				
				
				$('.memberDetail').click(function(){
					team_member_detail($(this).attr('name'));
        		});
				$('.memberEdit').click(function(){
					team_member_edit($(this).attr('name'));
        		});
				
				$('.page-item').click(function(){
					let xn = {
						page : $(this).text(),
						teamIndex : $.member().teamIndex
					}
					team_members_list(xn);
				});
				$('.add_btn').click(function(){
					$('.modal-content3').empty();
						let incase = '';
					if ($('#search_type_add').val() == 'name') {
						incase = 'name';
					} 
					if ($('#search_type_add').val() == 'email') {
						incase = 'email';
					} 
					if ($('#search_type_add').val() == 'phone') {
						incase = 'phone';
					} 
					let searching = $('#search_words_add').val();
					$.getJSON($.ctx() + '/members/'+incase+'/'+searching, d => {
						let add_member_detail = ''
							+'<div class="member_detail">'
							+'    <div class="member_current_photo">'
							+'        <img src="resources/img/members_photo/'+d.photo+'" class="member_currnt_img">'
							+'    </div>'
							+'    <div class="detail_title">멤버 정보</div>'
							+'    <div class="detail_line">'+d.name+'</div>'
							+'    <div class="detail_line">'+d.email+'</div>'
							+'    <div class="detail_line">'+d.birth+'</div>'
							+'    <div class="detail_line">'+d.address+'</div>'
							+'    <div class="detail_line">'+d.phone+'</div>'
							+'    <div class="detail_line">'+d.state+'</div>'
							+'    <div class="detail_button"><button type="button" class="send_join_req_btn">가입요청</button></div>'
							+'</div>'
							$('.modal-content3').html(add_member_detail);
					})
				});
        	})
    };
    let team_member_detail = (x) => {
    	 $.getJSON($.ctx() + '/members/detail/'+x, d => {
    		 let aMember_detail = ''
 	    		+'<div class="member_detail">'
 	    		+'    <div class="member_current_photo">'
 	    		+'        <img src="resources/img/members_photo/'+d.photo+'" class="member_currnt_img">'
 	    		+'    </div>'
 	    		+'    <div class="detail_title">멤버 정보</div>'
 	    		+'    <div class="detail_line">'+d.name+'</div>'
 	    		+'    <div class="detail_line">'+d.email+'</div>'
 	    		+'    <div class="detail_line">'+d.birth+'</div>'
 	    		+'    <div class="detail_line">'+d.phone+'</div>'
 	    		+'    <div class="detail_line">'+d.state+'</div>'
 	    		+'    <div class="detail_title">About</div>'
 	    		+'    <div class="detail_textarea">'+d.info+'</div>'
 	    		+'</div>'
 	    		$('.modal-content').html(aMember_detail);
    	 })
    }
    let team_member_edit = (x) => {
    	$('#update_mid_content').append(compo.team_member_edit());
    }

    let team_sub_member = () => {
    	$('#update_mid_content').append(compo.team_sub_member());
    	$('.fieldbtn').click(()=>{
    		let subData = {
        			teamIndex : $.member().teamIndex,
    				id : $('input[id="id"]').val()
    		};
    		$.ajax({
    			url : $.ctx()+'/members/'+subData.teamIndex,
    			type : 'PUT',
    			data : JSON.stringify(subData),
    			dataType : 'json',
    			contentType : "application/json; charset=utf-8",
    			success : d => {
    				alert('팀원  방출');
    				member.login_after();
    			},
    			error : e => {
    				alert('ajax fail');
    			}
    		})
    	})
    }
    let team_update_info = () => {
    	$('#update_mid_content').append(compo.team_update_info());
    	$('.upload_btns2').click((e)=>{
        	e.preventDefault();
        	let updateData = {
        			captain : $.member().memberIndex,
    				name : $('input[name="teamName"]').val(),
    				avgage : $('select[name="teamAvgage"]').val(),
    				sort: $('input[name="teamSort"]').val(),
    				style: $('select[name="teamStyle"]').val(),
    				sport : $('select[name="teamSport"]').val(),
    				address : $('select[name="teamLocation"]').val(),
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
    				member.login_after();
    			},
    			error : e => {
    				alert('ajax fail');
    			}
    		})
    	});
    };
    let team_update_emblem = () => {
    	$('#update_mid_content').append(compo.team_update_emblem());
    	emblem_carousel();
    	 $('.upload_btns2').click(() => {
    		 let emb = {
    				 	teamIndex : $.member().teamIndex,
    	                emblem : $('.carousel-inner div.active').attr('name')
    	            };
             $.ajax({
                 url: $.ctx() + '/teams/'+emb.teamIndex,
                 type: 'PUT',
                 data: JSON.stringify(emb),
                 dataType: 'json',
                 contentType: "application/json; charset=utf-8",
                 success: d => {
                     $('#myModal').modal('hide');
                     alert('emblem updated');
                 },
                 error: e => {
                     alert('ajax fail');
                 }
             })
         })
   
    }
   
    let team_diss_ever = () => {
    	swal({
 		   title: "팀 해체!",
 		   text: "주의: 팀 해체를 하시면 모든 팀원들이 팀 귀속에서 해제되고 별도의 알림이 가지 않습니다.",
 		   icon: "warning",
 		   buttons: ["취소","해체 결정"],
 		   dangerMode: true,
 		 })
 		 .then((willDelete) => {
 		   if (willDelete) {
 			   let dissData = {
 					   teamIndex : $.member().teamIndex
 			   }
 				$.ajax({
 					url : $.ctx()+'/teams/dissolve/'+dissData.teamIndex,
 					type : 'PUT',
 					data : JSON.stringify(dissData),
 					dataType : 'json',
 					contentType : "application/json; charset=utf-8",
 					success : d => {
 						swal("팀이 정상적으로 해체되었습니다. 업데이트를 위해 로그아웃 됩니다.", {
 			 		       icon: "info",
 			 		       button: false
 			 		     });
 						sessionStorage.removeItem("member"); 
 		            	window.location.reload();
 					}
 				})
 		   } else {
 		     swal("팀이 유지됩니다.");
 		   }
 		 });
    }
    let emblem_carousel = () => {
    	$(document).ready(function(){
    		  // Activate the Carousel. Pause it when you move the mouse over
				// it
    		  $("#emblemCarousel").carousel({interval: false, pause: "hover"});
    		        
    		  // Enable Carousel Indicators
    		  $(".item1").click(function(){
    		    $("#emblemCarousel").carousel(0);
    		  });
    		  $(".item2").click(function(){
    		    $("#emblemCarousel").carousel(1);
    		  });
    		  $(".item3").click(function(){
    		    $("#emblemCarousel").carousel(2);
    		  });
    		  $(".item4").click(function(){
    			  $("#emblemCarousel").carousel(3);
    		  });
    		  $(".item5").click(function(){
    			  $("#emblemCarousel").carousel(4);
    		  });
    		  $(".item6").click(function(){
    			  $("#emblemCarousel").carousel(5);
    		  });
    		  $(".item7").click(function(){
    			  $("#emblemCarousel").carousel(6);
    		  });
    		    
    		  // Enable Carousel Controls
    		  $(".carousel-control-prev").click(function(){
    		    $("#emblemCarousel").carousel("prev");
    		  });
    		  $(".carousel-control-next").click(function(){
    		    $("#emblemCarousel").carousel("next");
    		  });
    		});
    }
    return {
        onCreate:onCreate,
        emblem_carousel:emblem_carousel,
        team_list:team_list,
        team_list_after:team_list_after,
        team_detail:team_detail,
        team_create:team_create,
        team_update_frame:team_update_frame,
        team_members_list:team_members_list,
        team_sub_member:team_sub_member,
        team_update_info:team_update_info,
        team_update_emblem:team_update_emblem,
        team_diss_ever:team_diss_ever,
        team_member_detail:team_member_detail,
        team_member_edit:team_member_edit,
        team_area_srch:team_area_srch
    };

})();