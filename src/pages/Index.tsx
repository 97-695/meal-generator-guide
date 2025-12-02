import { useState } from "react";
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
import { ChefHat, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    activity: "",
    goal: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
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

    // Navigate to diet plan page with form data
    navigate("/plano", { state: formData });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="w-16 h-16 bg-green-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Calculadora de Dieta com IA</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Receba um plano alimentar personalizado baseado em suas informações e objetivos, com receitas e recomendações geradas por inteligência artificial
          </p>
          <div className="inline-block bg-card border-l-4 border-primary px-4 py-2 rounded shadow-sm">
            <p className="text-sm text-primary font-semibold">Planos gerados hoje: 1/5</p>
          </div>
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
