import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SeoHead } from "@/components/SeoHead";

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [sessionReady, setSessionReady] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id in the URL.");
        setLoading(false);
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!active) return;
      if (!sess.session) {
        setSessionReady(false);
        setLoading(false);
        return;
      }
      setSessionReady(true);
      const { data, error: detailsError } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (detailsError) {
        setError(detailsError.message ?? "Could not load this authorization request.");
        setLoading(false);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId, sessionReady]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    setLoading(true);
    setSessionReady(true);
  };

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError(null);
    const { data, error: decideError } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (decideError) {
      setBusy(false);
      setError(decideError.message ?? "The authorization server rejected this request.");
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect was returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "this app";

  return (
    <>
      <SeoHead
        path="/.lovable/oauth/consent"
        title="Authorize access | BoldREMO"
        description="Approve or deny access to your BoldREMO account."
        noindex
      />
      <main className="min-h-screen bg-muted flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-serif">
                {sessionReady ? `Connect ${clientName} to BoldREMO` : "Sign in to continue"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              {loading && <p className="text-sm text-muted-foreground text-center">Loading…</p>}

              {!loading && !sessionReady && (
                <form onSubmit={signIn} className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Sign in with your BoldREMO account to review this connection request.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="consent-email">Email</Label>
                    <Input
                      id="consent-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consent-password">Password</Label>
                    <Input
                      id="consent-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={busy}>
                    {busy ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              )}

              {!loading && sessionReady && details && (
                <>
                  <p className="text-sm text-muted-foreground">
                    This lets {clientName} use this app as you. It does not bypass this app's
                    permissions or backend policies.
                  </p>
                  {details?.client?.redirect_uri && (
                    <p className="text-xs text-muted-foreground break-all">
                      Redirects to: {details.client.redirect_uri}
                    </p>
                  )}
                  <div className="flex gap-3 pt-2">
                    <Button className="flex-1" disabled={busy} onClick={() => decide(true)}>
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      disabled={busy}
                      onClick={() => decide(false)}
                    >
                      Cancel connection
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default OAuthConsent;
