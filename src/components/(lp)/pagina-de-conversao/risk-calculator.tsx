"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, X, Info, FileText, ArrowRight, ThumbsUp } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@/common/hooks/use-gsap"
import { Progress } from "../ui/progress"

// Definição das etapas da calculadora
interface CalculatorStep {
  id: string
  question: string
  description?: string
  options: {
    text: string
    value: number
    info?: string
  }[]
  sourceInfo?: string
}

// Definição dos níveis de resultado
interface ResultLevel {
  min: number
  max: number
  title: string
  description: string
  color: string
}

// Etapas da calculadora
const CALCULATOR_STEPS: CalculatorStep[] = [
  {
    id: "distinctiveness",
    question: "Qual é o nível de distintividade da sua marca?",
    description: "A distintividade é a capacidade da marca de se diferenciar de outras no mercado.",
    options: [
      { text: "Marca de fantasia (palavras inventadas)", value: 10, info: "Ex: Kodak, Google, Xerox" },
      {
        text: "Marca arbitrária (palavras comuns em contexto não relacionado)",
        value: 8,
        info: "Ex: Apple (para computadores), Amazon (para e-commerce)",
      },
      { text: "Marca sugestiva (sugere, mas não descreve o produto)", value: 6, info: "Ex: Netflix, Microsoft" },
      {
        text: "Marca descritiva (descreve características do produto)",
        value: 3,
        info: "Ex: Leite Integral, Pizza Quente",
      },
      { text: "Termo genérico (nome comum do produto)", value: 0, info: "Ex: Água, Pão, Hotel" },
    ],
    sourceInfo: "Baseado no Art. 124, VI da Lei da Propriedade Industrial (Lei nº 9.279/96)",
  },
  {
    id: "similarity",
    question: "Existem marcas semelhantes já registradas no mesmo segmento?",
    description: "A semelhança com marcas existentes pode aumentar o risco de indeferimento.",
    options: [
      { text: "Não existem marcas semelhantes no meu segmento", value: 10 },
      { text: "Existem marcas com alguma semelhança, mas bem diferentes", value: 7 },
      { text: "Existem marcas moderadamente semelhantes", value: 4 },
      { text: "Existem marcas muito semelhantes", value: 1 },
      { text: "Existem marcas idênticas ou quase idênticas", value: 0 },
    ],
    sourceInfo: "Baseado no Art. 124, XIX da Lei da Propriedade Industrial (Lei nº 9.279/96)",
  },
  {
    id: "prohibitions",
    question: "A marca contém algum dos seguintes elementos?",
    description: "Certos elementos são proibidos ou restritos pela legislação.",
    options: [
      { text: "Não contém nenhum elemento proibido", value: 10 },
      {
        text: "Contém nome geográfico (que não é de origem)",
        value: 5,
        info: 'Exemplo: "Paris" para produtos não fabricados em Paris',
      },
      {
        text: "Contém termos de uso comum no segmento",
        value: 4,
        info: "Termos que todos os concorrentes precisam usar",
      },
      { text: "Contém símbolos oficiais ou públicos", value: 1, info: "Brasões, bandeiras, emblemas oficiais" },
      { text: "Contém nomes ou imagens protegidas", value: 0, info: "Pseudônimos, nomes de família sem autorização" },
    ],
    sourceInfo: "Baseado nos Arts. 124 e 125 da Lei da Propriedade Industrial (Lei nº 9.279/96)",
  },
  {
    id: "market_conflict",
    question: "Qual a probabilidade de conflito com marcas de grande reputação?",
    description: "Marcas renomadas recebem proteção especial, mesmo em segmentos diferentes.",
    options: [
      { text: "Nenhuma semelhança com marcas famosas", value: 10 },
      { text: "Pequena semelhança, mas contexto totalmente diferente", value: 8 },
      { text: "Alguma semelhança com marcas conhecidas", value: 5 },
      { text: "Semelhança considerável com marca de grande reputação", value: 2 },
      { text: "Semelhança muito alta com marca famosa/renomada", value: 0 },
    ],
    sourceInfo: "Baseado no Art. 125 da Lei da Propriedade Industrial (Lei nº 9.279/96)",
  },
  {
    id: "use_evidence",
    question: "Há quanto tempo a marca está em uso no mercado?",
    description: "O uso prévio pode ser evidência de direito e aumentar as chances de registro.",
    options: [
      { text: "Mais de 5 anos com comprovação de uso", value: 10 },
      { text: "Entre 3 e 5 anos com boa comprovação", value: 8 },
      { text: "Entre 1 e 3 anos com alguma comprovação", value: 6 },
      { text: "Menos de 1 ano com pouca comprovação", value: 4 },
      { text: "Marca ainda não utilizada ou sem comprovação", value: 2 },
    ],
    sourceInfo: "Baseado no Art. 129, §1º da Lei da Propriedade Industrial (Lei nº 9.279/96)",
  },
]

