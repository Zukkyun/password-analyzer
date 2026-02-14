const input = document.getElementById("passwordInput");
const bar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const entropyText = document.getElementById("entropyText");
const crackTimeText = document.getElementById("crackTimeText");

input.addEventListener("input", () => {
  const password = input.value;
  const entropy = calculateEntropy(password);
  updateUI(entropy);
});

function calculateEntropy(password) {
  if (!password) return 0;

  let charsetSize = 0;

  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

  return password.length * Math.log2(charsetSize);
}

function updateUI(entropy) {
  let strength = "";
  let color = "";
  let percent = Math.min(entropy / 128 * 100, 100);

  if (entropy < 28) {
    strength = "Very Weak";
    color = "red";
  } else if (entropy < 36) {
    strength = "Weak";
    color = "orange";
  } else if (entropy < 60) {
    strength = "Moderate";
    color = "yellow";
  } else if (entropy < 128) {
    strength = "Strong";
    color = "lime";
  } else {
    strength = "Very Strong";
    color = "green";
  }

  bar.style.width = percent + "%";
  bar.style.background = color;

  strengthText.textContent = "Strength: " + strength;
  entropyText.textContent = "Entropy: " + entropy.toFixed(2) + " bits";

  const crackSeconds = Math.pow(2, entropy) / 1e9;
  crackTimeText.textContent = "Estimated crack time (1B attempts/sec): " 
    + formatTime(crackSeconds);
}

function formatTime(seconds) {
  if (seconds < 60) return seconds.toFixed(2) + " seconds";
  if (seconds < 3600) return (seconds/60).toFixed(2) + " minutes";
  if (seconds < 86400) return (seconds/3600).toFixed(2) + " hours";
  if (seconds < 31536000) return (seconds/86400).toFixed(2) + " days";
  return (seconds/31536000).toFixed(2) + " years";
}
