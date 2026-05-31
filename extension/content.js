let activeElement = null;
let button = null;

document.addEventListener("focusin", (event) => {
  const el = event.target;

  const isTextarea = el.tagName === "TEXTAREA";
  const isInput = el.tagName === "INPUT";
  const isEditable = el.isContentEditable;

  if (isTextarea || isInput || isEditable) {
    activeElement = el;
    showButton(el);
  }
});

function getText(el) {
  if (!el) return "";

  if (
    el.tagName === "TEXTAREA" ||
    el.tagName === "INPUT"
  ) {
    return el.value;
  }

  return el.innerText || "";
}

function showButton(element) {
  if (button) {
    button.remove();
  }

  button = document.createElement("div");

  button.innerHTML = "⚡";

  button.style.position = "fixed";
  button.style.right = "20px";
  button.style.bottom = "20px";
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.background = "#2563eb";
  button.style.color = "white";
  button.style.borderRadius = "50%";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.cursor = "pointer";
  button.style.fontSize = "22px";
  button.style.zIndex = "999999999";

  button.addEventListener("click", async () => {
    try {
      const promptText = getText(activeElement);

      if (!promptText.trim()) {
        alert("Please enter some text first");
        return;
      }

      button.innerHTML = "...";

      const response = await fetch(
        "http://localhost:5000/api/enhance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: promptText,
          }),
        }
      );

      const data = await response.json();

      button.innerHTML = "⚡";

      if (!data.success) {
        alert("Failed to enhance prompt");
        return;
      }

      showPopup(data.enhancedPrompt);
    } catch (error) {
      console.error(error);

      button.innerHTML = "⚡";

      alert("API Error");
    }
  });

  document.body.appendChild(button);
}

function showPopup(prompt) {
  const existing =
    document.getElementById("promptify-popup");

  if (existing) {
    existing.remove();
  }

  const popup = document.createElement("div");

  popup.id = "promptify-popup";

  popup.style.position = "fixed";
  popup.style.top = "80px";
  popup.style.right = "20px";
  popup.style.width = "500px";
  popup.style.background = "white";
  popup.style.padding = "16px";
  popup.style.borderRadius = "12px";
  popup.style.boxShadow =
    "0 10px 30px rgba(0,0,0,.2)";
  popup.style.zIndex = "999999999";

  popup.innerHTML = `
    <h3 style="margin-top:0">
      ✨ Enhanced Prompt
    </h3>

    <textarea
      id="enhancedPrompt"
      style="
        width:100%;
        height:220px;
        padding:10px;
      "
    >${prompt}</textarea>

    <div style="margin-top:10px">
      <button id="usePrompt">
        Use Prompt
      </button>

      <button id="copyPrompt">
        Copy
      </button>

      <button id="closePrompt">
        Close
      </button>
    </div>
  `;

  document.body.appendChild(popup);

  document
    .getElementById("copyPrompt")
    .addEventListener("click", () => {
      navigator.clipboard.writeText(prompt);
      alert("Copied");
    });

  document
    .getElementById("closePrompt")
    .addEventListener("click", () => {
      popup.remove();
    });

  document
    .getElementById("usePrompt")
    .addEventListener("click", () => {
      replacePrompt(prompt);
      popup.remove();
    });
}

function replacePrompt(text) {
  if (!activeElement) return;

  if (
    activeElement.tagName === "TEXTAREA" ||
    activeElement.tagName === "INPUT"
  ) {
    activeElement.value = text;

    activeElement.dispatchEvent(
      new Event("input", {
        bubbles: true,
      })
    );

    return;
  }

  activeElement.innerText = text;

  activeElement.dispatchEvent(
    new Event("input", {
      bubbles: true,
    })
  );
}