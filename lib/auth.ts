import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Gates /admin. Identity is verified by King Kaly's API (partner API key +
// this specific person's email/password, checked against partner_users) —
// this app has no user database of its own. NextAuth just owns the resulting
// session/cookie on this domain.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Team Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email : undefined;
        const password = typeof credentials?.password === "string" ? credentials.password : undefined;
        if (!email || !password) return null;

        const apiUrl = process.env.KING_KALY_API_URL;
        const apiKey = process.env.KING_KALY_API_KEY;
        if (!apiUrl || !apiKey) {
          console.error("[AUTH] KING_KALY_API_URL / KING_KALY_API_KEY not configured");
          return null;
        }

        try {
          const res = await fetch(`${apiUrl}/api/partners/brittany-dillard/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ email, password }),
          });
          if (!res.ok) return null;
          const data = await res.json();
          if (!data?.user) return null;
          return { id: data.user.id, name: data.user.name, email: data.user.email };
        } catch (err) {
          console.error("[AUTH] King Kaly login API request failed:", err);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  trustHost: true,
});
