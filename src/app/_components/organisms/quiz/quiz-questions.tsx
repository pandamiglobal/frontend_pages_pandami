import React from "react"
import { 
  TrendingUp, AlertCircle, BarChart, Users, Clock, CheckCircle,
  ThumbsDown, Hourglass, HelpCircle, Ban, Star, Meh, Frown,
  Lightbulb, Sparkles, Info
} from "lucide-react"

export interface QuizOption {
  text: string
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
}

export interface QuizQuestion {
  id: number
  question: string
  options: QuizOption[]
}

const createOption = (
  text: string, 
  icon: React.ReactNode, 
  color: string, 
  bgColor: string,
  borderColor: string
): QuizOption => ({ text, icon, color, bgColor, borderColor })

const GREEN_OPTION = (text: string, icon: React.ReactNode) => 
  createOption(text, icon, "text-green-600", "bg-green-50", "border-green-500")

const BLUE_OPTION = (text: string, icon: React.ReactNode) => 
  createOption(text, icon, "text-blue-600", "bg-blue-50", "border-blue-500")

const AMBER_OPTION = (text: string, icon: React.ReactNode) => 
  createOption(text, icon, "text-amber-600", "bg-amber-50", "border-amber-500")

const RED_OPTION = (text: string, icon: React.ReactNode) => 
  createOption(text, icon, "text-red-600", "bg-red-50", "border-red-500")

const GRAY_OPTION = (text: string, icon: React.ReactNode) => 
  createOption(text, icon, "text-gray-600", "bg-gray-50", "border-gray-500")

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Nos últimos meses, como você sente que está o faturamento do seu salão/barbearia?",
    options: [
      GREEN_OPTION("Tem crescido de forma consistente", <TrendingUp className="h-5 w-5" />),
      BLUE_OPTION("Cresce, mas muito pouco", <BarChart className="h-5 w-5" />),
      AMBER_OPTION("Estagnado", <AlertCircle className="h-5 w-5" />),
      RED_OPTION("Caiu e não sei exatamente o porquê", <ThumbsDown className="h-5 w-5" />)
    ]
  },
  {
    id: 2,
    question: "Com que frequência você sente que o cliente fica \"em dúvida\" ou inseguro antes de aceitar o corte ou serviço?",
    options: [
      GREEN_OPTION("Quase nunca", <CheckCircle className="h-5 w-5" />),
      BLUE_OPTION("Às vezes", <Clock className="h-5 w-5" />),
      AMBER_OPTION("Muitas vezes", <AlertCircle className="h-5 w-5" />),
      RED_OPTION("O tempo todo", <Hourglass className="h-5 w-5" />)
    ]
  },
  {
    id: 3,
    question: "Você sabe exatamente quanto perde por retrabalho, correções ou clientes que não voltam?",
    options: [
      GREEN_OPTION("Sim, acompanho de perto", <CheckCircle className="h-5 w-5" />),
      BLUE_OPTION("Tenho uma ideia aproximada", <BarChart className="h-5 w-5" />),
      AMBER_OPTION("Não sei", <HelpCircle className="h-5 w-5" />),
      RED_OPTION("Nunca parei para calcular", <Ban className="h-5 w-5" />)
    ]
  },
  {
    id: 4,
    question: "Seus clientes costumam fazer indicação espontânea do seu trabalho?",
    options: [
      GREEN_OPTION("Sim, praticamente todos", <Star className="h-5 w-5" />),
      BLUE_OPTION("Alguns", <Users className="h-5 w-5" />),
      AMBER_OPTION("Raramente", <Meh className="h-5 w-5" />),
      RED_OPTION("Quase nunca", <Frown className="h-5 w-5" />)
    ]
  },
  {
    id: 5,
    question: "O quanto você sente que sua equipe (ou você) perde tempo explicando cortes, respondendo dúvidas ou tentando convencer clientes?",
    options: [
      GREEN_OPTION("Não é um problema", <CheckCircle className="h-5 w-5" />),
      BLUE_OPTION("Perco algum tempo", <Clock className="h-5 w-5" />),
      AMBER_OPTION("Perco bastante tempo", <Hourglass className="h-5 w-5" />),
      RED_OPTION("Isso vira discussão com frequência", <AlertCircle className="h-5 w-5" />)
    ]
  },
  {
    id: 6,
    question: "Hoje, seus clientes entendem claramente por que um corte específico valoriza o rosto deles?",
    options: [
      GREEN_OPTION("Sempre", <CheckCircle className="h-5 w-5" />),
      BLUE_OPTION("Às vezes", <Lightbulb className="h-5 w-5" />),
      AMBER_OPTION("Quase nunca", <HelpCircle className="h-5 w-5" />),
      RED_OPTION("Nunca", <Ban className="h-5 w-5" />)
    ]
  },
  {
    id: 7,
    question: "Se existisse uma forma simples de mostrar ao cliente o resultado ideal ANTES do corte — aumentando sua confiança e o ticket médio — você gostaria de testar?",
    options: [
      GREEN_OPTION("Com certeza", <Sparkles className="h-5 w-5" />),
      BLUE_OPTION("Sim, tenho curiosidade", <Lightbulb className="h-5 w-5" />),
      AMBER_OPTION("Talvez", <HelpCircle className="h-5 w-5" />),
      RED_OPTION("Não sei", <Info className="h-5 w-5" />)
    ]
  }
]
