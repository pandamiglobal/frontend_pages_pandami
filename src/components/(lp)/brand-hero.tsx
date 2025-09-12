"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { MaskedInput } from "./ui/masked-input";
import { Counter } from "./ui/counter";
import { ECompanySize } from "@/common/services/trademark/trademark";
import { getCompanySizeFromString, submitTrademarkRegistrationLead } from "@/common/services/trademark/trademark";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { EOriginLead } from "@/@types/@lead";

// Definindo os schemas de validação com Zod
const step1Schema = z.object({
  marca: z.string().min(2, "O nome da marca deve ter pelo menos 2 caracteres"),
  descricao: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  porteEmpresa: z.string().min(1, "Selecione o porte da sua empresa"),
});

const step2Schema = z.object({
  segmento: z.string().min(1, "Selecione o segmento da sua empresa"),
  tempoMercado: z.string().min(1, "Selecione o tempo de mercado"),
  website: z.string().url("Digite uma URL válida").or(z.literal("")),
});

const step3Schema = z.object({
  nome: z.string().min(2, "Digite seu nome completo").max(100),
  email: z.string().email("Digite um email válido"),
  telefone: z.string().min(10, "Digite um telefone válido"),
});

// Tipos baseados nos schemas
type Step1FormData = z.infer<typeof step1Schema>;
type Step2FormData = z.infer<typeof step2Schema>;
type Step3FormData = z.infer<typeof step3Schema>;