// Níveis de resultado
const RESULT_LEVELS: ResultLevel[] = [
  {
    min: 0,
    max: 20,
    title: "Risco Muito Alto",
    description: "Sua marca tem baixíssima probabilidade de ser registrada devido a graves impedimentos legais.",
    color: "bg-red-600",
  },
  {
    min: 21,
    max: 35,
    title: "Risco Alto",
    description: "Existem obstáculos significativos para o registro da sua marca. Considere alterá-la.",
    color: "bg-orange-500",
  },
  {
    min: 36,
    max: 50,
    title: "Risco Moderado",
    description: "Sua marca tem alguns riscos que podem ser mitigados com uma estratégia adequada.",
    color: "bg-yellow-500",
  },
  {
    min: 51,
    max: 65,
    title: "Risco Baixo",
    description: "Sua marca tem boas chances de registro, com poucos impedimentos potenciais.",
    color: "bg-green-500",
  },
  {
    min: 66,
    max: 100,
    title: "Risco Muito Baixo",
    description: "Sua marca tem excelentes chances de registro, cumprindo os requisitos legais.",
    color: "bg-emerald-500",
  },
]

export function RiskCalculatorSection() {
  const [showCalculator, setShowCalculator] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [result, setResult] = useState<{ score: number; level: ResultLevel } | null>(null)
  const [showSourceInfo, setShowSourceInfo] = useState(false)
  const [animatingProgress, setAnimatingProgress] = useState(false)

  const cardRef = useGSAP<HTMLDivElement>({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    duration: 0.6,
  })

  const progressRef = useRef<HTMLDivElement>(null)
  const scoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentStep >= 0) {
      setSelectedOption(answers[CALCULATOR_STEPS[currentStep].id] ?? null)
    }
  }, [currentStep, answers])

  const startCalculator = () => {
    setShowCalculator(true)
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
  }

  const handleSelectOption = (value: number) => {
    setSelectedOption(value)
  }

  const handleNextStep = () => {
    if (selectedOption === null) {
      return
    }

    const currentStepId = CALCULATOR_STEPS[currentStep].id
    setAnswers((prev) => ({ ...prev, [currentStepId]: selectedOption }))

    if (currentStep < CALCULATOR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setSelectedOption(null)
    } else {
      // Calcular pontuação final
      const totalScore = Object.values(answers).reduce((acc, val) => acc + val, 0) + selectedOption
      const normalizedScore = Math.round((totalScore / (CALCULATOR_STEPS.length * 10)) * 100)

      const resultLevel =
        RESULT_LEVELS.find((level) => normalizedScore >= level.min && normalizedScore <= level.max) || RESULT_LEVELS[0]

      setResult({ score: normalizedScore, level: resultLevel })
      setAnimatingProgress(true)
    }
  }

  useEffect(() => {
    if (result && animatingProgress) {
      // Animar a barra de progresso
      if (progressRef.current) {
        const progressBar = progressRef.current.querySelector("div")
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { width: "0%" },
            {
              width: `${result.score}%`,
              duration: 1.5,
              ease: "power2.out",
              onComplete: () => setAnimatingProgress(false),
            },
          )
        }
      }

      // Animar o contador de pontuação
      if (scoreRef.current) {
        const startValue = { value: 0 }
        gsap.to(startValue, {
          value: result.score,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            if (scoreRef.current) {
              scoreRef.current.textContent = `${Math.round(startValue.value)}/100`
            }
          },
        })
      }
    }
  }, [result, animatingProgress])

  const resetCalculator = () => {
    setCurrentStep(-1)
    setAnswers({})
    setResult(null)
    setSelectedOption(null)
    setShowCalculator(false)
  }

  if (!showCalculator) {
    return (
      <Card className="flex flex-col gap-5 border shadow-md" ref={cardRef}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Avalie sua marca em 30 segundos</CardTitle>
          <CardDescription>
            Descubra as chances de aprovação da sua marca no INPI de forma rápida e simples
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={startCalculator} className="w-full uppercase">
            Iniciar avaliação gratuita
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (result) {
    return (
      <Card className="border shadow-md" ref={cardRef}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Resultado da Avaliação</CardTitle>
            <Button variant="ghost" size="icon" onClick={resetCalculator} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className={`h-3 rounded-full ${result.level.color}`} ref={progressRef}>
              <div className="h-3 rounded-full" style={{ width: "0%" }}></div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="text-5xl font-bold" ref={scoreRef}>
                0/100
              </div>
              <div className="text-gray-500 text-sm">
                <div>pontos</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 mb-6">
              <h3 className="font-bold text-lg mb-1">{result.level.title}</h3>
              <p className="text-gray-600">{result.level.description}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Próximos passos recomendados:</h4>
              <ul className="space-y-2">
                {result.score < 50 && (
                  <li className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Considere redesenhar sua marca para aumentar suas chances de registro. A PPPI pode ajudar nesse
                      processo.
                    </span>
                  </li>
                )}
                <li className="flex gap-2">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Solicite uma busca prévia detalhada com a equipe da PPPI para identificar possíveis conflitos.
                  </span>
                </li>
                <li className="flex gap-2">
                  <ThumbsUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Agende uma consulta com os especialistas da PPPI para orientações específicas sobre seu caso.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-700">Como calculamos seu resultado</p>
                  <p className="text-blue-600 mt-1">
                    Nossa avaliação é baseada na Lei 9.279/96 e em milhares de casos reais de registro de marcas no
                    Brasil. Ela considera fatores como distintividade, conflitos potenciais e restrições legais para
                    estimar suas chances de aprovação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-3">
          <Button onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })} size={"lg"} className="text-base uppercase text-white">
            Quero minha consulta gratuita
          </Button>

          <Button variant="outline" onClick={resetCalculator} className="text-base !border-none !font-normal !bg-white">
            Refazer análise
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const currentQuestion = CALCULATOR_STEPS[currentStep]
  const progress = ((currentStep + 1) / CALCULATOR_STEPS.length) * 100

  return (
    <Card className="border shadow-md" ref={cardRef}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Avaliação de Marca</CardTitle>
          <Button variant="ghost" size="icon" onClick={resetCalculator} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Pergunta {currentStep + 1} de {CALCULATOR_STEPS.length}
        </CardDescription>
        <Progress value={progress} max={100} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="step-content">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
            <button
              onClick={() => setShowSourceInfo(!showSourceInfo)}
              className="text-xs text-primary flex items-center gap-1 cursor-default"
            >
              <FileText className="h-4 w-4" />
              Fonte legal
            </button>
          </div>

          {showSourceInfo && (
            <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm text-gray-600">
              {currentQuestion.sourceInfo}
            </div>
          )}

          {currentQuestion.description && <p className="text-sm text-slate-600 mb-4">{currentQuestion.description}</p>}

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedOption === option.value
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50"
                  }`}
                onClick={() => handleSelectOption(option.value)}
              >
                <div className="font-medium">{option.text}</div>
                {option.info && <div className="text-xs text-slate-500 mt-1">{option.info}</div>}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => (currentStep > 0 ? setCurrentStep((prev) => prev - 1) : resetCalculator())}
        >
          {currentStep > 0 ? "Voltar" : "Cancelar"}
        </Button>

        <Button onClick={handleNextStep} disabled={selectedOption === null}>
          {currentStep < CALCULATOR_STEPS.length - 1 ? "Próxima" : "Ver resultado"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

