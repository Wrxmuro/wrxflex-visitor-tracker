const button = document.getElementById("consentButton");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  button.disabled = true;
  result.classList.remove("error");
  result.textContent = "Bildirim gönderiliyor...";

  try {
    const response = await fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consent: true })
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.message || "İşlem tamamlanamadı.");
    }

    result.textContent = "Teşekkürler. Bildirim başarıyla gönderildi.";
    button.textContent = "Onay alındı ✓";
  } catch (error) {
    result.classList.add("error");
    result.textContent = error.message || "Bir hata oluştu. Daha sonra tekrar deneyin.";
    button.disabled = false;
  }
});
