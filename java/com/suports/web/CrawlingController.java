package com.suports.web;


import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class CrawlingController {
//
//	@GetMapping("/crawling")
//	public String crawling() throws Exception {
//
//            // 1. URL 선언
//            String connUrl = "www.naver.com";
//            
//            // 2. HTML 가져오기
//            Connection conn = Jsoup
//                    .connect(connUrl)
//                    .header("Content-Type", "application/json;charset=UTF-8")
//                    .method(Connection.Method.GET)
//                    .ignoreContentType(true);
//            
//            Document doc = conn.get(); //
//            String e = doc.select(".tc_st").html();
//            // 3. 가져온 HTML Document 를 확인하기
//            System.out.println(e);
//            
//        
//		return e;
//	}
}