export default function BrandHero() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    marca: "",
    descricao: "",
    porteEmpresa: "",
    segmento: "",
    tempoMercado: "",
    website: "",
    nome: "",
    email: "",
    telefone: "",
  });

  // Configuração do formulário para o passo atual
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
    reset: resetStep1,
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      marca: formData.marca,
      descricao: formData.descricao,
      porteEmpresa: formData.porteEmpresa,
    },
  });

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    reset: resetStep2,
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      segmento: formData.segmento,
      tempoMercado: formData.tempoMercado,
      website: formData.website,
    },
  });

  const {
    register: registerStep3,
    handleSubmit: handleSubmitStep3,
    formState: { errors: errorsStep3 },
    reset: resetStep3,
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
    },
  });

  const onSubmitStep1 = (data: Step1FormData) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const onSubmitStep2 = (data: Step2FormData) => {
    setFormData({ ...formData, ...data });
    setStep(3);
  };

  const onSubmitStep3 = async (data: Step3FormData) => {
    const completeFormData = { ...formData, ...data };
    setFormData(completeFormData);
    
    try {
      const formattedPhoneNumber = completeFormData.telefone.replace(/\D/g, '');
      
      const leadData = {
        name: completeFormData.nome,
        email: completeFormData.email,
        phone_number: formattedPhoneNumber,
        brand: completeFormData.marca,
        description: completeFormData.descricao,
        company_size: getCompanySizeFromString(completeFormData.porteEmpresa) || ECompanySize.small,
        company_segment: completeFormData.segmento,
        company_on_market: completeFormData.tempoMercado,
        website: completeFormData.website || undefined,
        origin: EOriginLead.page
      };
      
      const response = await submitTrademarkRegistrationLead(leadData);
      console.log("Form submitted successfully:", response);
      
      toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      
      const emptyFormData = {
        marca: "",
        descricao: "",
        porteEmpresa: "",
        segmento: "",
        tempoMercado: "",
        website: "",
        nome: "",
        email: "",
        telefone: "",
      };
      
      setFormData(emptyFormData);
      
      resetStep1({
        marca: "",
        descricao: "",
        porteEmpresa: "",
      });
      
      resetStep2({
        segmento: "",
        tempoMercado: "",
        website: "",
      });
      
      resetStep3({
        nome: "",
        email: "",
        telefone: "",
      });
      
      setStep(1);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.");
    }
  };

  return (
    <section id="form-registro-de-marca">
      <div className="container py-12 relative" id="hero-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start md:bg-[url('/lp/images/bg-hero.png')] bg-no-repeat bg-cover border border-white rounded-[32px]">
          {/* Left Column - Content */}
          <div className="lg:max-w-xl flex flex-col h-full">
            {/* Logo */}
            <div className="w-full bg-white lg:rounded-[0_0_32px_0] lg:pt-8">
              {/* <div className="mb-8">
                <div className="flex items-center justify-center md:items-center md:justify-start">
                  <img
                    src="logo.svg"
                    alt="logo"
                    className="w-[80px] md:w-[80px]"
                  />
                </div>
              </div> */}

              {/* Heading */}
              <h2 className="text-[#374151] text-base text-center md:text-start lg:text-lg mb-1">
                Faça com quem é referência no mercado
              </h2>

              <h1 className="text-[#111827] text-4xl md:text-4xl font-bold text-center md:text-start mb-5">
                Registre sua marca de forma{" "}
                <span className="text-[#0047ff]">simples e descomplicada</span>
              </h1>

              <p className="text-[#4b5563] text-base w-full md:w-[80%] text-center md:text-start mb-3 md:mb-8 relative">
                Se você não tem registro de marca, sua empresa está correndo
                vários riscos.
              </p>

              {/* Testimonials */}
              <div className="mb-8 lg:mb-12 flex items-center justify-center md:justify-start mt-5 gap-5">
                <div className="flex -space-x-4">
                  {[...Array(3)].map((_, i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/48?img=${i + 10}`}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-[#d9d9d9]"
                    />
                  ))}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center mb-1">
                    <p className="font-medium text-[#374151]">
                      +500 avaliações
                    </p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats - visível apenas no desktop */}
            <div className="bg-[rgba(0,0,0,0.7)] text-white rounded-[0_0_32px_32px] lg:rounded-[32px_32px_32px_32px] p-4 py-8 lg:p-8 flex justify-center items-center h-full hero-tl-content relative hidden lg:flex">
              <svg
                width="35"
                height="31"
                viewBox="0 0 35 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-[-2px] top-[-2px] max-lg:hidden"
              >
                <path
                  d="M1 30L1.5 1H34C12.2243 3.47151 5.48917 7.73125 1 30Z"
                  fill="white"
                  stroke="white"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="grid grid-cols-3 md:gap-4">
                <Counter
                  target={1000}
                  duration={800}
                  label="Marcas registradas"
                />
                <Counter target={99} duration={800} label="Aprovação" />
                <Counter
                  target={17}
                  duration={800}
                  label="Países de atuação"
                />
              </div>
            </div>
          </div>

          {/* Form Column - Unified for all screen sizes */}
          <div className="p-3 lg:p-10 relative">
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[-2px] left-[-10px] z-10 max-lg:hidden"
            >
              <path
                d="M0.771484 31.5591V0.559082H31.7715C10.8711 4.46785 4.1434 11.3242 0.771484 31.5591Z"
                fill="white"
                stroke="white"
                strokeLinejoin="round"
              />
            </svg>

            <div className="bg-white rounded-[32px] p-6 md:p-8 lg:max-w-xl mx-auto w-full border-solid border border-[#ddd]">
              {/* Progress Steps */}
              <div className="flex items-center justify-between w-full max-w-full mb-5">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                    step === 1 ? "bg-blue-600" : "bg-gray-300 text-gray-500"
                  }`}
                >
                  1
                </div>
                <div className="flex-1 h-0.5 bg-gray-300"></div>
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                    step === 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  2
                </div>
                <div className="flex-1 h-0.5 bg-gray-300"></div>
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                    step === 3
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  3
                </div>
              </div>

              {/* Unified form for all screen sizes */}
              {renderCurrentForm()}
            </div>
          </div>
          
          {/* Stats - visível apenas no mobile - após o formulário */}
          <div className="bg-[rgba(0,0,0,0.7)] text-white rounded-[32px] p-4 py-8 lg:p-8 flex justify-center items-center mt-6 lg:hidden">
            <div className="grid grid-cols-3 md:gap-4">
              <Counter
                target={1000}
                duration={800}
                label="Marcas registradas"
              />
              <Counter target={99} duration={800} label="Aprovação" />
              <Counter
                target={17}
                duration={800}
                label="Países de atuação"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Função auxiliar para renderizar o formulário atual de acordo com o step
  function renderCurrentForm() {
    if (step === 1) {
      return (
        <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-6">
          <FormInput
            id="marca"
            label="Nome da marca:"
            {...registerStep1("marca")}
            error={errorsStep1.marca?.message}
          />

          <FormTextarea
            id="descricao"
            label="Explique o que sua marca faz:"
            rows={1}
            {...registerStep1("descricao")}
            error={errorsStep1.descricao?.message}
          />

          <FormSelect
            id="porteEmpresa"
            label="Você se considera uma marca de:"
            options={[
              { value: "pequeno", label: "Pequeno porte" },
              { value: "medio", label: "Médio porte" },
              { value: "grande", label: "Grande porte" },
            ]}
            {...registerStep1("porteEmpresa")}
            error={errorsStep1.porteEmpresa?.message}
          />

          <button
            type="submit"
            className="w-full bg-[#0047ff] text-white font-bold py-4 px-6 rounded-full flex items-center justify-between mt-8"
          >
            <span className="mr-2">INICIAR REGISTRO DE MARCA</span>
            <ArrowRight className="w-5 h-5 bg-white p-1 text-black rounded-full" />
          </button>
        </form>
      );
    } else if (step === 2) {
      return (
        <form onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-6">
          <div>
            <FormSelect
              id="segmento"
              label="Qual o segmento da sua marca?"
              options={[
                { value: "tecnologia", label: "Tecnologia" },
                { value: "saude", label: "Saúde" },
                { value: "educacao", label: "Educação" },
                { value: "alimentacao", label: "Alimentação" },
                { value: "varejo", label: "Varejo" },
                { value: "servicos", label: "Serviços" },
                { value: "outro", label: "Outro" },
              ]}
              {...registerStep2("segmento")}
              error={errorsStep2.segmento?.message}
            />
          </div>

          <div>
            <FormSelect
              id="tempoMercado"
              label="Há quanto tempo sua marca está no mercado?"
              options={[
                { value: "menos1", label: "Menos de 1 ano" },
                { value: "1a3", label: "1 a 3 anos" },
                { value: "3a5", label: "3 a 5 anos" },
                { value: "5a10", label: "5 a 10 anos" },
                { value: "mais10", label: "Mais de 10 anos" },
              ]}
              {...registerStep2("tempoMercado")}
              error={errorsStep2.tempoMercado?.message}
            />
          </div>

          <FormInput
            id="website"
            label="Site da marca (opcional):"
            placeholder="https://www.seusite.com.br"
            {...registerStep2("website")}
            error={errorsStep2.website?.message}
          />

          <div className="flex flex-col gap-3 justify-between pt-4 w-full">
            <button
              type="submit"
              className="bg-[#0047ff] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center"
            >
              <span className="mr-2">Continuar</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-[#e5e7eb] rounded-2xl text-[#4b5563] font-medium"
            >
              Voltar
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleSubmitStep3(onSubmitStep3)} className="space-y-6">
          <FormInput
            id="nome"
            label="Seu nome:"
            {...registerStep3("nome")}
            error={errorsStep3.nome?.message}
          />

          <FormInput
            id="email"
            label="E-mail:"
            type="email"
            {...registerStep3("email")}
            error={errorsStep3.email?.message}
          />

          <div>
            <label
              htmlFor="telefone"
              className="block text-[#4b5563] text-base font-medium mb-2"
            >
              Telefone:
            </label>
            <MaskedInput
              type="tel"
              id="telefone"
              placeholder="(00) 00000-0000"
              mask="(99) 99999-9999"
              register={registerStep3("telefone")}
              error={errorsStep3.telefone?.message}
            />
          </div>

          <div className="flex items-start mt-4">
            <label
              htmlFor="termos"
              className="ml-2 text-sm font-medium text-[#4b5563]"
            >
              Ao continuar você concorda com os{" "}
              <a href="#" className="text-[#0047ff] hover:underline">
                termos e condições
              </a>{" "}
              e a{" "}
              <a href="#" className="text-[#0047ff] hover:underline">
                política de privacidade
              </a>
            </label>
          </div>

          <div className="flex flex-col gap-3 w-full justify-between pt-4">
            <button
              type="submit"
              className="bg-[#0047ff] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center"
            >
              <span className="mr-2">Finalizar solicitação</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-[#e5e7eb] rounded-2xl text-[#4b5563] font-medium"
            >
              Voltar
            </button>
          </div>
        </form>
      );
    }
  }
}
