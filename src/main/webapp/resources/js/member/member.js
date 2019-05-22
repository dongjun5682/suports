var member = member || {}

member = (() => {
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, compojs, stadiumjs, tournamentjs, teamjs;

    let init = () => {
        _ = $.ctx();
        js = $.js();
        compojs = js + '/compo/compo.js';
        stadiumjs = js + '/stadium/stadium.js';
        tournamentjs = js + '/tournament/tournament.js';
        teamjs = js + '/team/team.js';
    };
    let onCreate = (d) => {
        init();
        $.when(
            $.getScript(compojs),
            $.getScript(stadiumjs),
            $.getScript(tournamentjs),
            $.getScript(teamjs),
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
        $('#rm_search').empty().append(compo.srch());
        $('input[name="gameDate"]').datepicker({
			locale: 'ko-kr',
            uiLibrary: 'bootstrap4',
            format : 'yyyy-mm-dd',
            autoShow: 'true',
            autoPick: 'true'
		});
        $('.search-date').css({'margin-top':'10px','border-radius':' 4px'});
        $('.logo').remove();
        $('<a class="logo_login" href="#"><img src="resources/img/logo/logo.png" alt="logo"></a>').appendTo('.navbar-brand');
        $('#content');
        $('#footer').remove();
        $('#myMpa').after(compo.footer());
        home_list_after();
        let x = {
        		photo : $.member().photo
        }
        $('#nav').empty().after(compo.login_nav(x));
        if($.member().teamIndex != 0){
        	$('#exercise').parent().after('<li><a href="#" id="team_exercise">클럽 운동</a></li>');
        }
        $('#userBtn').click(() => {
        	$('#alram-drop').remove();
            $('<div class="dropdown-menu" id="user-drop">'
            		+'<ul>'
            		+'<li id="frofile"><h3 class="black-text">프로필 관리<h3></li>'
            		+'    <li class="divider"></li>'
            		+'    <li id="myteam"><h3 class="black-text">나의 클럽<h3></li>'
            		+'    <li class="divider"></li>'
            		+'    <li id="logout"><h3 class="black-text">로그아웃<h3></li>'
            		+'  </ul>'
            		+'</div>').appendTo('#userBtn');
            
            
            $('#frofile').click(() => {
            	member_update_frame();
            });
            $('#myteam').click(() => {
            	if ($.member().teamIndex == 0){
            		swal({
                		icon : 'info',
                		text : '현재 소속된 팀이 없습니다.'
                	});
            	} else {
            		let teamData = {
            				teamIndex : $.member().teamIndex
            				}
            		$.ajax({
            			url: $.ctx()+'/teams/myteam/'+teamData.teamIndex,
            			type: 'PUT',
            			data: JSON.stringify(teamData),
            			dataType: 'json',
            			contentType: "application/json; charset=utf-8",
            			success: d => {
            				if($.member().memberIndex == d.captain){
            					team.team_update_frame();
            				} else {
            					$('.team_member_details').remove();
            					team.team_detail(d);
            				}
            			},
            			error: e => {
            				 swal({
                            	 icon : 'error',
                            	 text : '시스템에 문제가 있습니다. 다시시도 바랍니다.'
                             });
            			}
            		});
            	}
            });
            $('#logout').click(() => {
        		sessionStorage.removeItem("member"); 
        		window.location.reload();
        	});
        });
        $('#notice').click(()=>{
        	$('#update_mid_content').remove();
        	let x = {
            		page : '1'
            	}
            	board.onCreate(x);
        })
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
                	stadium.stadium_res();
                    break;
                case 'team':
                    let x = {
                        'page': 1
                    };
                    team.team_list_after(x);
                    break;
                case 'tourment':
                    tour.tour_apply();
                    break;
                case 'team_exercise':
                	stadium.team_stadium_list();
                	break;
            }
        })
        
        $('#sear-btn').click(function() {
        	if($('.search-addr').val() == '모두보기'){
        		let x = {p:1};
        		stadium.list_after(x);
        	}else{
            let search = {
                p: 1,
                s: $('.search-addr').val(),
                t: $('.search-time').val()
            };
            stadium.srch_after(search);
            }
        });
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
                            '    <div class="course-time">' +
                            '      <span class="course-time course-free"> ' + j.time + '</span>' +
                            '    </div>' +
                            '    <div class="course-details">' +
                            '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                            '    </div>' +
                            '    <div class="course-people">' +
                            '      <span class="course-price course-free">' + j.people + '/' + 22 + '</span>' +
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
                            '    <div class="course-time">' +
                            '      <span class="course-time course-free"> ' + j.time +'</span>' +
                            '    </div>' +
                            '    <div class="course-details">' +
                            '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                            '    </div>' +
                            '    <div class="course-people">' +
                            '      <span class="course-price course-free">' + j.people + '/' + 22 + '</span>' +
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
                            '    <div class="course-time">' +
                            '      <span class="course-time course-free">' + j.time +'</span>' +
                            '    </div>' +
                            '    <div class="course-details">' +
                            '      <span class="course-category">' + j.stadiumAddr + '</span>' +
                            '    </div>' +
                            '    <div class="course-people">' +
                            '      <span class="course-price course-free">' + j.people + '/' + 22 + '</span>' +
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
    	password_tooltip();
		$('input[name="memberBirth"]').datepicker({
			locale: 'ko-kr',
            uiLibrary: 'bootstrap4',
            format : 'yyyy/mm/dd'
		});
    	$('#mem_update_btn').click(e=>{
			$('#mem_update_btn').attr('disabled', true);
        	e.preventDefault();
    		let update = {
    				id : $.member().id,
    				name : $('form input[name="memberName"]').val(),
    				password : $('form input[name="memberPassword"]').val(),
    				birth : $('form input[name="memberBirth"]').val(),
    				characters : $('form select[id="memberSort"]').val(),
    				info : $('form input[name="memberInfo"]').val()
    		};
    		$.ajax({
    			url : $.ctx()+'/members/'+update.id,
    			type : 'PUT',
    			data : JSON.stringify(update),
    			dataType : 'json',
    			contentType : "application/json; charset=utf-8",
    			success : d => {

    				 swal({
                    	 icon : 'success',
                    	 text : '계정 정보가 수정되었습니다!'
                     });
    				window.location.reload();
    			},
    			error: function(xhr, option, error){
    				 swal({
                    	 icon : 'error',
                    	 text : '시스템에 문제가 있습니다. 다시시도 바랍니다.'
                     });
    			}
    		})
    	});
    }
    let profile_disable = ()=>{
    	$('#update_mid_content').append(compo.player_delete());
    	$('#mem_disable_btn').click((e)=>{
        	e.preventDefault();
    		let update = {
					id : $.member().id,
					password : $('form input[name="memberPassword"]').val()
			};
    		update_ajax(update);
    	});
    	
    };
    let profile_photo_update = () => {
    	$('#update_mid_content').append(compo.update_photo_player());
    	$('.member_currnt_img').attr("src","resources/img/members_photo/"+$.member().photo);
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
    		$('input[name="memberBirth"]').datepicker({
    			locale: 'ko-kr',
                uiLibrary: 'bootstrap4',
                format : 'yyyy/mm/dd',
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
    								 swal({
    				                	 icon : 'error',
    				                	 text : '시스템에 문제가 있습니다. 다시시도 바랍니다.'
    				                 });
    							}
    						})
    					})
    				})
               })
           })
    	})
    };
    // update.id json require
    let update_ajax = (update) => {
    	$.ajax({
			url : $.ctx()+'/members/'+update.id,
			type : 'PUT',
			data : JSON.stringify(update),
			dataType : 'json',
			contentType : "application/json; charset=utf-8",
			success : d => {
				sessionStorage.removeItem("member"); 
        		window.location.reload();
        		swal({
            		icon : 'info',
            		text : '계정 정보가 수정되어 로그아웃 됩니다.'
            	});
			},
			error : e => {
				 swal({
                	 icon : 'error',
                	 text : '시스템에 문제가 있습니다. 다시시도 바랍니다.'
                 });
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
                encType: 'multipart/form-data',
                type: 'POST',
                beforeSubmit: function() {
                    if($('#photo').val() == ''){
                         swal("사진을 선택하셔야 합니다.");
                         return false;
                    }else{
                         let ext = $('#photo').val().split('.').pop().toLowerCase();
                         if($.inArray(ext, ['jpg','png','jpeg']) == -1){
                        	 swal({
                            	 icon : 'info',
                            	 text : 'JPG, JPEG, PNP형식의 파일만 업로드 가능합니다.'
                             });
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
        member_update_frame:member_update_frame,
        profile:profile,
        profile_photo_update:profile_photo_update,
        profile_disable:profile_disable,
        update_ajax:update_ajax,
        upload_ajax:upload_ajax,
        password_tooltip:password_tooltip
    }
})();