document.getElementById("checkBtn").addEventListener("click", async () => {
  const password = document.getElementById("password").value.trim();
  const result = document.getElementById("result");

  if (!password) {
    result.textContent = "Please enter a password!";
    result.style.color = "yellow";
    return;
  }

  const response = await fetch("/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();
  result.textContent = "Strength: " + data.strength;

  if (data.strength.includes("Weak")) result.style.color = "red";
  else if (data.strength.includes("Moderate")) result.style.color = "orange";
  else result.style.color = "limegreen";
});
