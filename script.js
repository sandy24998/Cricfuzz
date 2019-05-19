var xhr = new XMLHttpRequest();
window.addEventListener('load', ajaxCall, false);
function ajaxCall(){
    xhr.open("GET", "https://cricapi.com/api/matches?apikey=fdTh9MMmd3OPiTFM4LTCr22Xr4s1");
    xhr.send();
    xhr.onreadystatechange = function(){
        
        if(xhr.readyState==4 && xhr.status==200){
            responseFunc();
        }
    }
}

function responseFunc(){
    var t = JSON.parse(xhr.responseText).matches;
    // console.log(t);
    t.forEach(function(match){
        var tempText = "";
        if(match.matchStarted==true) tempText = "Live";
        else tempText = "";
        createTemplate(match.unique_id);
        var cardHeader = document.getElementById('card-header-'+match.unique_id).innerHTML 
        += match["team-1"] + ' vs ' + match["team-2"] + " " + tempText;
        var cardDate = document.getElementById('date-'+match.unique_id).innerHTML += 
        '<i class="fa fa-calendar" aria-hidden="true"></i> ' + match.dateTimeGMT;
        var cardFooter = document.getElementById('card-footer-'+match.unique_id).innerHTML 
        += '<i class="fas fa-tags"></i> ' + match.type;
    });
}

function createTemplate(unique_id){
    var container = document.getElementById('card-container');
    var t = '<div class="card mt-4 ml-2 my-card" id="card-'+ unique_id + '">' +
    '<div class="card-header bg-primary text-white" id="card-header-'+ unique_id+ '">' + 
    '</div>' +
    '<div class="card-body" id="card-body-'+ unique_id + '">' +
    '<div class="jumbotron" id="date-'+unique_id+'">'+'</div>'+
    '<div class="text-center">'+
    '<button class="btn btn-primary" id="'+ unique_id + '" onclick="showScore(this.id)">View</button>'+
    '</div>' +
    '</div>' +
    '<div class="card-footer" id="card-footer-'+ unique_id +'">' +
    '</div>' +
    '</div>';
    container.innerHTML += t;
}



function showScore(unique_id){
    xhr.open("GET", "https://cricapi.com/api/cricketScore?apikey=fdTh9MMmd3OPiTFM4LTCr22Xr4s1&unique_id="+unique_id);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            score();
        }
    }
    // console.log(unique_id);
}

function score(){
    var t = JSON.parse(xhr.responseText);
    if(t.matchStarted==true) alert(t.score);
    else alert("Match not started!!!");
    // console.log(t);
      
   
    // console.log(t);
}