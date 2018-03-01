$(()=>{

  console.log("script loaded")
  $("#openPack").on("click", function() {
    console.log('button clicked')
    const packSelect = $("#setSelect").val();
    console.log(packSelect)
    $.ajax({
      url: `https://api.magicthegathering.io/v1/sets/${packSelect}/booster`,
      method: 'GET',
      success: (data) => {
        console.log(data)
        processPack(data)
      }
    })
  })



  const processPack = data => {
    $('div').remove();
    $('br').remove();
    $('#openPack').remove();
    const dataArray = data["cards"];
    dataArray.forEach(card => {
      if(card.imageUrl === undefined) {
        card.imageUrl = "https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/thumb/f/f8/Magic_card_back.jpg/172px-Magic_card_back.jpg"
      }
      $('body').append("<div class=packCard> <img src=" + card.imageUrl +"> </img> </div>")

      const newCard = {
        name: card.name,
        mana_cost: card.manaCost || null,
        colors: "COLOR",
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
      console.log(newCard)
      addToDB(newCard)
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
