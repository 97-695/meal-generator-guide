import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Activity, Apple, Lightbulb, ChefHat, Droplets, Dumbbell, Utensils, Target, CheckCircle2, XCircle } from "lucide-react";

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

  // Estados para controle
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [waterInput, setWaterInput] = useState("");
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [mealType, setMealType] = useState("Café da Manhã");
  const [foodName, setFoodName] = useState("");
  const [foodWeight, setFoodWeight] = useState("");
  const [caloriesPer100g, setCaloriesPer100g] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [exerciseInputs, setExerciseInputs] = useState<{ [key: string]: string }>({});

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

  const handleAddWater = () => {
    const amount = parseInt(waterInput);
    if (amount > 0) {
      setWaterConsumed(prev => prev + amount);
      setWaterInput("");
    }
  };

  const handleAddMeal = () => {
    const weight = parseFloat(foodWeight);
    const calPer100 = parseFloat(caloriesPer100g);
    
    if (weight > 0 && calPer100 > 0) {
      const totalCalories = (calPer100 * weight) / 100;
      setCaloriesConsumed(prev => prev + totalCalories);
      setFoodName("");
      setFoodWeight("");
      setCaloriesPer100g("");
    }
  };

  const exercises = [
    { name: "Caminhada", caloriesPerMin: 5, intensity: "Baixa intensidade", color: "green-primary" },
    { name: "Corrida", caloriesPerMin: 10, intensity: "Alta intensidade", color: "pink-accent" },
    { name: "Musculação", caloriesPerMin: 5.5, intensity: "Média intensidade", color: "blue-accent" },
    { name: "Natação", caloriesPerMin: 7, intensity: "Média intensidade", color: "green-primary" },
    { name: "Ciclismo", caloriesPerMin: 7.8, intensity: "Alta intensidade", color: "pink-accent" },
    { name: "Yoga", caloriesPerMin: 3, intensity: "Baixa intensidade", color: "blue-accent" },
    { name: "HIIT", caloriesPerMin: 16, intensity: "Muito alta intensidade", color: "pink-accent" },
    { name: "Dança", caloriesPerMin: 6, intensity: "Média intensidade", color: "orange-accent" },
  ];

  const handleAddExercise = (exerciseName: string, caloriesPerMin: number) => {
    const time = parseInt(exerciseInputs[exerciseName] || "0");
    if (time > 0) {
      const caloriesBurnedForExercise = time * caloriesPerMin;
      setCaloriesBurned(prev => prev + caloriesBurnedForExercise);
      setExerciseInputs(prev => ({ ...prev, [exerciseName]: "" }));
    }
  };

  const waterGoal = 2000;
  const exerciseGoal = 300; // Meta de calorias gastas
  const waterProgress = (waterConsumed / waterGoal) * 100;
  const calorieProgress = (caloriesConsumed / targetCalories) * 100;
  const exerciseProgress = (caloriesBurned / exerciseGoal) * 100;

  const recipes = [
    { name: "Frango Grelhado com Legumes", calories: 350, color: "bg-pink-accent", ingredients: ["200g de peito de frango", "Brócolis", "Cenoura", "Abobrinha", "Temperos naturais"], method: "Tempere o frango e grelhe. Cozinhe os legumes no vapor. Sirva junto." },
    { name: "Omelete de Claras com Vegetais", calories: 180, color: "bg-pink-accent", ingredients: ["4 claras de ovo", "Tomate", "Cebola", "Cenoura", "Sal e pimenta"], method: "Bata as claras, adicione os vegetais picados. Cozinhe em fogo baixo." },
    { name: "Salmão com Batata Doce", calories: 420, color: "bg-pink-accent", ingredients: ["150g de salmão", "200g de batata doce", "Limão", "Ervas", "Azeite"], method: "Asse o salmão com limão. Cozinhe a batata doce. Regue com azeite." },
    { name: "Salada de Quinoa", calories: 280, color: "bg-green-primary", ingredients: ["100g quinoa", "Tomate", "Pepino", "Abacate", "Limão"], method: "Cozinhe a quinoa, misture com vegetais picados e tempere com limão." },
    { name: "Peito de Peru com Arroz Integral", calories: 400, color: "bg-blue-accent", ingredients: ["150g peru", "100g arroz integral", "Brócolis", "Alho"], method: "Grelhe o peru, cozinhe o arroz e refogue o brócolis." },
    { name: "Wrap de Atum", calories: 320, color: "bg-pink-accent", ingredients: ["1 tortilha integral", "1 lata atum", "Alface", "Tomate"], method: "Misture o atum com vegetais e enrole na tortilha." },
    { name: "Bowl de Açaí Proteico", calories: 450, color: "bg-pink-accent", ingredients: ["200g açaí", "30g whey", "Banana", "Granola"], method: "Bata o açaí com whey, adicione frutas e granola." },
    { name: "Tilápia ao Forno", calories: 260, color: "bg-blue-accent", ingredients: ["200g tilápia", "Tomate", "Cebola", "Pimentão"], method: "Tempere o peixe, adicione legumes e asse por 25min." },
    { name: "Panqueca de Aveia", calories: 220, color: "bg-green-primary", ingredients: ["50g aveia", "2 ovos", "Banana", "Canela"], method: "Bata tudo, cozinhe em fogo baixo até dourar." },
    { name: "Carne Moída com Abobrinha", calories: 380, color: "bg-pink-accent", ingredients: ["150g carne moída", "2 abobrinhas", "Tomate", "Cebola"], method: "Refogue a carne, adicione abobrinha ralada e temperos." },
    { name: "Iogurte com Frutas Vermelhas", calories: 180, color: "bg-blue-accent", ingredients: ["200g iogurte grego", "Mix frutas vermelhas", "Mel", "Chia"], method: "Monte em camadas e adicione sementes de chia." },
    { name: "Smoothie Verde", calories: 200, color: "bg-green-primary", ingredients: ["Couve", "Banana", "Maçã", "Gengibre", "Água"], method: "Bata todos os ingredientes até ficar homogêneo." },
    { name: "Batata Doce Recheada", calories: 340, color: "bg-orange-accent", ingredients: ["1 batata doce", "100g frango desfiado", "Cottage", "Cebolinha"], method: "Asse a batata, abra e recheie com frango e cottage." },
    { name: "Tapioca com Queijo", calories: 250, color: "bg-pink-accent", ingredients: ["50g tapioca", "50g queijo branco", "Tomate", "Orégano"], method: "Hidrate a tapioca, adicione queijo e grelhe." },
    { name: "Sopa de Lentilha", calories: 290, color: "bg-orange-accent", ingredients: ["200g lentilha", "Cenoura", "Batata", "Cebola"], method: "Cozinhe a lentilha com legumes, tempere a gosto." },
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
                <span className="text-sm text-muted-foreground">{waterConsumed} ml</span>
                <span className="text-sm font-semibold text-foreground">2000 ml</span>
              </div>
              <div className="mb-3 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-accent transition-all duration-300"
                  style={{ width: `${Math.min((waterConsumed / 2000) * 100, 100)}%` }}
                />
              </div>
              <div className="flex gap-2 mb-2">
                <Input 
                  type="number" 
                  placeholder="ml" 
                  value={waterInput}
                  onChange={(e) => setWaterInput(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleAddWater} className="bg-blue-accent hover:bg-blue-accent/90">
                  Adicionar
                </Button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setWaterConsumed(prev => Math.max(0, prev - 250))} variant="outline" className="flex-1">
                  -250ml
                </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Tipo de Refeição</label>
                <select 
                  className="w-full border rounded-lg p-2 bg-card text-foreground"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                >
                  <option>Café da Manhã</option>
                  <option>Almoço</option>
                  <option>Jantar</option>
                  <option>Lanche</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Nome do Alimento</label>
                <Input
                  type="text"
                  placeholder="Ex: Frango grelhado"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Peso (gramas)</label>
                <Input
                  type="number"
                  placeholder="Ex: 150"
                  value={foodWeight}
                  onChange={(e) => setFoodWeight(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Calorias/100g</label>
                <Input
                  type="number"
                  placeholder="Ex: 165"
                  value={caloriesPer100g}
                  onChange={(e) => setCaloriesPer100g(e.target.value)}
                />
              </div>
            </div>
            <Button 
              onClick={handleAddMeal}
              className="w-full bg-gradient-to-r from-orange-accent to-orange-accent/80 hover:from-orange-accent/90 hover:to-orange-accent/70"
            >
              Adicionar Refeição
            </Button>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Consumido</span>
                <span className="font-semibold text-foreground">{Math.round(caloriesConsumed)} cal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Meta Diária</span>
                <span className="font-semibold text-blue-accent">{targetCalories} cal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Restante</span>
                <span className={`font-semibold ${targetCalories - caloriesConsumed >= 0 ? 'text-green-primary' : 'text-destructive'}`}>
                  {Math.round(targetCalories - caloriesConsumed)} cal
                </span>
              </div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    caloriesConsumed > targetCalories ? 'bg-destructive' : 'bg-green-primary'
                  }`}
                  style={{ width: `${Math.min((caloriesConsumed / targetCalories) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Exercises */}
        <Card className="p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-pink-accent" />
              <h2 className="text-xl font-bold text-foreground">Exercícios Recomendados</h2>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Total Queimado: </span>
              <span className="font-bold text-pink-accent">{Math.round(caloriesBurned)} cal</span>
            </div>
          </div>
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Meta de Exercícios</span>
              <span className="font-semibold text-foreground">{exerciseGoal} cal</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-pink-accent transition-all duration-300"
                style={{ width: `${Math.min(exerciseProgress, 100)}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exercises.map((exercise, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground">{exercise.intensity}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ~{exercise.caloriesPerMin} cal/min
                    </p>
                  </div>
                  <span className={`text-sm font-bold text-${exercise.color} bg-${exercise.color}/10 px-3 py-1 rounded`}>
                    {exercise.caloriesPerMin * 30} cal
                  </span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Minutos"
                    value={exerciseInputs[exercise.name] || ""}
                    onChange={(e) => setExerciseInputs(prev => ({ ...prev, [exercise.name]: e.target.value }))}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleAddExercise(exercise.name, exercise.caloriesPerMin)}
                    className="bg-pink-accent hover:bg-pink-accent/90"
                  >
                    Registrar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Results Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-primary to-blue-accent hover:from-green-primary/90 hover:to-blue-accent/90 shadow-lg">
              <Target className="w-5 h-5 mr-2" />
              Ver Resultados do Dia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Resumo dos Objetivos Diários</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Water Goal */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-accent" />
                    <h3 className="font-semibold text-foreground">Ingestão de Água</h3>
                  </div>
                  {waterConsumed >= waterGoal ? (
                    <CheckCircle2 className="w-6 h-6 text-green-primary" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-semibold">{waterConsumed}ml / {waterGoal}ml</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${waterConsumed >= waterGoal ? 'bg-green-primary' : 'bg-blue-accent'}`}
                      style={{ width: `${Math.min(waterProgress, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {waterConsumed >= waterGoal ? '✓ Objetivo atingido!' : `Faltam ${waterGoal - waterConsumed}ml`}
                  </p>
                </div>
              </div>

              {/* Calories Goal */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Apple className="w-5 h-5 text-green-primary" />
                    <h3 className="font-semibold text-foreground">Calorias Consumidas</h3>
                  </div>
                  {caloriesConsumed >= targetCalories * 0.9 && caloriesConsumed <= targetCalories * 1.1 ? (
                    <CheckCircle2 className="w-6 h-6 text-green-primary" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-semibold">{Math.round(caloriesConsumed)} / {targetCalories} cal</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        caloriesConsumed > targetCalories ? 'bg-destructive' : 'bg-green-primary'
                      }`}
                      style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {caloriesConsumed >= targetCalories * 0.9 && caloriesConsumed <= targetCalories * 1.1
                      ? '✓ Dentro da meta ideal!'
                      : caloriesConsumed < targetCalories
                      ? `Faltam ${Math.round(targetCalories - caloriesConsumed)} calorias`
                      : `${Math.round(caloriesConsumed - targetCalories)} calorias acima da meta`}
                  </p>
                </div>
              </div>

              {/* Exercise Goal */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-pink-accent" />
                    <h3 className="font-semibold text-foreground">Calorias Queimadas</h3>
                  </div>
                  {caloriesBurned >= exerciseGoal ? (
                    <CheckCircle2 className="w-6 h-6 text-green-primary" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-semibold">{Math.round(caloriesBurned)} / {exerciseGoal} cal</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${caloriesBurned >= exerciseGoal ? 'bg-green-primary' : 'bg-pink-accent'}`}
                      style={{ width: `${Math.min(exerciseProgress, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {caloriesBurned >= exerciseGoal ? '✓ Meta de exercícios atingida!' : `Faltam ${Math.round(exerciseGoal - caloriesBurned)} calorias`}
                  </p>
                </div>
              </div>

              {/* Overall Summary */}
              <div className="border-t pt-4">
                <div className="bg-gradient-to-r from-green-primary/10 to-blue-accent/10 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-foreground mb-1">
                    {waterConsumed >= waterGoal && 
                     caloriesConsumed >= targetCalories * 0.9 && 
                     caloriesConsumed <= targetCalories * 1.1 && 
                     caloriesBurned >= exerciseGoal
                      ? '🎉 Parabéns! Todos os objetivos alcançados!'
                      : '💪 Continue se esforçando!'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {[
                      waterConsumed >= waterGoal,
                      caloriesConsumed >= targetCalories * 0.9 && caloriesConsumed <= targetCalories * 1.1,
                      caloriesBurned >= exerciseGoal
                    ].filter(Boolean).length} de 3 objetivos atingidos
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DietPlan;
