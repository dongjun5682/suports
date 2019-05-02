package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component @Lazy
public class TeamDTO {
	private int index;
	private String name, emblem, captain, sport, sort, address, info, avgage, style;
}
