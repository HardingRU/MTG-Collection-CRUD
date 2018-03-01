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
    $('#appendMe').append("<h2> Add Card From Collection </h2>");
    $('#appendMe').append("<table class='table table-hover table-dark'>");
    $('#appendMe').append("<thead class='thead-dark'>");
    $('#appendMe').append("<tr>");
    $('#appendMe').append("<th> Card Name </th>");
    $('#appendMe').append("<th> Color </th>");
    $('#appendMe').append("<th> Mana Cost </th>");
    $('#appendMe').append("<th> Card Type </th>");
    $('#appendMe').append("<th> Attack </th>");
    $('#appendMe').append("<th> Defense </th>");
    $('#appendMe').append("<th> Rarity </th>");
    $('#appendMe').append("<th> Set Code </th>");
    $('#appendMe').append("<th> Card Text </th>");
    $('#appendMe').append("<th>  </th>");
    $('#appendMe').append("</tr>");
    $('#appendMe').append("</thead>");
    data.forEach(card => {
      const cardLink = "/cards/" + card.id;
      $('#appendMe').append("<tr>")
      $('#appendMe').append(`<td class=deckDiv id=deckDiv` + card.id + `><a href=` + cardLink + ` class="preview">` + card.name + `<img src=` +card.img_url + ` class="hide-image" /></a></td>`);
      $('#appendMe').append("<td> " + card.colors + " </td>");
      $('#appendMe').append("<td> " + card.mana_cost + " </td>");
      $('#appendMe').append("<td> " + card.type + " </td>");
      $('#appendMe').append("<td> " + card.attack + " </td>");
      $('#appendMe').append("<td> " + card.defense + " </td>");
      $('#appendMe').append("<td> " + card.rarity + " </td>");
      $('#appendMe').append("<td> " + card.set_name + " </td>");
      $('#appendMe').append("<td> " + card.card_text + " </td>");
      $('#appendMe').append(`<td><button type="button" class="cardToDeck" id="ctd` + card.id + `"> Add Card </button></td>`)
      $('#appendMe').append("</tr>")
      $('#ctd'+card.id).on('click',function(){
        const deckAddition = {
          deckToAdd: deckid,
          cardToAdd: card.id
        }
      addToDeck(deckAddition)
      location.reload();
      })
    })
    $('#tableDiv').append("</table>")

  }


  const addToDeck = deckAddition => {
    $.ajax({
      url: '/decks/addToDeck',
      method: 'POST',
      data: deckAddition
    })
  }

})
