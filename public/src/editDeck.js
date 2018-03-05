$(()=>{

// hackish way to figure out which deck is being edited by reading the URL


/*  const currentPage = window.location.href;
    const sliced = currentPage.slice(35, currentPage.length)
    const deckid = sliced.slice(0, sliced.length-5 ) */



        const currentPage = window.location.href;
        const sliced = currentPage.slice(28, currentPage.length)
        const deckid = sliced.slice(0, sliced.length-5 )

//functionality that runs when user clicks save deck
//first gets deck name field and saves that to database
//then gets each card and pulls the number of cards, saving to database
//checks if the user has changed num of cards for any card to 0, and deletes if so
//redirects to /decks/ after a user hits save

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
      if(change.value == 0) {
        const deleteCard = {
          card_id: changeID,
          deck_id: deckid
        }
        $.ajax({
          url: `/decks/removeCard`,
          method: 'DELETE',
          data: deleteCard
        })
      }
      else {
        const changeData = {
          card_id: changeID,
          number: change.value
        }
        $.ajax({
          url: `/decks/saveDeck`,
          method: 'PUT',
          data: changeData
        })
      }
    })
    window.location.href = "/decks/";
  })


//users card index route to get all cards in the collection, passing these cards to collectionView
  $.ajax({
    url: `/cards/data`,
    method: 'GET',
    success: (data) => {
      collectionView(data)
    }
  })

//takes all cards in returned via call above and puts them into a table, allowing users to add those cards to their deck
  const collectionView = data => {
    $('#appendMe').append("<h2> Add Card From Collection </h2>");
    $('#appendMe').append("<table id='editTable' class='table table-hover table-dark'>");
    $('#editTable').append("<thead id='edithead' class='thead-dark'>");
    $('#edithead').append("<tr id='editHeader'>");
    $('#editHeader').append("<th> Card Name </th>");
    $('#editHeader').append("<th> Color </th>");
    $('#editHeader').append("<th> Mana Cost </th>");
    $('#editHeader').append("<th> Card Type </th>");
    $('#editHeader').append("<th> Attack </th>");
    $('#editHeader').append("<th> Defense </th>");
    $('#editHeader').append("<th> Rarity </th>");
    $('#editHeader').append("<th> Set Code </th>");
    $('#editHeader').append("<th> Card Text </th>");
    $('#editHeader').append("<th>  </th>");
    $('#edithead').append("</tr>");
    $('#editTable').append("</thead>");
    data.forEach(card => {
      const cardLink = "/cards/" + card.id;
      $('#editTable').append(`<tr id='editItem${card.id}'>`)
      $(`#editItem${card.id}`).append(`<td class=deckDiv id=deckDiv` + card.id + `><a href=` + cardLink + ` class="preview">` + card.name + `<img src=` +card.img_url + ` class="hide-image" /></a></td>`);
      $(`#editItem${card.id}`).append("<td> " + card.colors + " </td>");
      $(`#editItem${card.id}`).append("<td> " + card.mana_cost + " </td>");
      $(`#editItem${card.id}`).append("<td> " + card.type + " </td>");
      $(`#editItem${card.id}`).append("<td> " + card.attack + " </td>");
      $(`#editItem${card.id}`).append("<td> " + card.defense + " </td>");
      $(`#editItem${card.id}`).append("<td> " + card.rarity + " </td>");
      $(`#editItem${card.id}`).append("<td> " + card.set_name + " </td>");
      $(`#editItem${card.id}`).append("<td> " + card.card_text + " </td>");
      $(`#editItem${card.id}`).append(`<td><button type="button" class="btn-sm btn-primary cardToDeck" id="ctd` + card.id + `"> Add Card </button></td>`)
      $('#editTable').append("</tr>")
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

//function to add a card to deck if user hits Add Card button

  const addToDeck = deckAddition => {
    $.ajax({
      url: '/decks/addToDeck',
      method: 'POST',
      data: deckAddition
    })
  }

})
