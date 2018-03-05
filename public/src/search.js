

$(()=>{
//uses third party API to search for magic cards, putting the results into function showResults
  $("#searchButton").on("click", function() {
    let searchString = $("#searchInput").val();
    $.ajax({
      url: `https://api.magicthegathering.io/v1/cards?name=${searchString}`,
      method: 'GET',
      success: (data) => {
        showResults(data)
      }
    })
  })

// this function goes through each card returned by the API and puts it on the screen
// for each card put in browser, creates a button to add this card to the database
  const showResults = data => {
    let i=0;
    $('div').remove();
    $('br').remove();
    $('.addClass').remove();
    $('#appendMe').append("<br>");
    const dataArray = data["cards"];
    dataArray.forEach(card => {
      if(card.imageUrl === undefined) {

      }
      else {
      $('#appendMe').append(`<div class="cardItem" id=div`+ i +`>`)
  //    $('#div'+i).append("<h5> " + card.name + "</h5>")
  //    if(card.imageUrl === undefined) {
  //      card.imageUrl = "/assets/default.jpg"
  //    }
      $('#div'+i).append("<img src=" + card.imageUrl +"> </img>")
      $('#div'+i).append("<br>")
      $('#div'+i).append(`<button type="button" class="btn-sm btn-primary addClass" id="` +i +i +i +`"> Add Card </button>`)
      $('#'+i+i+i).on('click',function(){
        cardToAdd = card.multiverseid || 9999;
        console.log(cardToAdd)
        $.ajax({
          url: `https://api.magicthegathering.io/v1/cards/${cardToAdd}`,
          method: 'GET',
          success: (data) => {
            let cardArray = data["card"]
            const newCard = {
              name: cardArray.name,
              mana_cost: cardArray.manaCost || null,
              colors: "White",
              rarity: cardArray.rarity,
              type: cardArray.type,
              card_text: cardArray.text || null,
              attack: cardArray.power || null,
              defense: cardArray.toughness || null,
              img_url: cardArray.imageUrl,
              api_id: cardArray.multiverseid,
              num_cards: 1,
              set_name: cardArray.setName || "Set Unknown"
            }
            //need to add function to find set
            addToDB(newCard)
            window.location.href="/cards"
            window.location.href="/cards"
          }
        })
      })
      i= i + 1;
      $('#AA'+card.multiverseid).append("</div>")
    }
    })
  }

// function to add card to database if corresponding button is clicked

  const addToDB = newCard => {
    $.ajax({
      url: '/cards',
      method: 'POST',
      data: newCard
    })
  }

})
