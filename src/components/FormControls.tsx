import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface FieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
}

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  label: string;
}

export function Field({ label, ...props }: FieldProps) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
      {label}
      <input
        {...props}
        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}

export function Textarea({ label, ...props }: TextareaProps) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
      {label}
      <textarea
        {...props}
        className="min-h-24 resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-base font-black text-slate-950">{title}</h2>
      {children}
    </section>
  );
}
