// Update both form fields when a user changes the value.
var updateAll = function (e) {
  var els = document.getElementsByClassName(e.currentTarget.className)
  for (var i = 0; i < els.length; i++) {
    els[i].value = e.currentTarget.value
  }
  updateCalculators()
}

// Add event listeners to input
var repRefClients = document.getElementsByClassName("repeat-referral")
for (var i = 0; i < repRefClients.length; i++) {
  repRefClients[i].addEventListener("change", updateAll)
}
var avgCom = document.getElementsByClassName("average-commission")
for (var i = 0; i < avgCom.length; i++) {
  avgCom[i].addEventListener("change", updateAll)
}
var emailIn = document.getElementsByClassName("emailInput")
for (var i = 0; i < emailIn.length; i++) {
  emailIn[i].addEventListener("change", updateAll)
}
var addEmailButtons = document.getElementsByClassName("addEmail")
for (var i = 0; i < addEmailButtons.length; i++) {
  //addEmailButtons[i].addEventListener("click", addEmail)
}

function updateCalculators() {
  var retireProfit = document.getElementById("retire-results")
  retireProfit.textContent = "$" + parseFloat(repRefClients[0].value * avgCom[0].value * 0.2 * 3).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  var grossProfit = document.getElementById("grossProfit")
  grossProfit.textContent = "$" + parseFloat(repRefClients[1].value * avgCom[1].value * 0.8 * 3).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  var additionalIncome = document.getElementById("additionalIncome")
  additionalIncome.textContent = "$" + parseFloat(repRefClients[1].value * avgCom[1].value / 2 * 3).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  var adoptResults = document.getElementById("adopt-results")
  adoptResults.textContent = "$" + parseFloat((repRefClients[1].value * avgCom[1].value * 0.8 * 3) + (repRefClients[1].value * avgCom[1].value / 2 * 3)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Send email and display results
document.getElementById("submit-retire").addEventListener("click", e => {
  if (document.getElementById("emailInput1").checkValidity() == true) {
    var res = "<h1>Results</h1><table style=\"border: 1px solid #000;\"> <tr> <td style=\"border: 1px solid #000;\">"+repRefClients[0].value+"</td> <td style=\"border: 1px solid #000;\">Number of Repeat and Referral Clients per Year</td> <tr> <td style=\"border: 1px solid #000;\">"+avgCom[0].value+"</td> <td style=\"border: 1px solid #000;\">Average Commission</td> </tr> <tr> <td style=\"border: 1px solid #000;\">"+document.getElementById("retire-results").textContent+"</td> <td style=\"border: 1px solid #000;\"><b>Net Profit</b> to Retiring Agent Over 3 Years</td> </tr> </table>"

    // Send email with res
    Email.send(
      "jackrwoods@gmail.com",
      document.getElementsByClassName("emailInput")[0].value,
      "Retiring Agent Calculator Results",
      res + "\n<a href='http://thegoldenhandoff.com/calculator'>Take the calculator again.</a>",
      {token: "7f1e0e1c-26de-4453-b220-b4ad28cc017a", callback: function done(message) {
        Email.send(
          "jackrwoods@gmail.com",
          document.getElementsByClassName("emailInput")[0].value,
          "Sample Notification - Retiring Agent Calculator Results",
          document.getElementsByClassName("emailInput")[0].value + " requested for their results to be emailed to them with server status message: "+message+". \n" + res + "\n<a href='http://thegoldenhandoff.com/calculator'>Take the calculator again.</a>",
          {token: "7f1e0e1c-26de-4453-b220-b4ad28cc017a", callback: function done(message) { console.log(message) }}
        )
      }}
    )

  }
})
document.getElementById("submit-adopt").addEventListener("click", e => {
  var res = "<h1>Results</h1><table style=\"border: 1px solid #000;\"> <tr> <td style=\"border: 1px solid #000;\">"+repRefClients[1].value+"</td> <td style=\"border: 1px solid #000;\">Number of Repeat and Referral Clients per Year</td> <tr> <td style=\"border: 1px solid #000;\">"+avgCom[1].value+"</td> <td style=\"border: 1px solid #000;\">Average Commission</td> </tr> <tr> <td style=\"border: 1px solid #000;\">"+document.getElementById("grossProfit").textContent+"</td> <td style=\"border: 1px solid #000;\">Gross Profit to Retiring Agent Database Over 3 Years</td> </tr> <tr> <td style=\"border: 1px solid #000;\">"+document.getElementById("additionalIncome").textContent+"</td> <td style=\"border: 1px solid #000;\">Additional Income</td> </tr> <tr> <td style=\"border: 1px solid #000;\">"+document.getElementById("adopt-results").textContent+"</td> <td style=\"border: 1px solid #000;\"><b>Net Profit</b> to Retiring Agent Over 3 Years</td> </tr> </table>"

  if (document.getElementById("emailInput2").checkValidity() == true) {

    Email.send(
      "jackrwoods@gmail.com",
      document.getElementsByClassName("emailInput")[1].value,
      "Retiring Agent Calculator Results",
      res + "<br /><a href='http://thegoldenhandoff.com/calculator'>Take the calculator again.</a>",
      {token: "7f1e0e1c-26de-4453-b220-b4ad28cc017a", callback: function done(message) {
        Email.send(
          "jackrwoods@gmail.com",
          document.getElementsByClassName("emailInput")[1].value,
          "Sample Notification - Retiring Agent Calculator Results",
          document.getElementsByClassName("emailInput")[1].value + " requested for their results to be emailed to them with server status message: "+message+". \n" + res + "\n<a href='http://thegoldenhandoff.com/calculator'>Take the calculator again.</a>",
          {token: "7f1e0e1c-26de-4453-b220-b4ad28cc017a", callback: function done(message) { console.log(message) }}
        )
      }}
    )
  }
})
