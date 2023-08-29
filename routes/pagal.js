//hash(url)=%2027
var md5 = require('md5');
var murmur = require("./samarthHash"); 
var bloomseeds=[];

///var murmur = require('murmur3');
console.log(md5('hammadtanwardawaateishq'));
/*
async function delayedLoop() {
    for (let i = 0; i < 32; i++) {
        bloomseeds.push(Date.now());
        await new Promise(resolve => setTimeout(resolve, 10)); // 1 second delay
    }
}
*/

for (let i = 0; i < 32; i++) {
    bloomseeds.push(Date.now());
  for(let j=0;j<10000000;j++)
  {
    j++;
  }
}
const numRows = 32;
const numColumns = 2027;

// Create a 2D array with all elements initialized to 0
const bloomfilter = new Array(numRows).fill(null).map(() => new Array(numColumns).fill(0));


for(let i=0;i<32;i++)
{   
    //console.log(bloomseeds[i]);
    bloomfilter[i][murmur("VaibhavAnsari",bloomseeds[i])%2027]++;
}
function min(x,y)
{
    if(x<y)return x;

    return y;
}
function check(val)
{
let mx=100;
for(let i=0;i<32;i++)
{
    mx=min(mx,bloomfilter[i][murmur(val,bloomseeds[i])%2027]);
}

if(mx==0)
console.log("Aukaat nhi");
else 
console.log("Thodi bahut");

}



check("VaibhavAnsari");
check("HammadTanwar");

