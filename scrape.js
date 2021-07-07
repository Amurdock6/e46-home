const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');


//Write Headers

writeStream.write(`Picture,Title,Link,Price \n`)

//BaT Scraper
request('https://bringatrailer.com/bmw/e46/?q=e46', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

       var counter = 0;
       $(".featured-listing-title-link").each((a, title) => {
       const car = $(title).text();
       const link = $(title).attr("href");
       const pricetag = cheerio.load($(".featured-listing-meta-value")[counter]);
       const price = pricetag.text().replace(/,/,"");
       const picture = ($(".featured-listing-image-container")[counter]);
       //const pic = $(picture).attr("img");
       //Write to CSV
       writeStream.write(`${picture},${car}, ${link}, ${price} \n`);
       counter += 2;

     });
     
      console.log('Scraping Complete...') 
      
  }

});