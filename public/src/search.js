

$(()=>{

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

  const showResults = data => {
    $('div').remove();
    $('br').remove();
    $('.addClass').remove();
    const dataArray = data["cards"];
    dataArray.forEach(card => {
      $('body').append(`<div class="cardItem" id=div`+ card.multiverseid +`>`)
      $('#div'+card.multiverseid).append("<h3> " + card.name + ", " + card.setName+ "</h3>")
      if(card.imageUrl === undefined) {
        card.imageUrl = "https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/thumb/f/f8/Magic_card_back.jpg/172px-Magic_card_back.jpg"
      }
      $('#div'+card.multiverseid).append("<img src=" + card.imageUrl +"> </img>")
      $('#div'+card.multiverseid).append("<br>")
      $('#div'+card.multiverseid).append(`<button type="button" class="btn-sm btn-primary addClass" id="` + card.multiverseid + `"> Add Card </button>`)
      $('#'+card.multiverseid).on('click',function(){
        cardToAdd = card.multiverseid;
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
          }
        })
      })
      $('#AA'+card.multiverseid).append("</div>")
    })
  }


  const addToDB = newCard => {
    $.ajax({
      url: '/cards',
      method: 'POST',
      data: newCard
    })
  }

})
