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
    $('body').append("<div id=tableDiv>")
    $('#tableDiv').append("<table>");
    $('#tableDiv').append("<tr>");
    $('#tableDiv').append("<th> Card Name </th>");
    $('#tableDiv').append("<th> Color </th>");
    $('#tableDiv').append("<th> Mana Cost </th>");
    $('#tableDiv').append("<th> Card Type </th>");
    $('#tableDiv').append("<th> Attack </th>");
    $('#tableDiv').append("<th> Defense </th>");
    $('#tableDiv').append("<th> Rarity </th>");
    $('#tableDiv').append("<th> Set Code </th>");
    $('#tableDiv').append("<th> Card Text </th>");
    $('#tableDiv').append("<th>  </th>");
    $('#tableDiv').append("</tr>");
    console.log(data[1]);
    data.forEach(card => {
      $('#tableDiv').append("<tr>")
      $('#tableDiv').append("<td class=deckDiv id=deckDiv" + card.id + ">" + card.name + "</td>");
      $('#tableDiv').append("<td> " + card.colors + " </td>");
      $('#tableDiv').append("<td> " + card.mana_cost + " </td>");
      $('#tableDiv').append("<td> " + card.type + " </td>");
      $('#tableDiv').append("<td> " + card.attack + " </td>");
      $('#tableDiv').append("<td> " + card.defense + " </td>");
      $('#tableDiv').append("<td> " + card.rarity + " </td>");
      $('#tableDiv').append("<td> " + card.set_name + " </td>");
      $('#tableDiv').append("<td> " + card.card_text + " </td>");
      $('#tableDiv').append(`<td><button type="button" class="cardToDeck" id="ctd` + card.id + `"> Add Card </button></td>`)
      $('#tableDiv').append("</tr>")
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
    $('body').append("</div>")

  }


  const addToDeck = deckAddition => {
    $.ajax({
      url: '/decks/addToDeck',
      method: 'POST',
      data: deckAddition
    })
  }

})
