"use strict";
var app = app || {};
app = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
	let _,js,compojs,homejs;
	let run=x=>{
		$.getScript(x+'/resources/js/com/router.js',
			()=>{
				$.extend(new Session(x));
				onCreate();
		})
	};	
	let init=()=>{
		_ = $.ctx();
		js = $.js();
		compojs = js+'/compo/compo.js';
		homejs = js+ '/home/home.js';
	};
	let onCreate=()=>{
		init();
		$.when(
			$.getScript(compojs),
			$.getScript(homejs),
			$.Deferred(function(d){
				 $(d.resolve);
			})
		).done(()=>{
			setContentView();
			
		}).fail(()=>{
			 swal({
            	 icon : 'error',
            	 text : '시스템에 문제가 있습니다. 다시시도 바랍니다.'
             });
		});
	};
	let setContentView=()=>{
		home.onCreate();
	};
	return {run:run,onCreate:onCreate};
})();

