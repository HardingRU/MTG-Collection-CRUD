$(()=>{
// uses 3rd party API to pull a pack worth of cards, sending them into processPack function
  $("#openPack").on("click", function() {
    console.log("button clicked")
    const packSelect = $("#setSelect").val();
    $.ajax({
      url: `https://api.magicthegathering.io/v1/sets/${packSelect}/booster`,
      method: 'GET',
      success: (data) => {
        processPack(data)
      }
    })
  })

//goes through each card that has been pulled from the API, putting them into the browser
//then takes the information for each card, one by one, and adds it to the backend database
  const processPack = data => {
    $('div').remove();
    $('br').remove();
    $('#setSelect').remove();
    $('#openPack').remove();
    const dataArray = data["cards"];
    let i = 0;
    dataArray.forEach(card => {
      if(card.imageUrl === undefined) {
        card.imageUrl = "/assets/default.jpg"
      }
      $('#appendMe').append("<div class=packCard front> <img src=" + card.imageUrl +"> </img> </div>")
      const newCard = {
        name: card.name,
        mana_cost: card.manaCost || null,
        colors: card.colors,
        rarity: card.rarity,
        type: card.type,
        card_text: card.text || null,
        attack: card.power || null,
        defense: card.toughness || null,
        img_url: card.imageUrl,
        api_id: card.multiverseid,
        num_cards: 1,
        set_name: card.set || "Set Unknown"
      }
      addToDB(newCard)
      i = i + 1;
    })
    $('#appendMe').append(`<button type="button" class="btn-sm btn-primary addClass" id="addPackButton"> Add Cards to Collection </button>`);
    $('#addPackButton').on('click',function(){
      window.location.href="/cards";
    })
  }

// this function uses the cards post route to create new cards in the database

  const addToDB = newCard => {
    if (newCard.colors){
      newCard.colors = newCard.colors.toString()
    }
    else {
      newCard.colors = "Colorless";
    }
    $.ajax({
      url: '/cards',
      method: 'POST',
      data: newCard
    })
  }

})
