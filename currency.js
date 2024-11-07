const baseurl="https://api.exchangerate-api.com/v4/latest/USD";
const dropdowns  = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select") //accessing select from "from" class//
const toCurr = document.querySelector(".to select");
const ms = document.querySelector(".msg");

let i=0;
for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name=="from" && currCode=="USD") {  //STARTING CONDITION OF "FROM"//
        newOption.selected = "selected"
      } else if(select.name=="to" && currCode=="INR") {//STARTING CONDITION OF "TO"//
        newOption.selected = "selected"
      }
      select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{//evt is an object in the event listener//
        updateFlag(evt.target);//target is when we changed something where that change will occur//
    })
}
//FLAG CHANGING FUNCTION AFTER SELECTION OF THE OPTION//
const updateFlag=(element)=>{//element is the referred target above so we are extracting the target//
  let currCode = element.value;//extracting the currency code//
  let countryCode = countryList[currCode];//from countryList we are extracting country code more of like extracting the element from the array//
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;//we are making changes in the api according to the country code cause country code would be the variable which would cause change in the image//
  let img = element.parentElement.querySelector("img"); //element is referring to the change of the select option in the html code so to access the image in the js file we go to the parent class of select and then access the img tag by accessing through the dot method in parent class//
  img.src = newSrc;
}

//now to get the exchabge rate//
btn.addEventListener("click", async (evt)=>{//we have to make this function async so that await can be used//
  evt.preventDefault();//basically when form is submitted its default behavior is to refresh the webpage//
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if(amtVal===""||amtVal<1) {
    amtVal = 1;
    amount.value = 1;
  }
  const URL = `${baseurl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;//we would use our fetch api on this, also the api identify the only lowercase values  so using only lowercase function//
  let response = await fetch(URL)
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];//this would have our rate here//
  let final = amtVal*rate;
  
  ms.innerText = `${amtVal} ${fromCurr.value} = ${final} ${toCurr.value}`;
})