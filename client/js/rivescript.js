 if (typeof RiveScript === 'undefined') {
    console.error("RiveScript library is not loaded. Please ensure the CDN script tag is correct in home.html.");
} else {
     const bot = new RiveScript();
     bot.sortReplies();

 
     bot.loadFile([
        "../rs/brain.rs"  
    ]).then(loading_done).catch(loading_error);

    function loading_done() {
        console.log("RiveScript loaded successfully!");
         bot.sortReplies();
    }

    function loading_error(error) {
        console.error("Error loading RiveScript:", error);
    }

    const chatArea = document.getElementById('chat-area');
    const inputForm = document.getElementById('input-form');
    const userInput = document.getElementById('user-input');
    const CHAT_USER_ID = "local-user";  

     function appendMessage(message, isUser) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatArea.appendChild(messageElement);
         chatArea.scrollTop = chatArea.scrollHeight;
    }

     inputForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 

        const userQuery = userInput.value.trim();
        if (userQuery === "") {
            return;
        }

         appendMessage(userQuery, true);

         userInput.value = '';

         try {
             if (bot.loading) {
                 appendMessage("Please wait, my brain is still loading...", false);
                 return;
            }

            const botResponse = await bot.reply(CHAT_USER_ID, userQuery);

             appendMessage(botResponse, false);

        } catch (error) {
            console.error("Error getting bot reply:", error);
            appendMessage("Sorry, the chat service is currently unavailable. Please check the console for errors.", false);
        }
    });
}