package com.suports.web.cmm;

import java.util.Map;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import lombok.Data;

@Component @Data @Lazy
public class Proxy {

	private int pageNum,pageSize,
	blockSize,
	startRow,endRow,
	startPage,endPage,blockNum,
	prevBlock,nextBlock,totalCount,teamIndex,
	gmNumber,mIndex;
	private boolean existPrev, existNext;
	private String search,resNumber;
	private String name;
	

    public void carryOut(Map<?,?> paramMap) {

		System.out.println("pageSize : "+ paramMap.get("pageSize"));
		System.out.println("pageNum : "+ paramMap.get("pageNum"));
		
		pageSize = ((String)paramMap.get("pageSize") == null)	? 5 : Integer.parseInt((String) paramMap.get("pageSize"));
		pageNum = ((String)paramMap.get("pageNum") == null) ? 1 : Integer.parseInt((String) paramMap.get("pageNum"));
		totalCount = (int) paramMap.get("totalCount");
		/* teamIndex = (int) paramMap.get("teamIndex"); */
		
		int pageCount = (totalCount % pageSize != 0) ?  totalCount/pageSize+1:totalCount/pageSize;
		String _blockSize = (String)paramMap.get("blockSize");
		blockSize = (_blockSize == null) ? 5 : Integer.parseInt(_blockSize);
		startRow = (pageNum -1) *pageSize + 1;
		endRow = (totalCount > pageNum * pageSize)? pageNum * pageSize: totalCount;
	
		blockNum = (int)(Math.ceil(pageNum / (double)blockSize) * blockSize);
		endPage = blockNum;
		startPage = (endPage - blockSize) + 1; 
		endPage = (blockNum > pageCount ) ? pageCount :blockNum ;
		
		System.out.println("startPage : :  : :  "+startPage);
		System.out.println("endPage : :  : :  "+endPage);
		System.out.println("pageSize : :  : :  "+pageSize);
		System.out.println("pagecount : :  : :  "+pageCount);
		
		existNext = (startPage + pageSize) <= pageCount;
		existPrev = (startPage - pageSize) > 0 ;
		System.out.println("existPrev : :  : :  "+existPrev);
		System.out.println("existNext : :  : :  "+existNext);
		
		prevBlock = startPage - pageSize;
		nextBlock = startPage + pageSize;
		
		search = (String) paramMap.get("search");
		System.out.println(search);
		System.out.println("total :" + totalCount);
	
		
    }   
    public void reservation(Map<?,?> paramMap) {
    	
		resNumber = (String) paramMap.get("resNumber");
		gmNumber = (int) paramMap.get("gmNumber");
		mIndex = (int) paramMap.get("mIndex");
    }
    
    public void alram(Map<?, ?> paramMap) {
    	
    	mIndex = (int) paramMap.get("mIndex");
    	name = (String) paramMap.get("name");
    	
    	System.out.println("mIndex : " + mIndex);
    	System.out.println("name : " + name);
    	
    }

}
