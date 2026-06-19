import { useState } from "react";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(6, "Укажите телефон").max(40),
  company: z.string().trim().min(2, "Укажите компанию").max(120),
  amount: z.string().trim().max(60).optional().or(z.literal("")),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormState = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = { name: "", phone: "", company: "", amount: "", comment: "" };

export function LeadForm() {
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Пожалуйста, проверьте поля формы");
      return;
    }
    setPending(true);
    // Simulate request — wire to backend later if needed.
    await new Promise((r) => setTimeout(r, 700));
    setPending(false);
    setSubmitted(true);
    toast.success("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
    setData(initial);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elev-2">
          <div className="grid lg:grid-cols-12">
            {/* Left copy */}
            <div className="relative overflow-hidden bg-gradient-navy p-10 text-[--color-mist] lg:col-span-5 lg:p-14">
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-[--color-emerald]/25 blur-[120px]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/70">
                  Заявка
                </div>
                <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-white md:text-5xl text-balance">
                  Обсудим вашу задачу
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/75 text-pretty">
                  Расскажите о сделке — подберём оптимальную схему оплаты, согласуем сроки и комиссию.
                  Ответим в течение рабочего дня.
                </p>

                <ul className="mt-10 space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[--color-emerald]">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/50">Телефон</div>
                      <a href="tel:+78005005050" className="font-semibold text-white hover:text-[--color-emerald-soft]">
                        +7 (800) 500-50-50
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[--color-emerald]">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/50">Email</div>
                      <a href="mailto:hello@paychina.ru" className="font-semibold text-white hover:text-[--color-emerald-soft]">
                        hello@paychina.ru
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[--color-emerald]">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/50">Telegram</div>
                      <a href="https://t.me/paychina" className="font-semibold text-white hover:text-[--color-emerald-soft]">
                        @paychina
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 lg:col-span-7 lg:p-14">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[--color-emerald]/15 text-[--color-emerald]">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Заявка отправлена</h3>
                  <p className="mt-2 max-w-md text-muted-foreground">
                    Спасибо! Персональный менеджер свяжется с вами в ближайшее рабочее время.
                  </p>
                  <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                    Отправить ещё одну заявку
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Имя" error={errors.name}>
                    <Input id="name" autoComplete="name" placeholder="Иван Иванов" value={data.name} onChange={update("name")} />
                  </Field>
                  <Field id="phone" label="Телефон" error={errors.phone}>
                    <Input id="phone" type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" value={data.phone} onChange={update("phone")} />
                  </Field>
                  <Field id="company" label="Компания" error={errors.company}>
                    <Input id="company" autoComplete="organization" placeholder="ООО «Импорт»" value={data.company} onChange={update("company")} />
                  </Field>
                  <Field id="amount" label="Сумма платежа" error={errors.amount}>
                    <Input id="amount" placeholder="например, ¥ 250 000" value={data.amount} onChange={update("amount")} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id="comment" label="Комментарий" error={errors.comment}>
                      <Textarea
                        id="comment"
                        rows={4}
                        placeholder="Кратко опишите задачу: тип товара, поставщик, желаемые сроки."
                        value={data.comment}
                        onChange={update("comment")}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      disabled={pending}
                      className="h-12 w-full bg-gradient-emerald text-base font-semibold text-accent-foreground shadow-emerald hover:opacity-95 sm:w-auto"
                    >
                      {pending ? "Отправляем..." : (
                        <>
                          Получить консультацию
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
