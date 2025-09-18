import * as React from "react";import * as React from "react";

import { Sparkles, CheckCircle, Camera, Users, BarChart, Scissors } from "lucide-react";import { Sparkles, CheckCircle, Camera, Users, BarChart, Scissors } from "lucide-react";



export function VisagismBenefits() {export function VisagismBenefits() {

  const benefits = [  const benefits = [

    {    {

      icon: <Sparkles className="h-5 w-5 text-blue-500" />,      icon: <Sparkles className="h-5 w-5 text-blue-500" />,

      title: "Visagismo por IA",      title: "Visagismo por IA",

      description: "Tecnologia que permite visualizar novos visuais antes da execução"      description: "Tecnologia que permite visualizar novos visuais antes da execução"

    },    },

    {    {

      icon: <CheckCircle className="h-5 w-5 text-blue-500" />,      icon: <CheckCircle className="h-5 w-5 text-blue-500" />,

      title: "Mais confiança",      title: "Mais confiança",

      description: "Clientes satisfeitos com resultados previsíveis e seguros"      description: "Clientes satisfeitos com resultados previsíveis e seguros"

    },    },

    {    {

      icon: <Camera className="h-5 w-5 text-blue-500" />,      icon: <Camera className="h-5 w-5 text-blue-500" />,

      title: "Manipulação de imagem",      title: "Manipulação de imagem",

      description: "Demonstre cortes, cores e tratamentos de forma realista"      description: "Demonstre cortes, cores e tratamentos de forma realista"

    },    },

    {    {

      icon: <Users className="h-5 w-5 text-blue-500" />,      icon: <Users className="h-5 w-5 text-blue-500" />,

      title: "Padronização",      title: "Padronização",

      description: "Uniformize processos e procedimentos entre profissionais"      description: "Uniformize processos e procedimentos entre profissionais"

    },    },

    {    {

      icon: <BarChart className="h-5 w-5 text-blue-500" />,      icon: <BarChart className="h-5 w-5 text-blue-500" />,

      title: "Monetização extra",      title: "Monetização extra",

      description: "Ganhe comissão com vendas de produtos recomendados"      description: "Ganhe comissão com vendas de produtos recomendados"

    },    },

    {    {

      icon: <Scissors className="h-5 w-5 text-blue-500" />,      icon: <Scissors className="h-5 w-5 text-blue-500" />,

      title: "SuperApp completo",      title: "SuperApp completo",

      description: "CRM integrado para gerenciar relacionamentos e agendamentos"      description: "CRM integrado para gerenciar relacionamentos e agendamentos"

    }    }

  ];  ];



  return (  return (

    <div className="bg-white rounded-3xl p-6 mt-4 border border-[#E5E7EB] border-solid">    <div className="bg-white rounded-3xl p-6 mt-4 border border-[#E5E7EB] border-solid">

      <h3 className="text-lg font-bold text-center mb-4">Por que escolher a Pandami?</h3>      <h3 className="text-lg font-bold text-center mb-4">Por que escolher a Pandami?</h3>

            

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {benefits.map((benefit, index) => (        {benefits.map((benefit, index) => (

          <div key={index} className="flex items-start space-x-3">          <div key={index} className="flex items-start space-x-3">

            <div className="mt-0.5">{benefit.icon}</div>            <div className="mt-0.5">{benefit.icon}</div>

            <div>            <div>

              <h4 className="text-sm font-semibold text-neutral-800">{benefit.title}</h4>              <h4 className="text-sm font-semibold text-neutral-800">{benefit.title}</h4>

              <p className="text-xs text-neutral-600">{benefit.description}</p>              <p className="text-xs text-neutral-600">{benefit.description}</p>

            </div>            </div>

          </div>          </div>

        ))}        ))}

      </div>      </div>

            

      <p className="text-xs text-neutral-500 mt-4 text-center italic">      <p className="text-xs text-neutral-500 mt-4 text-center italic">

        Somos uma startup beautytech que democratiza o visagismo com IA para salões e barbearias.        Somos uma startup beautytech que democratiza o visagismo com IA para salões e barbearias.

      </p>      </p>

    </div>    </div>

  );  );

}}