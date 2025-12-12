import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Leaf, Sparkles, Heart, Key, Mail, Lock, User, Apple, Salad, Dumbbell, Droplets } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [specialKey, setSpecialKey] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const VALID_KEY = "K3L8356N45NER34";
    if (specialKey !== VALID_KEY) {
      toast({
        title: "Chave inválida",
        description: "A chave de acesso informada não é válida.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: fullName,
          });

        if (profileError) throw profileError;

        toast({
          title: "Conta criada com sucesso!",
          description: "Você já pode fazer login.",
        });

        setEmail("");
        setPassword("");
        setFullName("");
        setSpecialKey("");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login realizado com sucesso!",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-green-primary/5 via-background to-pink-accent/5">
      {/* Animated background mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] -top-[400px] -left-[200px] bg-gradient-to-br from-green-primary/30 to-green-card/20 rounded-full blur-3xl pulse-glow" />
        <div className="absolute w-[600px] h-[600px] -bottom-[300px] -right-[200px] bg-gradient-to-br from-pink-accent/25 to-orange-accent/15 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute w-[500px] h-[500px] top-1/4 right-1/4 bg-gradient-to-br from-blue-accent/15 to-green-primary/10 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "4s" }} />
      </div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(160_65%_45%/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(160_65%_45%/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] float-animation">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-primary/20 to-green-card/30 backdrop-blur-sm flex items-center justify-center shadow-glow-green">
            <Apple className="w-8 h-8 text-green-primary" />
          </div>
        </div>
        <div className="absolute top-[20%] right-[15%] float-animation-delayed">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-accent/20 to-orange-accent/30 backdrop-blur-sm flex items-center justify-center shadow-glow-pink">
            <Heart className="w-7 h-7 text-pink-accent" />
          </div>
        </div>
        <div className="absolute bottom-[25%] left-[8%] float-animation-slow">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-accent/20 to-green-primary/30 backdrop-blur-sm flex items-center justify-center shadow-glow-blue">
            <Droplets className="w-6 h-6 text-blue-accent" />
          </div>
        </div>
        <div className="absolute bottom-[15%] right-[10%] float-animation">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-accent/20 to-yellow-bg/50 backdrop-blur-sm flex items-center justify-center">
            <Dumbbell className="w-7 h-7 text-orange-accent" />
          </div>
        </div>
        <div className="absolute top-[45%] left-[5%] float-animation-delayed">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-card/20 to-green-primary/30 backdrop-blur-sm flex items-center justify-center">
            <Salad className="w-5 h-5 text-green-card" />
          </div>
        </div>
        <div className="absolute top-[60%] right-[8%] float-animation-slow">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-accent/15 to-blue-accent/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-pink-accent" />
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-md relative z-10 animate-scale-in">
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-primary via-blue-accent to-pink-accent rounded-3xl blur-xl opacity-20" />
        
        <div className="relative glass-strong rounded-3xl shadow-elevated overflow-hidden">
          {/* Card header with gradient */}
          <div className="relative px-8 pt-10 pb-6 text-center">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-primary/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-accent/10 to-transparent rounded-full translate-x-1/2 -translate-y-1/2" />
            
            {/* Logo */}
            <div className="relative mx-auto mb-6 w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-green-primary to-green-card rounded-2xl rotate-6 opacity-50" />
              <div className="relative w-full h-full bg-gradient-to-br from-green-primary to-green-card rounded-2xl flex items-center justify-center shadow-glow-green">
                <Leaf className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>

            <h1 className="font-display text-3xl font-bold mb-2 gradient-text">
              NutriPlan IA
            </h1>
            <p className="text-muted-foreground text-sm">
              Sua jornada para uma vida mais saudável começa aqui
            </p>
          </div>

          {/* Form content */}
          <div className="px-8 pb-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-secondary/50 rounded-xl h-12">
                <TabsTrigger 
                  value="signin" 
                  className="rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-primary data-[state=active]:to-green-card data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-lg font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-primary data-[state=active]:to-green-card data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                >
                  Criar Conta
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 animate-fade-in">
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-foreground font-medium text-sm">Email</Label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-primary to-blue-accent rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-all duration-300" />
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-primary transition-colors" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-11 h-12 bg-secondary/30 border-border/50 rounded-xl focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-foreground font-medium text-sm">Senha</Label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-primary to-blue-accent rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-all duration-300" />
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-primary transition-colors" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-11 h-12 bg-secondary/30 border-border/50 rounded-xl focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-green-primary to-green-card hover:from-green-card hover:to-green-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-glow-green transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-5 w-5" />
                    )}
                    Entrar
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 animate-fade-in">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-key" className="text-foreground font-medium text-sm flex items-center gap-2">
                      <Key className="w-3.5 h-3.5 text-orange-accent" />
                      Chave de Acesso
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-accent to-pink-accent rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-all duration-300" />
                      <div className="relative">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-orange-accent transition-colors" />
                        <Input
                          id="signup-key"
                          type="text"
                          placeholder="Digite a chave especial"
                          value={specialKey}
                          onChange={(e) => setSpecialKey(e.target.value)}
                          required
                          className="pl-11 h-12 bg-secondary/30 border-border/50 rounded-xl focus:border-orange-accent focus:ring-2 focus:ring-orange-accent/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-foreground font-medium text-sm">Nome Completo</Label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-primary to-blue-accent rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-all duration-300" />
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-primary transition-colors" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Seu nome completo"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="pl-11 h-12 bg-secondary/30 border-border/50 rounded-xl focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-foreground font-medium text-sm">Email</Label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-primary to-blue-accent rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-all duration-300" />
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-primary transition-colors" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-11 h-12 bg-secondary/30 border-border/50 rounded-xl focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-foreground font-medium text-sm">Senha</Label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-primary to-blue-accent rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-all duration-300" />
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-primary transition-colors" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Mínimo 6 caracteres"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          className="pl-11 h-12 bg-secondary/30 border-border/50 rounded-xl focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-green-primary to-green-card hover:from-green-card hover:to-green-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-glow-green transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Leaf className="mr-2 h-5 w-5" />
                    )}
                    Criar Minha Conta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="px-8 pb-6 pt-2 border-t border-border/30">
            <p className="text-center text-xs text-muted-foreground">
              Desenvolvido com 💚 para sua saúde
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;