function smartMirrorNews(newsFeed,updateTimeNewsFeedData,updateTimeNewsFeed){
	this.newsFeed 			= newsFeed;
	this.updateTimeData	= updateTimeNewsFeedData;
	this.updateTime		= updateTimeNewsFeed;
	//this.eventList 		= new Array();
	this.newshead 		= new Array();
	this.news 	 		= new Array();
	this.newsIndex 		= 0;
	
	this.updateData = function()
		{
			var tmp_thi = this;
			$.feedToJsonAjaxStyle({
					feed:tmp_thi.newsFeed,
					//feed:'http://www.nu.nl/feeds/rss/achterklap.rss',
					//feed:'http://www.nu.nl/feeds/rss/opmerkelijk.rss',
					success: function(data){
						if(data != 'null'){
						//console.log(data);
						tmp_thi.newshead = [];
						
						tmp_thi.news 	 = [];
						for (var i in data.item) {
							var item = data.item[i];
							
							
							var pos = item.description.search("<p>")
							if(pos == -1){
								pos = 0;
							}
							var desc = item.description.substring(pos, item.description.length);
							var endpos = desc.search("</p>")
								if(endpos == -1){
								endpos = desc.length;
							}
							
							var desc = desc.substring(0, endpos);
							tmp_thi.news.push(desc);
							
							tmp_thi.newshead.push(item.title);
							//console.log(tmp_thi.newshead);
						}
					}
					}
				});
				var tmp_thi = this;
				//console.log(tmp_thi);
				//console.log(tmp_thi.newshead);
	};

this.getContent = function ()
{
	var tmp_thi = this;
	
	//console.log(newshead[newsIndex]);	
	var newsHead = tmp_thi.newshead[tmp_thi.newsIndex];
	var newsItem = tmp_thi.news[tmp_thi.newsIndex];
	//console.log(tmp_thi.news);
		//$('.newshead').updateWithText(newsHead,2000);
		//$('.news').updateWithText(newsItem,2000);
		tmp_thi.newsIndex--;
		if (tmp_thi.newsIndex < 0) tmp_thi.newsIndex = tmp_thi.news.length - 1;
		var item = ['news',newsHead,newsItem];
		//console.log(item);
		return new Array(item);
};

}