import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim().slice(0, 150),
      message: String(data.get("message") ?? "").trim(),
    };
    if (payload.name.length < 2) { setMessage("Indiquez votre nom (2 caractères minimum)."); setState("error"); return; }
    if (payload.email.length < 3) { setMessage("Indiquez une adresse email valide."); setState("error"); return; }
    if (payload.message.length < 10) { setMessage("Votre message doit contenir au moins 10 caractères."); setState("error"); return; }
    setState("sending");
    const { error } = await supabase.from("contact_messages").insert(payload);
    if (error) {
      setMessage("L’envoi a échoué. Réessayez dans un instant.");
      setState("error");
      return;
    }
    form.reset();
    setMessage("Message bien reçu. Je vous répondrai rapidement.");
    setState("sent");
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-form-row">
      <label>Nom<Input name="name" autoComplete="name" required placeholder="Votre nom" /></label>
      <label>Email<Input name="email" type="email" inputMode="email" autoComplete="email" required placeholder="vous@email.com" /></label>
    </div>
    <label>Sujet<Input name="subject" placeholder="Votre projet" /></label>
    <label>Message<Textarea name="message" required minLength={10} rows={5} placeholder="Parlez-moi de votre idée…" /></label>
    <div className="contact-form-action">
      <Button type="submit" variant="ink" disabled={state === "sending"}>{state === "sending" ? "Envoi…" : <>Envoyer <Send /></>}</Button>
      <p role="status">{message}</p>
    </div>
  </form>;
}