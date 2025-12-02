import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChefHat, User, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    activity: "",
    goal: "",
  });

  useEffect(() => {
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session) {
        navigate("/auth");
      } else {
        // Load profile data if exists
        loadProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setFormData({
        name: data.full_name || "",
        age: data.age?.toString() || "",
        weight: data.weight?.toString() || "",
        height: data.height?.toString() || "",
        gender: data.gender || "",
        activity: data.activity_level || "",
        goal: data.goal || "",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.age || !formData.weight || !formData.height || 
        !formData.gender || !formData.activity || !formData.goal) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }

    if (!user) return;

    // Calculate targets
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseInt(formData.age);
    
    let bmr = 0;
    if (formData.gender === "masculino") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers: { [key: string]: number } = {
      sedentario: 1.2,
      leve: 1.375,
      moderado: 1.55,
      intenso: 1.725,
      "muito-intenso": 1.9,
    };

    let calories = Math.round(bmr * (activityMultipliers[formData.activity] || 1.2));

    if (formData.goal === "perder-peso") {
      calories -= 500;
    } else if (formData.goal === "ganhar-peso" || formData.goal === "ganhar-massa") {
      calories += 500;
    }

    // Save profile
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.name,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        gender: formData.gender,
        activity_level: formData.activity,
        goal: formData.goal,
        daily_calories: calories,
        daily_water: 2000,
        daily_exercise_calories: 300,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Navigate to diet plan page
    navigate("/plano");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
          <div className="w-16 h-16 bg-green-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Calculadora de Dieta com IA</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Receba um plano alimentar personalizado baseado em suas informações e objetivos, com receitas e recomendações geradas por inteligência artificial
          </p>
          {user && (
            <p className="text-sm text-muted-foreground">
              Olá, <span className="font-semibold text-foreground">{formData.name || user.email}</span>!
            </p>
          )}
        </div>

        {/* Form */}
        <Card className="p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <div className="w-10 h-10 bg-green-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Informações Pessoais</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-foreground font-medium">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Ex: 30"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="text-foreground font-medium">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 70.5"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-foreground font-medium">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Ex: 175"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-foreground font-medium">Gênero</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger id="gender" className="bg-input border-border">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity" className="text-foreground font-medium">Nível de Atividade</Label>
                <Select
                  value={formData.activity}
                  onValueChange={(value) => setFormData({ ...formData, activity: value })}
                >
                  <SelectTrigger id="activity" className="bg-input border-border">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentário (pouco ou nenhum exercício)</SelectItem>
                    <SelectItem value="leve">Leve (1-3 dias/semana)</SelectItem>
                    <SelectItem value="moderado">Moderado (3-5 dias/semana)</SelectItem>
                    <SelectItem value="intenso">Intenso (6-7 dias/semana)</SelectItem>
                    <SelectItem value="muito-intenso">Muito Intenso (atleta)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal" className="text-foreground font-medium">Objetivo</Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => setFormData({ ...formData, goal: value })}
              >
                <SelectTrigger id="goal" className="bg-input border-border">
                  <SelectValue placeholder="Selecione seu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perder-peso">Perder Peso</SelectItem>
                  <SelectItem value="manter-peso">Manter Peso</SelectItem>
                  <SelectItem value="ganhar-peso">Ganhar Peso</SelectItem>
                  <SelectItem value="ganhar-massa">Ganhar Massa Muscular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-primary hover:bg-green-primary/90 text-white font-semibold text-lg py-6 shadow-lg"
            >
              Gerar Plano Alimentar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Index;
