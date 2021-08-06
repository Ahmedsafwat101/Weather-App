console.log('client side js file is loaded')

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    $("#locationData").css({"color":"green"})
    $("#locationData" ).text("Loading..")
    $("#forcastData" ).text("")

    fetch('/weather?address='+input.value).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                console.log(data.error)
                $("#locationData").css({"color":"red"})
                $( "#locationData" ).text(data.error)
                $( "#forcastData" ).text("")

            } else {
                $("#locationData").css({"color":"green"})
                $("#forcastData").css({"color":"green"})

                if(data.location=="Israel") // #Free_Palestine
                  $( "#locationData" ).text("Do you mean Palestine!")
                else
                  $( "#locationData" ).text(data.location)
                $( "#forcastData" ).text(data.forecast)
                console.log(data)
            }
        })
    })
    
})



// Help Page 
$("github").click(()=>{
    window.location.href = "https://github.com"
})

$('body').on('click','card',function(){alert('it works');})


