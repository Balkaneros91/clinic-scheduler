import { Resend } from "resend";

type SendAbsenceRequestNotificationParams = {
  employeeName: string;
  absenceType: string;
  startDate: Date;
  endDate: Date | null;
  notes?: string | null;
};

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAbsenceRequestNotification({
  employeeName,
  absenceType,
  startDate,
  endDate,
  notes,
}: SendAbsenceRequestNotificationParams) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resendApiKey || !adminEmail || !fromEmail) {
    console.warn("Missing email notification environment variables.");
    return;
  }

  const resend = new Resend(resendApiKey);

  await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject: "New absence request submitted",
    text: `
New absence request submitted.

Employee: ${employeeName}
Type: ${absenceType}
From: ${startDate.toLocaleDateString("sv-SE")}
To: ${endDate ? endDate.toLocaleDateString("sv-SE") : "Open-ended"}
Notes: ${notes || "-"}

Please review the request in Clinic Scheduler.
    `.trim(),
  });
}
