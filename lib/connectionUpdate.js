var superagent = require('superagent');
var cheerio = require('cheerio');
var supervisor = require('../models/supervisor');

const reptileUrl = "https://www.sciencedirect.com/search/advanced?authors=kong%20linghe&show=25&sortBy=relevance&lastSelectedFacet=years";

var connection = {};

superagent.
    get(reptileUrl).
    set({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
    }).
    end(function(err ,res){
    
        if(err) {        
            throw err;        
            return;
        }   
        let $ = cheerio.load(res.text);
    
        $('#main_content > main > div.transparent.results-container.col-xs-24.col-sm-16.col-lg-18 > div:nth-child(2) > div.ResultList.col-xs-24 > ol > li').
        each(function(i, elem) {
            console.log('------');
            var author = $(elem).find('.author');
            for(var index = 0; index < author.length; ++index){
                var co_Author = author[index].firstChild.nodeValue;
                if(co_Author != null){
                    if(connection[co_Author] == null) connection[co_Author] = 1;
                    else connection[co_Author]++;
                }
                console.log(author[index].firstChild.nodeValue);
            }
            console.log('------');
        });

        console.log(connection);
        supervisor.addConnection('孔令和', connection, function(error){
            if(error) console.log(error);
            else console.log('加入关系成功');
        });
});
