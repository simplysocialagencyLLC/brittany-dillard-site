import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect("/admin/login?error=1");
      }
      throw err;
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
        padding: "1.5rem",
      }}
    >
      <form
        action={login}
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(236,72,153,0.15)",
          borderRadius: "1.5rem",
          padding: "2.5rem 2rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#fff",
            marginBottom: "0.5rem",
          }}
        >
          Team Login
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "2rem" }}>
          Manage participants selected for your box battles.
        </p>

        {error && (
          <p
            style={{
              color: "#ec4899",
              fontSize: "13px",
              marginBottom: "1.5rem",
              background: "rgba(236,72,153,0.08)",
              border: "1px solid rgba(236,72,153,0.2)",
              borderRadius: "0.75rem",
              padding: "0.75rem 1rem",
            }}
          >
            Invalid email or password.
          </p>
        )}

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.75rem",
              color: "#fff",
              fontSize: "14px",
              padding: "0.75rem 1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.75rem",
              color: "#fff",
              fontSize: "14px",
              padding: "0.75rem 1rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#fff",
            background: "linear-gradient(135deg, #ec4899, #be185d)",
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
