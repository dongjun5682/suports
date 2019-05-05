package com.suports.web;

import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component @Data @Lazy
public class Proxy {
	private int pageNum, pageSize, blockSize,totalCount,blockNum,
	startRow,endRow,startPage,endPage,prevBlock,nextBlock,pageCount;
	private boolean existPrev, existnext;
	private String search;
	public void carryOut(Map<?,?> paramMap) {
		search= (String) paramMap.get("search");
		pageNum = (paramMap.get("pageNum")==null)?1: Integer.parseInt((String) paramMap.get("pageNum"));
		pageSize = (paramMap.get("pageSize")==null)?5: Integer.parseInt((String)paramMap.get("pageSize"));
		blockSize = (paramMap.get("blockSize")==null)?5:Integer.parseInt((String)paramMap.get("blockSize"));
		blockNum = (paramMap.get("block_num")==null)?0:Integer.parseInt((String)paramMap.get("block_num"));
		
		totalCount = (int) paramMap.get("totalCount");
		
		startRow = pageSize*(pageNum-1); //
		endRow = pageNum * pageSize;
		endRow = (totalCount > endRow)?endRow:totalCount;
		pageCount = totalCount/pageSize;
		
		if(totalCount%pageSize!=0) {
			pageCount++;
		}
		blockNum = (int)Math.floor((pageNum-1)/ blockSize);
		startPage = blockNum*blockSize+1;
		endPage = startPage+(blockSize-1);
		if(endPage>pageCount) {
			endPage=pageCount;
		}
		existPrev = (blockSize>=pageNum)?false:true;
		existnext = (pageCount<=(startPage + pageSize))?true:false;
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;
		
		System.out.println("스타트로우 :" + startRow);
		System.out.println("페이지카운트: "+ pageCount);
		System.out.println("토탈 카운트: "+ totalCount);
		System.out.println("스타트 페이지 : "+ startPage);
		System.out.println("페이지사이즈 : "+pageSize );
		System.out.println("엔드 페이지 :"+ endPage);
		System.out.println("프리브 블럭 : "+ prevBlock);
		System.out.println("넥스트 블럭 : "+ nextBlock);
		System.out.println("익지스트 프리브 : "+ existPrev);
		System.out.println("익지스트 넥스트 : "+ existnext);
		System.out.println("블럭 사이즈 : "+ blockSize);		
	}
		
		
}