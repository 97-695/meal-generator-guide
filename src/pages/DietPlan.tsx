import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Activity, Apple, Lightbulb, ChefHat, Droplets, Dumbbell, Utensils } from "lucide-react";

interface DietFormData {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  activity: string;
  goal: string;
}

const DietPlan = () => {
  const location = useLocation();
  const formData = location.state as DietFormData;

  // Mock calculations based on form data
  const bmr = 1624;
  const totalEnergy = 2517;
  const targetCalories = 2517;
  const protein = 189;
  const carbs = 252;
  const fat = 84;

  const meals = [
    {
      name: "Café da Manhã",
      calories: 507,
      items: ["2 ovos cozidos", "1 fatia de pão integral", "1 iogurte natural com granola", "1 fruta"],
    },
    {
      name: "Almoço",
      calories: 807,
      items: ["180g de peito de frango grelhado", "1 colher de arroz integral", "1 concha de feijão", "Salada e legumes"],
    },
    {
      name: "Lanche",
      calories: 277,
      items: ["1 iogurte grego", "Granola", "1 fruta"],
    },
    {
      name: "Jantar",
      calories: 620,
      items: ["150g de carne magra", "Purê de batata doce", "Legumes variados", "Salada"],
    },
  ];

  const snacks = [
    {
      name: "Maçã com Amendoim",
      description: "1 maçã média + 1 colher de sopa de pasta de amendoim",
      calories: 200,
    },
    {
      name: "Banana com Mel",
      description: "1 banana + 1 colher de chá de mel",
      calories: 150,
    },
    {
      name: "Morango com Iogurte",
      description: "1 xícara de morango + 100g de iogurte natural",
      calories: 120,
    },
    {
      name: "Uva com Amêndoas",
      description: "1 xícara de uva + 10 amêndoas",
      calories: 180,
    },
    {
      name: "Pera com Queijo Branco",
      description: "1 pera + 50g de queijo branco",
      calories: 180,
    },
  ];

  const recipes = [
    {
      name: "Frango Grelhado com Legumes",
      calories: 350,
      color: "bg-pink-accent",
      ingredients: [
        "200g de peito de frango",
        "Brócolis",
        "Cenoura",
        "Abobrinha",
        "Temperos naturais",
      ],
      method: "Tempere o frango e grelhe. Cozinhe os legumes no vapor. Sirva junto.",
    },
    {
      name: "Omelete de Claras com Vegetais",
      calories: 180,
      color: "bg-pink-accent",
      ingredients: ["4 claras de ovo", "Tomate", "Cebola", "Cenoura", "Sal e pimenta"],
      method: "Bata as claras, adicione os vegetais picados. Cozinhe em fogo baixo.",
    },
    {
      name: "Salmão com Batata Doce",
      calories: 420,
      color: "bg-pink-accent",
      ingredients: ["150g de salmão", "200g de batata doce", "Limão", "Ervas", "Azeite"],
      method: "Asse o salmão com limão. Cozinhe a batata doce. Regue com azeite.",
    },
  ];

  const tips = [
    "Beba pelo menos 2 litros de água por dia",
    "Evite alimentos processados e ultraprocessados",
    "Faça refeições a cada 3-4 horas",
    "Durma de 7-8 horas por noite",
    "Mantenha um equilíbrio entre macronutrientes",
    "Pratique atividades físicas regularmente",
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-green-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <ChefHat className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Calculadora de Dieta com IA</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Receba um plano alimentar personalizado baseado em suas informações e objetivos, com receitas e recomendações geradas por inteligência artificial
          </p>
          <div className="inline-block bg-card border-l-4 border-primary px-4 py-2 rounded">
            <p className="text-sm text-primary font-semibold">Planos gerados hoje: 2/5</p>
          </div>
        </div>

        {/* Calorie Cards */}
        <Card className="bg-green-card text-white p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Seu Plano Alimentar Personalizado</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">SUA TMB (ENERGIA BASAL)</p>
              <p className="text-3xl font-bold">{bmr}</p>
              <p className="text-xs opacity-75">calorias/dia</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">GASTO ENERGÉTICO TOTAL</p>
              <p className="text-3xl font-bold">{totalEnergy}</p>
              <p className="text-xs opacity-75">calorias/dia</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-90 mb-1">META CALÓRICA</p>
              <p className="text-3xl font-bold">{targetCalories}</p>
              <p className="text-xs opacity-75">calorias/dia</p>
            </div>
          </div>
        </Card>

        {/* Macronutrients */}
        <Card className="p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-green-primary" />
            <h2 className="text-xl font-bold text-foreground">Macronutrientes Diários</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-blue-accent/20 rounded-lg p-4 bg-blue-accent/5">
              <p className="text-sm text-muted-foreground mb-1">Proteínas</p>
              <p className="text-3xl font-bold text-blue-accent">{protein}g</p>
              <p className="text-xs text-muted-foreground">30% das calorias</p>
            </div>
            <div className="border-2 border-blue-accent/20 rounded-lg p-4 bg-blue-accent/5">
              <p className="text-sm text-muted-foreground mb-1">Carboidratos</p>
              <p className="text-3xl font-bold text-blue-accent">{carbs}g</p>
              <p className="text-xs text-muted-foreground">40% das calorias</p>
            </div>
            <div className="border-2 border-blue-accent/20 rounded-lg p-4 bg-blue-accent/5">
              <p className="text-sm text-muted-foreground mb-1">Gorduras</p>
              <p className="text-3xl font-bold text-blue-accent">{fat}g</p>
              <p className="text-xs text-muted-foreground">30% das calorias</p>
            </div>
          </div>
        </Card>

        {/* Meal Plan */}
        <Card className="p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Apple className="w-5 h-5 text-green-primary" />
            <h2 className="text-xl font-bold text-foreground">Plano de Refeições</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meals.map((meal, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground">{meal.name}</h3>
                  <span className="text-sm font-bold text-green-primary bg-green-primary/10 px-2 py-1 rounded">
                    {meal.calories} cal
                  </span>
                </div>
                <ul className="space-y-1">
                  {meal.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-1">
                      <span className="text-green-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* Snacks */}
        <Card className="p-6 shadow-md bg-green-primary/5 border-green-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Apple className="w-5 h-5 text-green-primary" />
            <h2 className="text-xl font-bold text-foreground">lanche da tarde</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Escolha uma destas opções saudáveis de lanche:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {snacks.map((snack, idx) => (
              <div key={idx} className="bg-card border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-1">{snack.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{snack.description}</p>
                <span className="text-xs font-semibold text-green-primary">{snack.calories} cal</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-6 shadow-md bg-yellow-bg border-orange-accent/30">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-orange-accent" />
            <h2 className="text-xl font-bold text-foreground">Dicas Importantes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-orange-accent mt-1">•</span>
                <p className="text-sm text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recipes */}
        <Card className="p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="w-5 h-5 text-pink-accent" />
            <h2 className="text-xl font-bold text-foreground">Receitas Recomendadas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recipes.map((recipe, idx) => (
              <div key={idx} className={`${recipe.color} text-white rounded-lg p-4 shadow-md`}>
                <h3 className="font-bold mb-1">{recipe.name}</h3>
                <p className="text-sm opacity-90 mb-3">{recipe.calories} calorias</p>
                <div className="bg-white/20 rounded p-3 mb-3">
                  <p className="text-xs font-semibold mb-2">Ingredientes:</p>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-xs flex items-start gap-1">
                        <span>✓</span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1">Modo de Preparo:</p>
                  <p className="text-xs opacity-90">{recipe.method}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Tracking */}
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-bold text-foreground mb-4">Rastreamento Diário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-5 h-5 text-blue-accent" />
                <h3 className="font-semibold text-foreground">Ingestão de Água</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">0 ml</span>
                <span className="text-sm font-semibold text-foreground">2000 ml</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-blue-accent hover:bg-blue-accent/90">+250ml</Button>
                <Button size="sm" className="flex-1 bg-blue-accent hover:bg-blue-accent/90">+500ml</Button>
                <Button size="sm" className="flex-1 bg-destructive hover:bg-destructive/90">-250ml</Button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Apple className="w-5 h-5 text-green-primary" />
                <h3 className="font-semibold text-foreground">Fruta do Tarde</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Você comeu a fruta recomendada da tarde?</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-green-primary hover:bg-green-primary/90">Sim</Button>
                <Button size="sm" className="flex-1 bg-destructive hover:bg-destructive/90">Não</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Meal Log */}
        <Card className="p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-5 h-5 text-orange-accent" />
            <h2 className="text-xl font-bold text-foreground">Registro de Refeições</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Tipo de Refeição</label>
                <select className="w-full border rounded-lg p-2 bg-card text-foreground">
                  <option>Café da Manhã</option>
                  <option>Almoço</option>
                  <option>Jantar</option>
                  <option>Lanche</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Nome do Alimento</label>
                <input
                  type="text"
                  placeholder="Ex: Frango grelhado"
                  className="w-full border rounded-lg p-2 bg-input text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Calorias</label>
                <input
                  type="number"
                  placeholder="Ex: 350"
                  className="w-full border rounded-lg p-2 bg-input text-foreground"
                />
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-orange-accent to-orange-accent/80 hover:from-orange-accent/90 hover:to-orange-accent/70">
              Adicionar Refeição
            </Button>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Consumido</span>
                <span className="font-semibold text-foreground">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Meta Diária</span>
                <span className="font-semibold text-blue-accent">{targetCalories}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Restante</span>
                <span className="font-semibold text-green-primary">{targetCalories}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Exercises */}
        <Card className="p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="w-5 h-5 text-pink-accent" />
            <h2 className="text-xl font-bold text-foreground">Exercícios Recomendados</h2>
          </div>
          <div className="space-y-3">
            <div className="border rounded-lg p-4 bg-card flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-foreground">Caminhada</h3>
                <p className="text-sm text-muted-foreground">30 minutos - Baixa intensidade</p>
              </div>
              <span className="text-sm font-bold text-green-primary bg-green-primary/10 px-3 py-1 rounded">
                150 cal
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DietPlan;
