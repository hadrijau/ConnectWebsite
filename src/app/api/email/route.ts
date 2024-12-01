import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { emailClient, emailFreelance, slots } = await req.json();

    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const slotDetails = slots
      .map(
        (slot: { date: string; time: string }, index: number) =>
          `Date ${index + 1}: ${slot.date} à ${slot.time}`
      )
      .join("\n");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      // TODO: Change the recipient email
      to: "hadrien.jaubert99@gmail.com", // Recipient email
      subject: "Dates disponibles pour un entretien",
      text: `Voici les dates disponibles:\n\n${slotDetails}.
       \n\n Email du client: ${emailClient}.
       \n\nEmail du freelance: ${emailFreelance}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
