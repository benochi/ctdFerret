//! User input directly included in HTML - Unsafe
const userInput = "<script>alert('Hacked!');</script>";
document.getElementById("output").innerHTML = userInput;

//!Escaping bad input
// React automatically escapes all content inserted into the JSX before rendering it, unless 
//explicitly told not to do so (via dangerouslySetInnerHTML).
function escapeHTML(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// User input that might contain HTML/JS
const badUserInput = "<script>alert('Hacked!');</script>";

// Escaping malicious characters
const safeText = escapeHTML(userInput);

// Using the escaped string in the HTML
document.getElementById("output").textContent = safeText;  // Using textContent for added safety
