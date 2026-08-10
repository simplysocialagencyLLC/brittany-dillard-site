import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import QueryProvider from "@/components/providers/QueryProvider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <QueryProvider>
    <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          background: "radial-gradient(circle, rgba(236,72,153,0.09), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(236,72,153,0.12)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #f472b6, #be185d)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 700,
                fontSize: "15px",
                boxShadow: "0 0 20px rgba(236,72,153,0.35)",
                flexShrink: 0,
              }}
            >
              B
            </div>
            <div>
              <p style={{ fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#ec4899", fontWeight: 700 }}>
                Box Battle Admin
              </p>
              <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.5)" }}>{session.user.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                borderRadius: "0.75rem",
                padding: "0.5rem 1rem",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </form>
        </div>
        <div style={{ padding: "1.5rem" }}>{children}</div>
      </div>
    </div>
    </QueryProvider>
  );
}
