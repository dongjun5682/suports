package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public  class StadiumDTO {
	private int stadiumIndex;
	private String	stadiumName,
					stadiumPhoto,
					stadiumInfo,
					areaName;
}