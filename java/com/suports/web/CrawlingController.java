package com.suports.web;


import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class CrawlingController {

	private static final Logger logger = LoggerFactory.getLogger(CrawlingController.class);
	
	@GetMapping("/crawling")
	public String crawling() throws Exception {
		logger.info("crawling");
            // 1. URL 선언
            String connUrl = "https://www.naver.com";
            
            // 2. HTML 가져오기
            Connection conn = Jsoup
                    .connect(connUrl)
                    .header("Content-Type", "application/json;charset=UTF-8")
                    .method(Connection.Method.GET)
                    .ignoreContentType(true);
            
            Document doc = conn.get(); //
            Elements e = doc.select(".naver_logo");
            
            String stadiumName = e.select("h4").text();
           
            // 3. 가져온 HTML Document 를 확인하기
            System.out.println(stadiumName);
            
        
		return stadiumName;
	}
}
