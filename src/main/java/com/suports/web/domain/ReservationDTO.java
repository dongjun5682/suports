package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public  class ReservationDTO {
	private int 
					payment_Number,
					reservation_Number,
					member_Index,
					game_Index;
	private String reservation_Date,game_Date;
}
