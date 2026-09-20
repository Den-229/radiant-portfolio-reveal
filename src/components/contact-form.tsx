import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      subject: String(form.get("subject") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      setState("error");
      return;
    }
    const { error } = await supabase.from("contact_messages").insert(payload);
    if (error) {
      setState("error");
      return;
    }
    event.currentTarget.reset();
    setState("sent");
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-form-row">
      <label>Nom<Input name="name" autoComplete="name" required placeholder="Votre nom" /></label>
      <label>Email<Input name="email" type="email" inputMode="email" autoComplete="email" required placeholder="vous@email.com" /></label>
    </div>
    <label>Sujet<Input name="subject" placeholder="Votre projet" /></label>
    <label>Message<Textarea name="message" required rows={5} placeholder="Parlez-moi de votre idée…" /></label>
    <div className="contact-form-action">
      <Button type="submit" variant="ink" disabled={state === "sending"}>{state === "sending" ? "Envoi…" : <>Envoyer <Send /></>}</Button>
      <p role="status">{state === "sent" ? "Message bien reçu. Je vous répondrai rapidement." : state === "error" ? "Vérifiez les champs, puis réessayez." : ""}</p>
    </div>
  </form>;
}