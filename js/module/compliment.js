function smartMirrorCompliments(){
	this.pushItems 		= new Array();
	

	this.updateData = function()
	{
		var item;
		var tmp_this = this;
		for(var i in compliments){
			item = ["complement",compliments[i]];
			tmp_this.pushItems.push(item);
		}

	};

this.getContent = function()
{
		var tmp_this = this;
		//console.log(tmp_this.pushItems);

		return tmp_this.pushItems;
};
}