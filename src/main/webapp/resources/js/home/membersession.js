function MemberSession(d){
	if(sessionStorage.getItem('member') == null){
		sessionStorage.setItem('member',JSON.stringify(d));
	} else {
		 //
	}
	return {
		member: ()=>{return JSON.parse(sessionStorage.getItem('member'));}
	}
}