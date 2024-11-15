import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Variáveis STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET ausentes.");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    console.error("Assinatura Stripe ausente.");
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const text = await request.text();

  let event: Stripe.Event;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Evento Stripe recebido:", event.type);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Erro ao validar o evento Stripe:", err.message);
    }
    return NextResponse.json({ error: "Invalid Stripe signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "invoice.paid": {
        console.log("Processando evento 'invoice.paid'...");
        const invoice = event.data.object as Stripe.Invoice;
        const { customer, subscription } = invoice;
        const clerkUserId = invoice.metadata?.clerk_user_id;

        if (!clerkUserId) {
          console.error("Clerk User ID ausente no metadata do evento.");
          return NextResponse.json({ error: "Missing clerk_user_id" }, { status: 400 });
        }

        await clerkClient.users.updateUser(clerkUserId, {
          privateMetadata: {
            stripeCustomerId: customer as string,
            stripeSubscriptionId: subscription as string,
          },
          publicMetadata: {
            subscriptionPlan: "premium",
          },
        });
        console.log(`Usuário ${clerkUserId} atualizado para plano premium.`);
        break;
      }

      case "customer.subscription.deleted": {
        console.log("Processando evento 'customer.subscription.deleted'...");
        const subscription = event.data.object as Stripe.Subscription;
        const clerkUserId = subscription.metadata?.clerk_user_id;

        if (!clerkUserId) {
          console.error("Clerk User ID ausente no metadata da assinatura.");
          return NextResponse.json({ error: "Missing clerk_user_id" }, { status: 400 });
        }

        await clerkClient.users.updateUser(clerkUserId, {
          privateMetadata: {
            stripeCustomerId: null,
            stripeSubscriptionId: null,
          },
          publicMetadata: {
            subscriptionPlan: null,
          },
        });
        console.log(`Plano premium removido para o usuário ${clerkUserId}.`);
        break;
      }

      default:
        console.log(`Evento ${event.type} não processado.`);
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Erro ao processar o evento:", err.message);
    }
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
};
