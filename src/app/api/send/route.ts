// src/pages/api/send.ts
import { EmailTemplate } from '@/components';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.API_KEY_RESEND_AVEC);

export async function POST(req: Request) {
  try {
    // Lee los datos enviados en el cuerpo de la solicitud
    const { name, phone, locality, consultation, service, email, brand, lastname } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      // from: 'MiNegocio <mi-email@mi-dominio.com>',
      to: [email], // Usa el email proporcionado por el usuario
      subject: `Avec - Consulta de ${name}`, // Personaliza el asunto
      react: EmailTemplate({ name, phone, locality, consultation, service, email, brand, lastname }) as React.ReactElement, // Pasa los datos al template
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}