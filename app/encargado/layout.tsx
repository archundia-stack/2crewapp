import { DemoBar } from "@/components/demo-bar";

export default function EncargadoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col border-x border-line bg-bg">
      <DemoBar />
      <main className="flex-1 px-4 pb-12 pt-6">{children}</main>
    </div>
  );
}
