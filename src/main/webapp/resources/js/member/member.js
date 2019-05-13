var member = member || {}

member = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, stadiumjs, tournamentjs, teamjs,chatjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        stadiumjs = js + '/stadium/stadium.js';
        tournamentjs = js + '/tournament/tournament.js';
        teamjs = js + '/team/team.js';
        chatjs = js + '/home/chat.js'
    };
    let onCreate = (d) => {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(stadiumjs),
            $.getScript(tournamentjs),
            $.getScript(teamjs),
            $.getScript(chatjs),
            $.Deferred(function(d) {
                $(d.resolve);
            })
        ).done(() => {
            setContentView(d);
        });
    };
    let setContentView = (d) => {
    	login_after();
    }
    let login_after =()=>{
    	$('#map').remove();
        $('#content').empty().append(compo.content());
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
       
        $('#home').attr('style', '" "');
        $('#rm_search').empty().append(compo.srch());
        $('.logo').remove();
        $('<a class="logo_login" href="#"><img src="resources/img/logo/logo.png" alt="logo"></a>').appendTo('.navbar-brand');
        $('#content').css('margin-top', '0');
        $('#footer').remove();
        $('#myMpa').after(compo.footer());
        home_list_after();
       /* $.getScript($.js()+'/compo/compo.js',()=>{
         	$.getScript($.js()+'/home/chat.js',()=>{
         		$('#chat_body').hide().after( '<button id="chat_ball" style="margin-left: 1373px;width: 5%;margin-bottom: 40px;"><img src="resources/img/soccer-ball.png" style="width: 101%; margin-left: 127px;"></button>' );
         			  $("#chat_ball").click(function(){
         				  alert('클릭');
         				 $('#chat_body').show();
         				 chat.chat_bot();
         			  });
         		
          	});
        });*/
        $('#nav').empty().after(compo.login_nav());
        $('#userBtn').click(() => {
        	$('#alram-drop').remove();
            $('<div class="dropdown-menu" id="user-drop">'
            		+'<ul>'
            		+'<li id="frofile"><h3 class="black-text">프로필 관리<h3></li>'
            		+'    <li class="divider"></li>'
            		+'    <li id="friend"><h3 class="black-text">친구 초대하기<h3></li>'
            		+'    <li class="divider"></li>'
            		+'    <li id="myteam"><h3 class="black-text">My Team<h3></li>'
            		+'    <li class="divider"></li>'
            		+'    <li id="logout"><h3 class="black-text">로그아웃<h3></li>'
            		+'  </ul>'
            		+'</div>').appendTo('#userBtn');
            
            $('#frofile').click(() => {
            	member_update_frame();
            });
            $('#myteam').click(() => {
            	team.team_update_frame();
            });
            $('#logout').click(() => {
            	session.removeAttribute("member"); 
            	window.location.reload();
            	alert('location.reload and = '+$.member().id);
            });
        });
        $('#alramBtn').click(()=>{
        	 $('#user-drop').remove();
             $(compo.alram_drop_btn()).appendTo('#alramBtn');
             $('.alram_list').empty();
             $.getJSON($.ctx()+'/alram/'+$.member().memberIndex,d=>{
                 $.each(d.alram,(i,j)=>{
                 	$('	<li><h2 class="black-text" style="padding: 10px;">'+j.message+'<h2></li><li class="divider"></li>')
                 	.appendTo('.alram_list');
               })
             })
        });
        $('.navbar-right a').click(function(e) {
            let _this = $(this).attr('id');
            switch (_this) {
                case 'exercise':
                    $('#content').css('margin-top', '80px');
                    stadium.payment_reservation();
                    break;
                case 'team':
                    $('#content').css('margin-top', '80px');
                    let x = {
                        'page': 1
                    };
                    team.team_list_after(x);
                    break;
                case 'tourment':
                    $('#content').css('margin-top', '80px');
                    $('#content').css({
                        'margin-top': '70px',
                        'height': '850px'
                    });
                    tour.tour_apply();
                    break;
             
                default:
                    break;
            }
        })

        $('#sear-btn').click(function() {
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
            stadium.list_after(arr);
        })
        
        $('.logo_login').click(()=>{
        	$('.logo_login').remove();
        	$('.navbar-right').remove();
        	login_after();
        })
    }
    
    
    let home_list_after = () => {
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
                            stadium.list_detail_after(j);
                            
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
                            stadium.list_detail_after(j);
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
                            stadium.list_detail_after(j);
                        });
                    }
                }
            });
        });
    }
    let member_list = () => {
//    	$.getJSON($.ctx()+'/members/page/1', d => {
////    	$.getJSON($.ctx()+'/members/page/'+x.page, d => {
//    		let table = '<table class="table table-striped"><tr>'
//				+'<th>No.</th>'
//				+'<th>이름</th>'
//				+'<th>스포츠</th>'
//				+'<th>포지션</th>'
//				+'<th>위치</th>'
//				+'<th> + </th>'
//				+'</tr>'
//    		$.each(d.ls, (i,j) => {
//    			table += '<tr>'
//    	        +'<td>'+j.rnum+'</td>'
//    	        +'<td>'+j.name+'</td>'
//    	        +'<td>'+j.sports+'</td>'
//    	        +'<td>'+j.position+'</td>'
//    	        +'<td>'+j.address+'</td>'
//    	        +'<td> + 수정 </td>'
//    	        +'</tr>'
//			});
//    		table += '</table>'
//    		$('#update_mid_content').append(table);
//    	})
    };
    let member_update_frame = ()=>{
    	$('#footer').remove();
    	$('#content').empty().html(compo.member_update_frame());
    	profile();
    	
    	$('#profile_update').click(() => {
    		$('#update_mid_content').empty();
    		profile();
    	});
    	$('#profile_photo_update').click(() => {
    		$('#update_mid_content').empty();
    		profile_photo_update();
    	});
    	$('#profile_disable').click(() => {
    		$('#update_mid_content').empty();
    		profile_disable();
    	});
    }
    let profile =()=>{
    	$('#update_mid_content').append(compo.update_player());
    	$('#mem_update_btn').click(e=>{
			$('#mem_update_btn').attr('disabled', true);
        	e.preventDefault();
    		let update = {
    				trigger : 'update',
    				id : $.member().id,
    				name : $('form input[name="memberName"]').val(),
    				password : $('form input[name="memberPassword"]').val(),
    				birth : $('form input[name="memberBirth"]').val(),
    				characters : $('form select[id="memberSort"]').val(),
    				info : $('form input[name="memberInfo"]').val()
    		};
    		$.ajax({
    			url : $.ctx()+'/members/'+update.trigger+'/'+update.id,
    			type : 'PUT',
    			data : JSON.stringify(update),
    			dataType : 'json',
    			contentType : "application/json; charset=utf-8",
    			success : d => {
    				window.location.reload();
    				alert('계정 정보가 업데이트 되어 로그아웃 되었습니다.');
    			},
    			error: function(xhr, option, error){
    				alert(xhr.status);
    				alert(error);
    			}
    		})
    	});
    }
    let profile_disable = ()=>{
    	$('#update_mid_content').append(compo.player_delete());
    	$('#mem_disable_btn').click((e)=>{
        	e.preventDefault();
    		let update = {
    				trigger : 'disable',
					id : $.member().id,
					password : $('form input[name="memberPassword"]').val()
			};
    		update_ajax(update);
    	});
    	
    };
    let profile_photo_update = () => {
    	$('#update_mid_content').append(compo.update_photo_player());
    	$('#member_currnt_img').attr("src","resources/img/members_photo/"+$.member().photo);
		$('.fieldupdatepicture').html(compo.input_uploadImg());
		upload_ajax();
    };

    // Sign Up { Modal, Date_Picker, Tool_Tip, Validate }
    let signup = () => {
        $('.modal-content').html(compo.signup_1());
    	$('form').on('submit', function(e){
    		e.preventDefault();
			let formdata = {
					id : $('form input[name="memberId"]').val(),
					name : $('form input[name="memberName"]').val(),
					email : $('form input[name="memberEmail"]').val()
			};
    		$('.modal-content').html(compo.signup_2());
    		password_tooltip();
    		$('#datepicker').datepicker({
    			locale: 'ko-kr',
                uiLibrary: 'bootstrap4'
    		});
    		$('.imgnextbtnbg').click(() => {
    			let formdata2 = {
    					password : $('form input[name="memberPassword"]').val(),
    					birth : $('form input[name="memberBirth"]').val(),
    					address : $('form select[id="memberLocation"]').val(),
    					sports : $('form select[id="memberSports"]').val(),
    					position : $('form select[id="memberPosition"]').val(),
    					phone : $('form input[id="memberPhone"]').val()
    					};
    			$('.modal-content').html(compo.signup_3());
    			$('.imgnextbtnbg').click(() => {
    				let formdata3 = {
    						characters : $('form input[name="charRadios"]:checked').val()
    				};
    				$('.modal-content').html(compo.signup_4());
    				
    				$('#upload_div').html(compo.input_uploadImg());
    				upload_ajax();
    				
    				$('.imgnextbtnbg').click(() => {
    					let formdata4 = {
    							info : $('form input[name="memberInfo"]').val()
    					};
    					$('.modal-content').html(compo.signup_5());
    					$('#load').attr("data-loading-text","<i class='fa fa-circle-o-notch fa-spin'></i>진행 중..");
    					let formdata5 = {
    							id : formdata.id,
    							password : formdata2.password,
    							email : formdata.email,
    							name : formdata.name,
    							birth : formdata2.birth,
    							position : formdata2.position,
    							characters : formdata3.characters,	
           						sports : formdata2.sports,
           						address : formdata2.address,
           						phone : formdata2.phone,
           						info : formdata4.info
    					};
    					$('#load').click(() => {
    						  $('#load').button('loading');
    						  $('#load').attr('disabled', true);
    						$.ajax({
    							url : $.ctx()+'/members/',
    							type : 'PUT',
    							data : JSON.stringify(formdata5),
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
    };
    // switch_trigger, update.id json require   
    let update_ajax = (update) => {
    	$.ajax({
			url : $.ctx()+'/members/'+update.trigger+'/'+update.id,
			type : 'PUT',
			data : JSON.stringify(update),
			dataType : 'json',
			contentType : "application/json; charset=utf-8",
			success : d => {
				window.location.reload();
				alert('계정 정보가 업데이트 되어 로그아웃 되었습니다.');
			},
			error : e => {
				alert('ajax fail');
			}
		})
    };
    let upload_ajax = () => {
    	$('#img_upload_btn').click((e)=>{
            e.preventDefault();
            let memberData = {
					memberId : $.member().id
			};
            $('#img_upload_frm').ajaxForm({
                url: $.ctx()+'/uploadImg/'+memberData.memberId,
                dataType: 'json',
                encType: "multipart/form-data",
                type: 'POST',
                beforeSubmit: function() {
                    if($('#photo').val() === ""){
                         alert("사진을 선택하셔야 합니다.");
                         return false;
                    }else{
                         let ext = $("#photo").val().split(".").pop().toLowerCase();
                         if($.inArray(ext, ['jpg','png','jpeg']) == -1){
                        	 alert('JPG, JPEG, PNG 형식의 파일만 업로드 할 수 있습니다.');
                        	 return false;
                         }
                    }
                },
                success: function(d) {
                	function update(value){
                	    let prevData = JSON.parse(sessionStorage.getItem('member'));
                	    Object.keys(value).forEach(function(val, key){
                	         prevData[val] = value[val];
                	    })
                	    sessionStorage.setItem('member', JSON.stringify(prevData));
                	}
                	update({photo: d.filename})
                	$('#update_mid_content').empty();
            		profile_photo_update();
                }
           }).submit();
        });
		
    };
    let password_tooltip = () => {
    	$('#checkPassword').click(()=>{
    		if($("#checkPassword").prop("checked")==true){
	        	$('#memberPassword').attr("type", "text");
	        	$("#checkPassword-text").css("color","#FC913A");
	        } 
    		else {
	        	$('#memberPassword').attr("type", "password");
	        	$("#checkPassword-text").css("color","#AEB5BD");
	        }
    	});
		$("#memberPassword").off("focus").on("focus", function () {
			var value = $(this).val();
			$('.js-mytooltip-pw').myTooltip('updateContent', getPwContent(value));
			});
		$("#memberPassword").off("click").on("click", function () {
			var value = $(this).val();
			if (!isNull(value)) {
				$('.js-mytooltip-pw').myTooltip('updateContent', getPwContent(value));
				}
			});
		$("#memberPassword").off("keyup").on("keyup", function () {
			$("#memberPassword").blur();
			$("#memberPassword").focus();
			});
		$('.js-mytooltip-pw').myTooltip({
			'offset': 30,
			'theme': 'light',
			'customClass': 'mytooltip-content',
			'content': '<p>t</p>'
				});   
    };
   
    return {
        onCreate:onCreate,
        login_after:login_after,
        home_list_after:home_list_after,
        signup:signup,
        member_list:member_list,
        member_update_frame:member_update_frame,
        profile:profile,
        profile_photo_update:profile_photo_update,
        profile_disable:profile_disable,
        update_ajax:update_ajax,
        upload_ajax:upload_ajax,
        password_tooltip:password_tooltip
    }
})();