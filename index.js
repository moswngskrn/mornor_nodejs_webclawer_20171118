 const async = require('async');
 const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const items=[
    {
        name: 'Salvator_Mundi_(Leonardo)',
        url: 'https://en.wikipedia.org/wiki/Salvator_Mundi_(Leonardo)'
    }
    ,{
        name: 'Charles_I_of_England',
        url: 'https://en.wikipedia.org/wiki/Charles_I_of_England'
    }
]

const queue = async.queue((task,callback)=>{
    request(task.url,(error,response,body)=>{
        $ = cheerio.load(body);
        const text = $('#mw-content-text p').text();
        fs.writeFile(task.name+'.txt',text,(err)=>{
            if(err){
                console.log(err);
                callback();
            }
            console.log('write file.');
            callback();
        });
    });
});

queue.drain = ()=>{
    console.log('All process complate!');
}

queue.push(items);