"use client";

import { useState, useTransition } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SaveIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Le sujet doit contenir au moins 3 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {};
      result.error.errors.forEach((error) => {
        const path = error.path[0] as keyof ContactFormData;
        fieldErrors[path] = error.message as any;
      });
      setErrors(fieldErrors);
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }

    startTransition(async () => {
      try {
        // For now, just log to console (DB integration deferred)
        console.log("Contact form submission:", result.data);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});

        toast.success("Merci! Votre message a été envoyé avec succès.");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
          Nom complet *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Votre nom"
          value={formData.name}
          onChange={handleChange}
          disabled={isPending}
          className="h-11 rounded-xl border-slate-200 bg-white"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
          Adresse email *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isPending}
          className="h-11 rounded-xl border-slate-200 bg-white"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
          Téléphone (optionnel)
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+221 77 123 45 67"
          value={formData.phone}
          onChange={handleChange}
          disabled={isPending}
          className="h-11 rounded-xl border-slate-200 bg-white"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
          Sujet *
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder="Sujet de votre message"
          value={formData.subject}
          onChange={handleChange}
          disabled={isPending}
          className="h-11 rounded-xl border-slate-200 bg-white"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Votre message..."
          value={formData.message}
          onChange={handleChange}
          disabled={isPending}
          rows={6}
          className="rounded-xl border-slate-200 bg-white resize-none"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#1E40AF] hover:bg-[#1e3a8a] text-white h-12 text-base font-bold rounded-xl"
      >
        {isPending ? (
          <>
            <span className="inline-block animate-spin mr-2">⏳</span>
            Envoi en cours...
          </>
        ) : (
          <>
            <HugeiconsIcon icon={SaveIcon} size={18} className="mr-2" />
            Envoyer le message
          </>
        )}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        * Champs obligatoires
      </p>
    </form>
  );
}
