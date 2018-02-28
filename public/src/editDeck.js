$(()=>{


  const currentPage = window.location.href;
  const sliced = currentPage.slice(28, currentPage.length)
  const deckid = sliced.slice(0, sliced.length-5 )

  $("#saveDeck").on("click", function() {
    let nameGrabber = $("#deckName")
    $.ajax({
      url: `/decks/${deckid}`,
      method: 'PUT',
      data: nameGrabber
    })
    let cardGrabber = $(".numCards")
    Array.from(cardGrabber).forEach(change => {
      let idLen = change.id.length;
      let changeID = change.id.slice(3, idLen)
      const changeData = {
        card_id: changeID,
        number: change.value
      }
      $.ajax({
        url: `/decks/saveDeck`,
        method: 'PUT',
        data: changeData
      })
    })
  })

  $.ajax({
    url: `/cards/data`,
    method: 'GET',
    success: (data) => {
      collectionView(data)
    }
  })


  const collectionView = data => {
    $('body').append("<h2> Your Collection </h2>");
    data.forEach(card => {
      $('body').append("<div class=deckDiv id=deckDiv" + card.id + "> <h5>" + card.name + "</h5> </div>");
      $('#deckDiv'+card.id).append(`<button type="button" class="cardToDeck" id="ctd` + card.id + `"> Add Card </button>`)
      $('#ctd'+card.id).on('click',function(){
        const deckAddition = {
          deckToAdd: deckid,
          cardToAdd: card.id
        }
      addToDeck(deckAddition)
      })
    })
  }


  const addToDeck = deckAddition => {
    $.ajax({
      url: '/decks/addToDeck',
      method: 'POST',
      data: deckAddition
    })
  }

})
