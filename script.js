var currencies;
var requestURL = 'https://www.cbr-xml-daily.ru/daily_json.js';
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    currencies = request.response;
    console.log(currencies);
  }

function getMenu() {
    let valutes = currencies.Valute;

    for (let key in valutes) {
        let val = valutes[key];
        let elem = document.createElement('a');
        elem.textContent = `${val.ID} - ${val.Name}`;
        
        elem.addEventListener("click", function(e) {
            let box = document.getElementById('box');
            if (box) {
                box.remove();
            }
            box = document.createElement('div');
            let nowDate = new Date(currencies.Date);
            let prevDate = new Date(currencies.PreviousDate);
            
            box.textContent = `${val.ID} - ${val.Name} (${val.CharCode}). \n
                ${nowDate.getDate()}/${nowDate.getMonth() + 1}/${nowDate.getFullYear()}, ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()} - ${val.Value} \n
                ${prevDate.getDate()}/${prevDate.getMonth() + 1}/${prevDate.getFullYear()}, ${prevDate.getHours()}:${prevDate.getMinutes()}:${prevDate.getSeconds()} - ${val.Previous}`;

            box.className = "box";
            box.id = "box";
            myDropdown.after(box);
        }, false);

        myDropdown.append(elem);
    }

    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}