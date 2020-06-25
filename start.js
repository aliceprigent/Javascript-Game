var startBtn = document.getElementById('btn-start')
var rules = document.getElementById('btn-rules')


function showRules(){
    var theRules = document.createElement('div')
    theRules.className = 'rules'
    var parent = document.getElementById('start')
    parent.prepend(theRules)
    var textRules = document.createElement('p')
    textRules.className = 'textrules'
    theRules.prepend(textRules)
    textRules.innerHTML = `<p><strong>YOUR MISSION</strong> <br>
    Save the city! An unidentified coronavirus is spreading and infecting citizens. Catch the <img class="virus" src="./images/coronavirus-5107715_1280.webp"> to stop the epidemic.
    <br> 

    <p><strong>Watch out for it</strong>! Due to numerous shortages, <img class="pasta" src="./images/pasta.png"> and <img class="pq" src="./images/pq.png"> are for the citizens. Don't catch them if you want to keep saving lives and not losing points!!!</p>
    
    <p>The hydroalcoholic gel will help you fight the virus better. Dr. Raoul will sometimes send you a vaccine to strengthen your immune system... Don't miss it!</p>
    
    <strong>GOOD LUCK...</strong>  <img class="vaccin" src="./images/vaccin.png"></p>`
}

rules.onclick = showRules