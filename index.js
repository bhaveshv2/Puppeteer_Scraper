//Load the Puppeteer
const puppeteer = require('puppeteer');

let url = 'https://www.flipkart.com/mi-4a-pro-80-cm-32-hd-ready-led-smart-android-tv-google-data-saver/p/itmfdwh5jyqhmvzg?pid=TVSFDWH5K9N2FDTK&lid=LSTTVSFDWH5K9N2FDTK9CAPYS&marketplace=FLIPKART&srno=b_1_1&otracker=browse&fm=SEARCH&iid=68a64229-4fac-46bb-8742-cdc1cbdbd025.TVSFDWH5K9N2FDTK.SEARCH&ppt=browse&ppn=browse&ssid=hfwhqgdwfk0000001591776238642';
(async()=>{
    
    //load the headless browser
    const browser =await puppeteer.launch({headless:true});
    //call the method fpr load page and working for it
    const page = await browser.newPage();
    //redirection to the page
    await page.goto(url);

    //Scraping
    let productData = await page.evaluate(()=>{
        let products = [];
        //get the product elements
        let elements=document.querySelectorAll('div._3e7xtJ');

        elements.forEach((productElement)=>{
            let productJson = {};
            try{
                productJson.name = productElement.querySelector('span._35KyD6').innerHTML;
                productJson.price = productElement.querySelector('div._1vC4OE').innerHTML;

                /*'In stock' or 'out of stock' is taking out by the buttons of 'Add to cart(buy now)'
                 or 'notify me' repectively*/ 
                if(productElement.querySelector('div._1k1QCg')){
                    /*if there is container of Add to Cart and buy now buttons then it will show 
                    In stock*/
                    productJson.stock = 'In Stock';
                }else{
                    /*if there is container of Notify me button that means the product is in stock
                     then it will show Out of stock*/
                    productJson.stock = 'Out of Stock';
                }
            }catch(err){
                console.log('Error in Scraper',err);
            }
            //pushing the json object into the array
            products.push(productJson);            
        });
        return products;
    })
    console.dir(productData);
})();