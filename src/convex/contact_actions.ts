"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

type ResendResponse = {
  id?: string;
  error?: { message?: string } | string;
};

export const sendEmailAndSave = action({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, { name, email, message }) => {
    const apiKey = process.env.RESEND_API_KEY;
    let status: "sent" | "failed" = "failed";
    let providerMessageId: string | undefined;
    let errorMsg: string | undefined;

    try {
      if (!apiKey) {
        throw new Error(
          "Missing RESEND_API_KEY. Add it in Integrations/API Keys and redeploy."
        );
      }

      // Build a simple, readable email
      const html = `
        <div style="font-family: Inter, system-ui, sans-serif; line-height:1.6">
          <h2>New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${message}</pre>
          <hr />
          <p style="font-size:12px;color:#666">Sent via Gradient Portfolio</p>
        </div>
      `;

      const payload = {
        from: "Gradient Portfolio <onboarding@resend.dev>", // use Resend's verified sender for reliable delivery
        to: ["veerachinnumanikandan1@gmail.com"],
        subject: `New contact from ${name}`,
        html,
        reply_to: email,
      };

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as ResendResponse;

      if (!res.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : data?.error?.message || `HTTP ${res.status}`
        );
      }

      status = "sent";
      providerMessageId = data.id;
    } catch (err) {
      status = "failed";
      errorMsg = err instanceof Error ? err.message : String(err);
    } finally {
      await ctx.runMutation(internal.contact.saveMessage, {
        name,
        email,
        message,
        status,
        providerMessageId,
        error: errorMsg,
      });
    }

    if (status === "failed") {
      throw new Error(errorMsg || "Failed to send email");
    }

    return { success: true, id: providerMessageId };
  },
});