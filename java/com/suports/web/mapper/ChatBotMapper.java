package com.suports.web.mapper;


import org.springframework.stereotype.Repository;

import com.suports.web.domain.ChatBotDTO;

@Repository
public interface ChatBotMapper {

	public String Chatbot(ChatBotDTO chat);
}
