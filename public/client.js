const socket = io();

let userName;
let textare = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

do {
  userName = prompt("Please neter your name.");
} while (!userName);

textare.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage(event.target.value);
    textare.value = "";
  }
});

function sendMessage(msgs) {
  let msg = {
    user: userName,
    message: msgs.trim(),
  };
  //apend
  appendMessage(msg, "outgoing");
  scrollToBottom();
  //send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//receive message

socket.on("message", (msg) => {
  console.log(msg);
  appendMessage(msg, "incoming");
  let isFocus = document.visibilityState;
  if (isFocus == "visible") {
    scrollToBottom();
  }
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
