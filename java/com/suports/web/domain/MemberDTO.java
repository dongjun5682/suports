package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;


import org.springframework.stereotype.Component;

import lombok.Data;


@Data @Component @Lazy
public class MemberDTO {
	private int memberIndex,teamIndex;
	private String id, password, email, name, birth, position, characters, sports, address, phone, info, photo, state, disableDate;
}
