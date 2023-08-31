
var murmur = require("./samarthHash"); 
var bloomseeds=[];

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
    bloomfilter[i][murmur("VaibhavTanwar",bloomseeds[i])%2027]++;
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
        return 0;
    else 
        return 1;

}

function insert(val)
{
    for(let i=0;i<32;i++)
{   
    //console.log(bloomseeds[i]);
    bloomfilter[i][murmur(val,bloomseeds[i])%2027]++;
}
}

check("VaibhavTanwar");
check("HammadAnsari");

const choices = {
    ins: insert,
    chk: check
  };

module.exports =choices;

