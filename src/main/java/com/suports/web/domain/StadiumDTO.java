package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public  class StadiumDTO {
	private String 
					stadium_Index,
					stadium_Name,
					area_Number,
					stadium_Photo,
					stadium_Info,
					sports_Index,
					area_Code;
}
