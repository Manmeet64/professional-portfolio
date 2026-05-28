import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "manmeetsingh642005@gmail.com",
      replyTo: undefined,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #f9f9f7; border-radius: 12px;">
          <p style="font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9496A8; margin: 0 0 20px;">Message via manmeetsingh.dev</p>
          <h2 style="font-size: 22px; font-weight: 700; color: #1A1C24; margin: 0 0 6px; letter-spacing: -0.03em;">${name}</h2>
          <p style="font-size: 13px; color: #9496A8; margin: 0 0 28px;">sent you a message</p>
          <div style="background: #fff; border: 1px solid #E2DDD5; border-radius: 10px; padding: 20px 24px;">
            <p style="font-size: 15px; color: #52556A; line-height: 1.7; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
