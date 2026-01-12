import { serve } from "@upstash/workflow/nextjs";
import emailjs from "@emailjs/nodejs";
import config from "@/lib/config";
import { db } from "@/app";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

type InitialData = {
  email: string;
  fullName: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendGeneralEmail({
      to_email: email,
      to_name: fullName,
      subject: "Welcome to BookWise, Your Reading Companion!",
      title: "Welcome to BookWise, Your Reading Companion!",
      message: `Welcome to BookWise! We're excited to have you join our community of book enthusiasts. Explore a wide range of books, borrow with ease, and manage your reading journey seamlessly.<br><br>Get started by logging in to your account:`,
      button_text: "Login to BookWise",
      button_link: `${config.env.apiEndpoint}/sign-in`,
      closing: "Happy reading,",
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendGeneralEmail({
          to_email: email,
          to_name: fullName,
          subject: "We Miss You at BookWise!",
          title: "We Miss You at BookWise!",
          message: `It's been a while since we last saw you—over three days, to be exact! New books are waiting for you, and your next great read might just be a click away.<br><br>Come back and explore now:`,
          button_text: "Explore Books on BookWise",
          button_link: `${config.env.apiEndpoint}/books`,
          closing: "See you soon,",
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendGeneralEmail({
          to_email: email,
          to_name: fullName,
          subject: "Your Monthly BookWise Update",
          title: "Congratulations on Reaching a New Milestone!",
          message: `Great news! You've reached a new milestone in your reading journey with BookWise. 🎉 Whether it's finishing a challenging book, staying consistent with your reading goals, or exploring new genres, your dedication inspires us.<br><br>Keep the momentum going—there are more exciting books and features waiting for you!<br><br>Log in now to discover your next adventure:`,
          button_text: "Discover New Reads",
          button_link: `${config.env.apiEndpoint}/books`,
          closing: "Keep the pages turning,",
        });
      });
    }
    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

async function sendGeneralEmail(data: {
  to_email: string;
  to_name: string;
  subject: string;
  title: string;
  message: string;
  button_text?: string;
  button_link?: string;
  closing: string;
}) {
  try {
    const response = await emailjs.send(
      config.env.emailJs.serviceId,
      config.env.emailJs.generalId,
      {
        to_email: data.to_email,
        to_name: data.to_name,
        subject: data.subject,
        title: data.title,
        message: data.message,
        button_text: data.button_text || "",
        button_link: data.button_link || "",
        closing: data.closing,
      },
      {
        publicKey: config.env.emailJs.publicKey,
      }
    );

    console.log(`✅ Email sent to ${data.to_email}:`, response.status);
    return response;
  } catch (error) {
    console.error(`❌ Failed to send email to ${data.to_email}:`, error);
    throw error;
  }
}

type UserState = "non-active" | "active";

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active";
  }

  return "active";
};
