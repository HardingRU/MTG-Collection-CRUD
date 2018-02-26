$(()=>{
  console.log('script loaded');

  $("button").click(()=> {
    console.log('Searching');
    let searchString = $("input").val();
    $.ajax({
      url: `https://api.magicthegathering.io/v1/cards?name=${searchString}`,
      method: 'GET',
      success: (data) => {
        console.log(data)
        showResults(data)
      }
    })
  })

  const showResults = data => {
    $('div').remove();
    $('br').remove();
    console.log(data);
    const dataArray = data["cards"];
    dataArray.forEach(card => {
      $('body').append("<div> " + card.name + ", " + card.setName+ "</div>")
      if(card.imageUrl === undefined) {
        card.imageUrl = "https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/thumb/f/f8/Magic_card_back.jpg/172px-Magic_card_back.jpg"
      }
      $('body').append("<div> <img src=" + card.imageUrl +"> </img> </div>")
      $('body').append("<br>")
    })
  }

})
