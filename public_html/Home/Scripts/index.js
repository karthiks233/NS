var myIndex = 0;
carousel();
    
function carousel() {
  var i;
  var x = document.getElementsByClassName("nsSlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 4000); // Change image every 2 seconds
}

function toggleNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


function scrollToTop() {
  window.scrollTo(0, 0);
}



function readMore(){
  $("#aboutPt2").show();
  $("#readMoreBtn").hide();
  $("#readLessBtn").show();
}

function readLess(){
  $("#aboutPt2").hide();
  $("#readMoreBtn").show();
  $("#readLessBtn").hide();
}


function nsScroll(n){
  console.log(n)
  if(n==0){
    window.scrollTo(0, 0);
    readLess();
  }
  else if(n==1){    
    window.scrollTo(0, 400);
    readMore();
  }
}


function openRazorpayPayment(){
  // Replace '/create_order.php' with your backend endpoint. 
  // The backend should create a Razorpay order and return order details as JSON.
  fetch('/create_order.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 50000 })  // example: amount in paise (₹500)
  })
  .then(response => response.json())
  .then(data => {
    var options = {
      "key": "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key ID
      "amount": data.amount,      // e.g. "50000" 
      "currency": data.currency,  // e.g. "INR"
      "name": "Northern Suites",
      "description": "Room Booking Payment",
      "order_id": data.order_id,  // Order ID returned from your backend
      "handler": function (response){
          // Payment success callback
          console.log("Payment ID:", response.razorpay_payment_id);
          // Optionally, inform your backend about this payment
      },
      "prefill": {
         "name": "",
         "email": "",
         "contact": ""
      },
      "theme": {
         "color": "#F37254"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  })
  .catch(function(error){
    console.error('Error while creating order:', error);
  });
}






function nsOpen(n){
  if(n==1)
    window.open('https://www.facebook.com/northernsuites/','_blank')
  else if(n==2)
    window.open('https://www.instagram.com/northern_suites_1/','_blank')
  else if(n==3)
    window.open('https://www.google.com/search?q=Northern+Suites+%40+AECS+Layout&rlz=1C1ONGR_enIN1015IN1015&oq=Northern+Suites+%40+AECS+Layout&aqs=chrome..69i57j69i60.915j0j9&sourceid=chrome&ie=UTF-8','_blank')
  else if(n==4)
    window.open("https://goo.gl/maps/xGFyhd8ZQHfRYp7t7","_blank");
  else if(n==5)
    window.open("https://api.whatsapp.com/send?phone=919742612341","_blank");

}






function openDirections(){
  window.open("https://goo.gl/maps/xGFyhd8ZQHfRYp7t7","_blank");
}

function openEnquiry(){
  window.open("https://api.whatsapp.com/send?phone=919742612341","_blank");
}

document.addEventListener('DOMContentLoaded', function() {
  const chatbotContainer = document.getElementById('ns-chatbot-container');
  const chatbotToggle = document.getElementById('ns-chatbot-toggle');
  const chatbotBox = document.getElementById('ns-chatbot-box');
  const chatbotClose = document.querySelector('.ns-chatbot-close');
  const chatbotMessages = document.getElementById('ns-chatbot-messages');
  const chatbotInput = document.getElementById('ns-chatbot-input');
  const chatbotSend = document.getElementById('ns-chatbot-send');

  // Show the chatbot after a 2-second delay
  setTimeout(function() {
      chatbotContainer.classList.remove('ns-chatbot-closed');

      // Send a welcome message
      appendMessage('ns-bot-message', 'Hello! How can I assist you today?');
  }, 1500);

  function appendMessage(className, message) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('ns-chatbot-message', className);
      messageDiv.textContent = message;
      chatbotMessages.appendChild(messageDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
  }



  // Toggle Chatbot
  chatbotToggle.addEventListener('click', function() {
    chatbotContainer.classList.toggle('ns-chatbot-closed');
  });

  chatbotClose.addEventListener('click', function() {
    chatbotContainer.classList.add('ns-chatbot-closed');
  });

  // Send Message
  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
      // User Message
      appendMessage('ns-user-message', message);
      chatbotInput.value = '';

      // Bot Response (Basic Simulation)
      setTimeout(function() {
        const botResponse = getBotResponse(message);
        appendMessage('ns-bot-message', botResponse);
      }, 500); // Simulate delay for bot response
    }
  }

//   function appendMessage(className, message) {
//     const messageDiv = document.createElement('div');
//     messageDiv.classList.add('ns-chatbot-message', className);
//     messageDiv.textContent = message;
//     chatbotMessages.appendChild(messageDiv);
//     chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
//   }

  // Make sure `nlp` is loaded globally or passed into the function
function getBotResponse(message) {
    const doc = nlp(message.toLowerCase());

    // --- Intent Recognition ---
    if (doc.has('(room|rooms|accommodation)')) {
        return "We offer Premium and Premium Plus rooms. Would you like to know more? Connect with us at+91-9886035484 or karthick@northern-suites.com.";
    } else if (doc.has('(restaurant|food|dining)')) {
        return "Our rooftop restaurant serves multi-cuisine dishes. We can serve your specific dietary requirements?";
    } else if (doc.has('(location|address|where)')) {
        return "We are located at No. 1623, Kundalahalli Main Road, 'E' Block, AECS Layout, Kundalahalli, Brookefield, Bengaluru 560037.";
    } else if (doc.has('(contact|phone|email|reach out)')) {
        return "You can reach us at +91-9886035484 or karthick@northern-suites.com.";
    } else if (doc.has('(hello|hi|hey)')) {
        return "Hello! How can I assist you today?";
    } else if (doc.has('(time|timing|hour|open)')) {
        return "We are open 24 hours, please reach out to us at +91-9886035484 or karthick@northern-suites.com, you can additionally walk in to check in with us.";
    } else if (doc.has('(thank|bye|goodbye)')) {
        return "Thank you for connecting with us. We are happy to host you and have you with us!";
    } else {
        return "Thank you for connecting with us. Please reach out to us at +91-9886035484 or karthick@northern-suites.com for further details.";
    }
}

  // Optional: Close the chatbot when clicking outside of it
  document.addEventListener('click', function(event) {
    if (!chatbotContainer.contains(event.target) && !chatbotToggle.contains(event.target)) {
      chatbotContainer.classList.add('ns-chatbot-closed');
    }
  });
});