export async function sendEmail(
  emailFreelance: string,
  emailClient: string,
  slots: { date: string; time: string }[]
) {
  try {
    const response = await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailFreelance, emailClient, slots }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error sending email:", errorData.message);
      throw new Error(errorData.message || "Failed to send email");
    }

    console.log("Email sent successfully!");
    return { success: true };
  } catch (error) {
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error in sendEmail function:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
