package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component @Lazy
public class MemberDTO {
	private int index;
	private String id, password, email, name, birth, position, sport, address, phone, photo;
}
