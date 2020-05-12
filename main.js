var tempCelcius;
var tempFarenheit;
var windSpeed;
var toggleValue='C';
var apiKey ="appid="+prompt("Please enter your openweather api key", "");
//Fetching the data using openweather's api
function parseJson(){
    var cityName= "q="+document.getElementById("cityName").value;
    var aptUrl="https://api.openweathermap.org/data/2.5/weather?";
    var API=aptUrl+cityName+'&'+apiKey;
    fetch(API).then(response => {
            return response.json()
        }).then(data => {
            //Updating the data into the screen
            updateInfo(data);
        }).catch(response => {
            console.log(response)
    })
}

function updateInfo(data){
    //Temparature
    tempCelcius=parseInt((data.main.temp)-273.15)+"&#176<span>C</span>";
    tempFarenheit=parseInt(((data.main.temp)-273.15)*9/5+32)+"&#176<span>F</span>";
    if(toggleValue=='C'){
        document.getElementById("tempSelector").innerHTML=tempCelcius;
    }else{
        document.getElementById("tempSelector").innerHTML=tempFarenheit;
    }
    //Weather Type
    document.getElementById("weatherType").innerHTML=data.weather[0].main;
    //Country
    document.getElementById("country").innerHTML=countrySelector(data.sys.country);
    //Wind Direction
    var windDirc="rotate("+(data.wind.deg+90)+"deg)";
    document.getElementById("windDirction").style.transform=windDirc;
    //Wind Speed
    windSpeed=parseInt(((data.wind.speed)*3.6)*100/50)+"%";
    document.getElementById("ispidValue").innerHTML=parseInt((data.wind.speed)*3.6)+" Km/h";
    windSpeed="scaleX("+windSpeed+")";
    document.getElementById("ispid").style.transform=windSpeed;
}
function countrySelector(data){
    if(data=="IN"){
        return "India";
    }else{
        return data;
    }
}
//Tempareture Toggle
function toggleOn(){
    if(toggleValue=='C'){
        document.getElementById("tgl").style.transform="translateX(2.2rem)";
        document.getElementById("tempType").innerHTML="F";
        document.getElementById("switch").style["background"]="#3d3d3d";
        if(tempFarenheit){
            document.getElementById("tempSelector").innerHTML=tempFarenheit;
        }
        toggleValue='F';
    }else{
        document.getElementById("tgl").style.transform="translateX(0rem)";
        document.getElementById("tempType").innerHTML="C";
        document.getElementById("switch").style["background"]="#dbdbdb";
        if(tempCelcius){
            document.getElementById("tempSelector").innerHTML=tempCelcius;
        }
        toggleValue='C';
    }
}
