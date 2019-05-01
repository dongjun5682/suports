package com.suports.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;

@Data @Component @Lazy
public  class PaymentDTO {
	private int 
					payment_Number;
	private String payment_Date,access_code,payment_Key;
}
