package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public  class StadiumDTO {
	private int stadium_index;
	private String	stadium_Name,
					stadium_Photo,
					stadium_Info,
					area_name;
}
